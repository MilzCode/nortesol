/* eslint-disable react-hooks/exhaustive-deps */
import "../styles/globals.scss";
import type { AppProps } from "next/app";
import Head from "next/head";
import Layout from "../components/layout/Layout";
import firebase from "../firebase";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }: AppProps) {
  const [msgRutaNovalida, setMsgRutaNovalida] = useState<boolean>(false);
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  /* 
  Mis datos almacena los datos del usuario requeridos en la aplicacion
  mis datos toma 3 valores:
  false. si acaba de ingresar y aun no se conoce si esta autenticado
  null. si acaba de ingresar y se conoce que no esta autenticado
  objeto con datos del usuario. si acaba de ingresar y se conoce que esta autenticado
  */
  const [misDatos, setMisDatos] = useState<any>(false);
  /*
  resUserFirebase funciona similar a misDatos, pero solo obtiene los datos del usuario en firebase, sin buscar en los
  otros documentos que contienen informacion de contacto, rut, etc.
  por lo que la peticion es más rapida que misDatos.
  por lo mismo solo se usa para obtener parte de los datos del usuario y llenar misDatos. 
  y como variable para comprobar si el usuario esta autenticado o no.
  En resumen, resUserFirebase no obtiene datos de contacto, rut, rol, etc, (para eso esta mis datos ya que realiza mas peticiones)
  solo indica si el usuario esta autenticado o no y obtienes datos de email, nombre e id.
  una forma para utilizarlo es: resUserFirebase ? true : resUserFirebase ya que retornara false, null o true,
  con el mismo signifado que para misDatos, aunque claro es parte del state misDatos ya que obtiene algunos datos del usuario.
  Agregar que resUserFirebase SOLO es null cuando firebase responde que el usuario no esta autenticado o cuando
  no es posible obtener los datos del usuario de la base de datos.
  */
  const [resUserFirebase, setResUserFirebase] = useState<any>(false);

  //Rutas que no requieren control de acceso
  const rutasPublicas = ["/login", "/", "/register", "/search"];
  //ruta actual
  const path = router.asPath.split("?")[0];
  /*
    authCheck funciona para comprobar si el usuario esta en una rutera que requiere autenticacion, y controlar acceso.
    trabaja con algunos useEffect.
  */
  function authCheck() {
    // console.log(firebase.auth.currentUser);
    if (!resUserFirebase && !rutasPublicas.includes(path)) {
      setAuthorized(false);
      //setMsgRutaNovalida se usa para mostrar un mensaje de error en la ruta si es una ruta que no tiene permiso
    } else {
      setAuthorized(true);
      setMsgRutaNovalida(false);
    }
  }
  /*
    Este useEffect es para obtener los datos del usuario en firebase, y llenar misDatos.
  */

  const redirectToHome = () => window.location.replace("/");

  useEffect(() => {
    console.log("res: " + resUserFirebase);

    async function getMisDatos() {
      firebase.auth.onAuthStateChanged((user) => {
        setResUserFirebase(user);
      });
      if (!resUserFirebase) {
        setMisDatos(null);
        return;
      }

      const datosContacto = await firebase.getMeData();
      const admin = await firebase.isAdmin();
      if (!resUserFirebase || !datosContacto) {
        setResUserFirebase(null); //En caso de tener problemas con solicitar los datos del usuario, se setea resUserFirebase a null.
        setMisDatos(null);
        return;
      }
      const misDatos_ = admin
        ? {
            nombre: resUserFirebase.displayName,
            email: resUserFirebase.email,
            rut: datosContacto.rut,
            celular: datosContacto.celular,
            ubicacion: datosContacto.ubicacion,
            admin,
          }
        : {
            nombre: resUserFirebase.displayName,
            email: resUserFirebase.email,
            rut: datosContacto.rut,
            celular: datosContacto.celular,
            ubicacion: datosContacto.ubicacion,
          };

      setMisDatos(misDatos_);
    }
    getMisDatos();
  }, [resUserFirebase]);
  /*
    Este useEffect es una forma de ocultar el contenido de las paginas protegidas hasta que el usuario esta autenticado.
    trabaja en congunto con la funcion authCheck.
  */
  useEffect(() => {
    // run auth check on initial load
    authCheck();

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
  }, [misDatos]);
  /*
    Este useEffect es parte de la funcion authCheck, y es para mostrar un mensaje de error en la ruta si es una ruta que no tiene permiso.
  */
  useEffect(() => {
    if (resUserFirebase === null && !rutasPublicas.includes(path)) {
      setMsgRutaNovalida(true);
    }
  }, [resUserFirebase]);

  /*Parametros */
  //autenticado contiene si el usuario esta autenticado (auth=true) o no (auth=null) o esta en espera (auth = false)
  //basado en el state resUserFirebase (más rapido que misDatos) pero no obtiene datos de contacto, rut, rol, etc.
  const autenticado = resUserFirebase ? true : resUserFirebase;
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

      {/* 
        En principio no se estara usando context, pero se encuentra en una version anterior de la aplicacion y en la carpeta de firebase.
        Se quito porque no aportaba, y se simplificaba la legibilidad del codigo al no usar context.
        los  parametros y sus nombres, que se estan trabjando entre componentes son los siguientes:
        - misDatos: contiene los datos del usuario en caso de estar autenticado y su rol.
        - fb: contiene la instancia de firebase con los metodos correspondientes.
        - auth: contiene si el usuario esta autenticado (auth=true) o no (auth=null) o esta en espera (auth = false) 
          basado en el state resUserFirebase (más rapido que misDatos) pero no obtiene datos de contacto, rut, rol, etc.
      */}
      {authorized ? (
        <Layout auth={autenticado} fb={firebase}>
          <Component
            fb={firebase}
            me={misDatos}
            auth={autenticado}
            {...pageProps}
          />
        </Layout>
      ) : (
        //en los componentes heredados logeadoNorteSol: null es usuario no logeado.

        <Layout auth={autenticado} fb={null}>
          {!msgRutaNovalida || misDatos == false ? (
            <p className="CENTERABSOLUTE TEXT1">Cargando...</p>
          ) : (
            redirectToHome()
          )}
        </Layout>
      )}
    </>
  );
}
export default MyApp;
