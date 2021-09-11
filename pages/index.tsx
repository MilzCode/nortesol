import type { NextPage } from "next";
import Head from "next/head";
import Destacados from "../components/index/Destacados";
import Secciones from "../components/index/Secciones";
import Siguenos from "../components/index/Siguenos";
import Paginador from "../components/general/Paginador";
import ProductoVistaMiniatura from "../components/venta/ProductoVistaMiniatura";
import { useEffect, useState } from "react";

const Home: NextPage = () => {
  const [pagina, setPagina] = useState(1);
  return (
    <>
      <Head>
        <title>Libreria nortesol</title>
        <meta name="Descripcion" content="Libreria nortesol" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className="TEXTINVISIBLE">Libreria Nortesol Pagina principal</h1>
      <Destacados />
      <Siguenos />
      <div className="d-flex flex-wrap justify-content-center align-items-center ml-5 mr-5">
        <Secciones />
        <ProductoVistaMiniatura />
        <ProductoVistaMiniatura />
        <ProductoVistaMiniatura />
        <ProductoVistaMiniatura />
        <ProductoVistaMiniatura />
        <ProductoVistaMiniatura />
        <ProductoVistaMiniatura />
        <ProductoVistaMiniatura />
      </div>
      <Paginador maxPagina={50} setPagina={setPagina} pagina={pagina} />
    </>
  );
};

export default Home;
