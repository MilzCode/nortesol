import type { NextPage } from "next";
import Head from "next/head";
import Destacados from "../components/index/Destacados";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Libreria nortesol</title>
        <meta name="Descripcion" content="Libreria nortesol" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Destacados />
    </>
  );
};

export default Home;
