import React, { useState } from "react";
import Slider from "react-slick";

const Paginador = () => {
  //maxPagina son las paginas disponibles
  const maxPagina = 10;
  //con pagina mostrar Dato indicamos cuantas paginas se mostraran en el paginador sin contar ni la primera ni la ultima
  const paginasMostrarDato = 4;
  const paginasMostrar =
    paginasMostrarDato > maxPagina ? maxPagina - 1 : paginasMostrarDato;
  const cargarCadaNpaginas = paginasMostrar - 1;
  const [pagina, setPagina] = useState(1);
  const [paginador, setPaginador] = useState(false);
  const [lastNextPagina, setLastNextPagina] = useState(cargarCadaNpaginas);
  const [lastPrevPagina, setLastPrevPagina] = useState(cargarCadaNpaginas);
  //parte desde el 2 por eso i+2 ej: si paginas para mostrar = 4 entonces 2,3,4,5 (sin contar la primera ni ultima)
  const [paginas, setPaginas] = useState(
    [...Array(paginasMostrar)].map((e, i) => i + 2)
  );
  const handdlePaginador = () => {
    setPaginador(!paginador);
  };
  const handdlePagina = (e: any) => {
    const paginaSelect = parseInt(e.target.innerHTML);
    loadPrevPages(paginaSelect);
    setPagina(paginaSelect);
  };
  const loadNextPages = (nuevaPagina: number) => {
    console.log(nuevaPagina);
    if (nuevaPagina === maxPagina) return;
    if (nuevaPagina + cargarCadaNpaginas < maxPagina) {
      setPaginas([...Array(paginasMostrar)].map((e, i) => i + nuevaPagina));
      setLastNextPagina(nuevaPagina + cargarCadaNpaginas);
      setLastPrevPagina(nuevaPagina - 1);
      return;
    }
    setPaginas(
      [...Array(paginasMostrar)].map((e, i) => maxPagina - paginasMostrar + i)
    );
    setLastNextPagina(nuevaPagina + cargarCadaNpaginas);
    setLastPrevPagina(nuevaPagina - 1);
  };
  const loadPrevPages = (nuevaPagina: number) => {
    if (nuevaPagina === 1) return;
    if (nuevaPagina === maxPagina) {
      setPaginas(
        [...Array(paginasMostrar)].map(
          (e, i) => i + nuevaPagina - cargarCadaNpaginas - 1
        )
      );
      setLastPrevPagina(nuevaPagina - cargarCadaNpaginas);
      setLastNextPagina(nuevaPagina + 1);
      return;
    }
    if (nuevaPagina - cargarCadaNpaginas > 1) {
      setPaginas(
        [...Array(paginasMostrar)].map(
          (e, i) => i + nuevaPagina - cargarCadaNpaginas
        )
      );
      setLastPrevPagina(nuevaPagina - cargarCadaNpaginas);
      setLastNextPagina(nuevaPagina + 1);
      return;
    }
    setPaginas([...Array(paginasMostrar)].map((e, i) => i + 2));
    setLastPrevPagina(nuevaPagina - cargarCadaNpaginas);
    setLastNextPagina(nuevaPagina + 1);
  };
  const handdleNext = () => {
    //en este caso ademas de comprobar la siguiente pagina si no hay mas paginas no es necesario buscar mas paginas para
    //el paginador
    pagina + 1 === lastNextPagina &&
      maxPagina > paginasMostrar + 1 &&
      loadNextPages(pagina + 1);
    maxPagina !== pagina && setPagina(pagina + 1);
  };
  const handdlePrev = () => {
    pagina - 1 === lastPrevPagina && loadPrevPages(pagina - 1);
    pagina !== 1 && setPagina(pagina - 1);
  };
  return (
    <div className="paginador">
      <div className="paginador__anterior">
        <i
          className={`fas fa-sort-down ${
            pagina === 1 && "paginador__disabled"
          }`}
          onClick={handdlePrev}
        />
      </div>
      <div
        className={`paginador__pagina ${
          pagina === 1 && "paginador__pagina--activo"
        }`}
        onClick={handdlePagina}
      >
        {1}
      </div>
      {paginas.map((pag) => (
        <div
          key={pag}
          className={`paginador__pagina ${
            pagina === pag && "paginador__pagina--activo"
          }`}
          onClick={handdlePagina}
        >
          {pag}
        </div>
      ))}
      <div
        className={`paginador__pagina ${
          pagina === maxPagina && "paginador__pagina--activo"
        }`}
        onClick={handdlePagina}
        //+1 porque incluye la pagina final
        style={{ display: maxPagina > paginasMostrar + 1 ? "inherit" : "none" }}
      >
        {maxPagina}
      </div>
      <div
        className={"paginador__pagina"}
        onClick={handdlePaginador}
        onMouseLeave={() => {
          paginador && handdlePaginador();
        }}
        // +3 ya que incluye la pagina de incio mas la pagina final mas la pagina a desplegar y buscar
        style={{ display: maxPagina > paginasMostrar + 3 ? "inherit" : "none" }}
      >
        ...
        {paginador && (
          <div className="paginador__desplegable">
            <div className={"paginador__pagina"}>1</div>
            <div className={"paginador__pagina"}>2</div>
            <div className={"paginador__pagina"}>3</div>
            <div className={"paginador__pagina"}>4</div>
            <div className={"paginador__pagina"}>5</div>
            <div className={"paginador__pagina"}>6</div>
            <div className={"paginador__pagina"}>7</div>
            <div className={"paginador__pagina"}>8</div>
            <div className={"paginador__pagina"}>9</div>
            <div className={"paginador__pagina"}>10</div>
            <div className={"paginador__pagina"}>11</div>
            <div className={"paginador__pagina"}>12</div>
            <div className={"paginador__pagina"}>13</div>
            <div className={"paginador__pagina"}>14</div>
            <div className={"paginador__pagina"}>15</div>
          </div>
        )}
      </div>

      <div className="paginador__siguiente">
        <i
          className={`fas fa-sort-down ${
            pagina === maxPagina && "paginador__disabled"
          }`}
          onClick={handdleNext}
        />
      </div>
    </div>
  );
};

export default Paginador;
