import React, { useState } from "react";

const Paginador = () => {
  //maxPagina son las paginas disponibles
  const maxPagina = 100;
  //sino hay paginas que no se despliegue el componente
  if (maxPagina < 1) return null;
  //con pagina mostrar Dato indicamos cuantas paginas se mostraran en el paginador sin contar ni la primera ni la ultima
  const paginasMostrarDato = 5;
  const paginasMostrar =
    paginasMostrarDato > maxPagina
      ? maxPagina - 1
      : maxPagina === paginasMostrarDato
      ? paginasMostrarDato - 1
      : paginasMostrarDato;
  const cargarCadaNpaginas = paginasMostrar - 1;
  const maxPaginasDesplegable = 50;
  const paginasMostrarPorLado = Math.floor(paginasMostrar / 2);
  const paginasDespliguePorLado = Math.floor(maxPaginasDesplegable / 2);
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
  //handdle pagina modo 1
  // const handdlePagina = (e: any) => {
  //   const paginaSelect = parseInt(e.target.innerHTML);
  //   if (paginaSelect === pagina) return;
  //   if (maxPagina <= paginasMostrarDato) {
  //     setPagina(paginaSelect);
  //     return;
  //   }
  //   if (paginaSelect === 1 || paginaSelect === maxPagina) {
  //     paginaSelect === 1
  //       ? loadNextPages(paginaSelect)
  //       : loadPrevPages(paginaSelect);
  //   } else {
  //     paginaSelect > pagina
  //       ? loadNextPages(paginaSelect)
  //       : loadPrevPages(paginaSelect);
  //   }

  //   setPagina(paginaSelect);
  // };

  //handdle pagina modo 2
  const handdlePagina = (e: any) => {
    const paginaSelect = parseInt(e.target.innerHTML);
    if (paginaSelect === pagina) return;
    if (maxPagina <= paginasMostrarDato) {
      setPagina(paginaSelect);
      return;
    }
    if (paginaSelect === 1 || paginaSelect === maxPagina) {
      paginaSelect === 1
        ? loadNextPages(paginaSelect)
        : loadPrevPages(paginaSelect);
      setPagina(paginaSelect);
      return;
    }
    if (paginaSelect <= 1 + paginasMostrarPorLado) {
      setPaginas([...Array(paginasMostrar)].map((e, i) => i + 2));
      setLastNextPagina(cargarCadaNpaginas);
      setLastPrevPagina(cargarCadaNpaginas);
      setPagina(paginaSelect);
      return;
    } else if (paginaSelect >= maxPagina - paginasMostrarPorLado) {
      setPaginas(
        [...Array(paginasMostrar)].map((e, i) => i + maxPagina - paginasMostrar)
      );
      setLastPrevPagina(maxPagina - cargarCadaNpaginas);
      setPagina(paginaSelect);
      return;
    }
    setPaginas(
      [...Array(paginasMostrar)].map(
        (e, i) => i + paginaSelect - paginasMostrarPorLado
      )
    );
    setLastNextPagina(paginaSelect + paginasMostrarPorLado);
    setLastPrevPagina(paginaSelect - paginasMostrarPorLado);
    setPagina(paginaSelect);
  };
  const loadNextPages = (nuevaPagina: number) => {
    if (nuevaPagina === maxPagina) return;
    if (nuevaPagina === 1) {
      setPaginas([...Array(paginasMostrar)].map((e, i) => i + nuevaPagina + 1));
      setLastNextPagina(nuevaPagina + cargarCadaNpaginas);
      setLastPrevPagina(nuevaPagina - 1);
      return;
    }
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
      if (maxPagina < paginasMostrar + 2) {
        setPaginas(
          [...Array(paginasMostrar)].map(
            (e, i) => i + nuevaPagina - cargarCadaNpaginas
          )
        );
      } else {
        setPaginas(
          [...Array(paginasMostrar)].map(
            (e, i) => i + nuevaPagina - cargarCadaNpaginas - 1
          )
        );
      }

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
    if (pagina === maxPagina) return;
    pagina + 1 === lastNextPagina &&
      maxPagina > paginasMostrar + 1 &&
      loadNextPages(pagina + 1);
    maxPagina !== pagina && setPagina(pagina + 1);
  };
  const handdlePrev = () => {
    if (pagina === 1) return;
    pagina - 1 === lastPrevPagina && loadPrevPages(pagina - 1);
    pagina !== 1 && setPagina(pagina - 1);
  };

  const handdleDesplegarPaginador = () => {
    if (maxPagina <= maxPaginasDesplegable) {
      return (
        <>
          {[...Array(maxPagina)].map((e, i) => (
            <div
              key={i + 1}
              className={`paginador__pagina ${
                pagina === i + 1 && "paginador__pagina--activo"
              } NOSELECT`}
              onClick={handdlePagina}
            >
              {i + 1}
            </div>
          ))}
        </>
      );
    }
    //si puede desplegar  hacia ambos lados desde las paginas de despliegue por lado
    if (
      pagina - paginasDespliguePorLado > 0 &&
      pagina + paginasDespliguePorLado < maxPagina
    ) {
      return (
        <>
          {[...Array(maxPaginasDesplegable)].map((e, i) => (
            <div
              key={i + pagina - paginasDespliguePorLado + 1}
              className={`paginador__pagina ${
                pagina === i + pagina - paginasDespliguePorLado + 1 &&
                "paginador__pagina--activo"
              } NOSELECT`}
              onClick={handdlePagina}
            >
              {i + pagina - paginasDespliguePorLado + 1}
            </div>
          ))}
        </>
      );
    }
    //si la pagina esta cerca del inicio se despliega desde el inicio el paginador
    if (pagina - paginasDespliguePorLado < 2) {
      return (
        <>
          {[...Array(maxPaginasDesplegable)].map((e, i) => (
            <div
              key={i + 1}
              className={`paginador__pagina ${
                pagina === i + 1 && "paginador__pagina--activo"
              } NOSELECT`}
              onClick={handdlePagina}
            >
              {i + 1}
            </div>
          ))}
        </>
      );
    }
    //si la pagina esta cerca del final se despliega desde el final el paginador
    if (pagina + paginasDespliguePorLado > maxPagina - 1) {
      return (
        <>
          {[...Array(maxPaginasDesplegable)].map((e, i) => (
            <div
              key={i + maxPagina - maxPaginasDesplegable + 1}
              className={`paginador__pagina ${
                pagina === i + maxPagina - maxPaginasDesplegable + 1 &&
                "paginador__pagina--activo"
              } NOSELECT`}
              onClick={handdlePagina}
            >
              {i + maxPagina - maxPaginasDesplegable + 1}
            </div>
          ))}
        </>
      );
    }
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
        } NOSELECT`}
        onClick={handdlePagina}
      >
        {1}
      </div>
      {paginas[0] > 2 && <i className="NOSELECT">...</i>}
      {paginas.map((pag) => (
        <div
          key={pag}
          className={`paginador__pagina ${
            pagina === pag && "paginador__pagina--activo"
          } NOSELECT`}
          onClick={handdlePagina}
        >
          {pag}
        </div>
      ))}
      {paginas[paginasMostrar - 1] < maxPagina - 1 && (
        <i className="NOSELECT">...</i>
      )}
      {maxPagina > paginasMostrar + 1 && (
        <div
          className={`paginador__pagina ${
            pagina === maxPagina && "paginador__pagina--activo"
          } NOSELECT`}
          onClick={handdlePagina}
          //+1 porque incluye la pagina final
        >
          {maxPagina}
        </div>
      )}

      <div
        className={"paginador__pagina paginador__paginaDesplegar NOSELECT"}
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
            {handdleDesplegarPaginador()}
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
