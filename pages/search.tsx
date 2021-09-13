import React from "react";
import Volver from "../components/general/Volver";
import Filtro from "../components/search/Filtro";
const Search = () => {
  return (
    <div className="search">
      <Volver />
      <br />
      <Filtro />
      <br />
      <div className="search__mensajeEncontrados">
        <h2>Productos de</h2>
        <p>Ejemplo de categoría o busqueda</p>
      </div>
    </div>
  );
};

export default Search;
