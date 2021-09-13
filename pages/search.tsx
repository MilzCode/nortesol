import React, { useState } from "react";
import Paginador from "../components/general/Paginador";
import Volver from "../components/general/Volver";
import Filtro from "../components/search/Filtro";
import ProductoVistaMiniatura from "../components/venta/ProductoVistaMiniatura";
const Search = () => {
  const [pagina, setPagina] = useState(1);
  return (
    <>
      <Volver />
      <br />
      <Filtro />
      <br />
      <div className="search__mensajeEncontrados">
        <h2>Productos de</h2>
        <p>Ejemplo de categoría o busqueda</p>
      </div>
      <div className="d-flex flex-wrap justify-content-center align-items-center ml-5 mr-5">
        <ProductoVistaMiniatura />
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

export default Search;
