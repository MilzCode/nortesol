import type { NextPage } from "next";
import Head from "next/head";
import Destacados from "../components/index/Destacados";
import Secciones from "../components/index/Secciones";
import ProductoVistaMiniatura from "../components/venta/ProductoVistaMiniatura";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Libreria nortesol</title>
        <meta name="Descripcion" content="Libreria nortesol" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Destacados />
      <Secciones />
      <div className="d-flex justify-content-center align-items-center">
        <ProductoVistaMiniatura />
      </div>
    </>
  );
};

export default Home;
