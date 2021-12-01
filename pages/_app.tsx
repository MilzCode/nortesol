/* eslint-disable react-hooks/exhaustive-deps */
import "../styles/globals.scss";
import type { AppProps } from "next/app";
import Head from "next/head";
import Layout from "../components/layout/Layout";
import firebase from "../firebase";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
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
  const rutasPublicas = ["/login", "/", "/register", "/search","/.well-known/assetlinks.json"];
  //ruta actual
  const path = router.asPath.split("?")[0];
  //True si la ruta actual no requiere control de acceso.
  const isPublicRoute = rutasPublicas.includes(path);

  const redirectToHome = () => window.location.replace("/");

  useEffect(() => {
    async function getMisDatos() {
      firebase.auth.onAuthStateChanged((user) => {
        setResUserFirebase(user);
      });
      if (!resUserFirebase) {
        setMisDatos(null);
        return;
      }

      const datosContacto = await firebase.getMeData();

      if (!datosContacto) {
        setResUserFirebase(null); //En caso de tener problemas con solicitar los datos del usuario, se setea resUserFirebase a null.
        // setMisDatos(null); // puede que esto no sea necesario, ya que se setea en el if de arriba.
        return;
      }
      /*
        Si bien dentro del documento de usuario se indica un rol, por seguridad, se utiliza, el metodo isAdmin(),
        el cual envia una peticion a la base de datos para validar el rol admin.
      */
      const admin =
        datosContacto.rol === "admin" ? await firebase.isAdmin() : false;

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

  /*Parametros */
  //autenticado contiene si el usuario esta autenticado (auth=true) o no (auth=null) o esta en espera (auth = false)
  //basado en el state resUserFirebase.
  const autenticado = resUserFirebase ? true : resUserFirebase;
  return (
    <>
      <Head>
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
          basado en el state resUserFirebase.
      */}
      {(autenticado && misDatos) || isPublicRoute ? (
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
          {/* Si no es una ruta que requiera acceso o misDatos aun no recibe respuesta (null u object) retorna cargando... */}
          {isPublicRoute || autenticado !== null ? (
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
