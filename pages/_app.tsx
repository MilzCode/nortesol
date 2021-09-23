/* eslint-disable react-hooks/exhaustive-deps */
import "../styles/globals.scss";
import type { AppProps } from "next/app";
import Head from "next/head";
import Layout from "../components/layout/Layout";
import firebase, { FirebaseContext } from "../firebase";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import RutaDefault from "./404";

function MyApp({ Component, pageProps }: AppProps) {
  const [logeadoNorteSol, setLogeadoNorteSol] = useState<any>(false);
  const [msgRutaNovalida, setMsgRutaNovalida] = useState<boolean>(false);
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  //invalid corrobora que el usuario no existe para dejar de desplegar cargando...
  function authCheck(url: string) {
    const rutasPublicas = ["/login", "/", "/register", "/search"];
    const path = url.split("?")[0];
    if (!logeadoNorteSol && !rutasPublicas.includes(path)) {
      setAuthorized(false);
      //setMsgRutaNovalida se usa para mostrar un mensaje de error en la ruta si es una ruta que no tiene permiso
      setMsgRutaNovalida(true);
    } else {
      setAuthorized(true);
      setMsgRutaNovalida(false);
    }
  }
  useEffect(() => {
    firebase.auth.onAuthStateChanged((user) => {
      setLogeadoNorteSol(user);
    });
    // run auth check on initial load
    authCheck(router.asPath);

    // set authorized to false to hide page content while changing routes
    const hideContent = () => setAuthorized(false);
    router.events.on("routeChangeStart", hideContent);

    // run auth check on route change
    router.events.on("routeChangeComplete", authCheck);

    // unsubscribe from events in useEffect return function

    return () => {
      router.events.off("routeChangeStart", hideContent);
      router.events.off("routeChangeComplete", authCheck);
    };
  }, [logeadoNorteSol]);

  return (
    <>
      <Head>
        <title>NorteSol</title>
        <meta name="description" content="NorteSol" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="UTF-8" />
        <link rel="icon" href="/nortesol.ico" />

        <link
          rel="stylesheet"
          href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
        />
      </Head>
      {authorized ? (
        <FirebaseContext.Provider value={{ logeadoNorteSol, firebase }}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </FirebaseContext.Provider>
      ) : (
        <FirebaseContext.Provider value={{ logeadoNorteSol }}>
          <Layout>
            {!msgRutaNovalida || logeadoNorteSol == false ? (
              <p className="CENTERABSOLUTE TEXT1">Cargando...</p>
            ) : (
              <RutaDefault />
            )}
          </Layout>
        </FirebaseContext.Provider>
      )}
    </>
  );
}
export default MyApp;
