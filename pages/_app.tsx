import "../styles/globals.scss";
import type { AppProps } from "next/app";
import Head from "next/head";
import Layout from "../components/layout/Layout";
import firebase, { FirebaseContext } from "../firebase";
import useAutenticacion from "../hooks/useAutenticacion";
import { useEffect } from "react";

function MyApp({ Component, pageProps }: AppProps) {
  const usuario = useAutenticacion();
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
        <link
          rel="stylesheet"
          href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
          integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
          crossOrigin="anonymous"
        />
      </Head>
      <FirebaseContext.Provider value={{ usuario, firebase }}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </FirebaseContext.Provider>
    </>
  );
}
export default MyApp;
