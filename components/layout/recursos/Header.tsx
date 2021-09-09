import React, { useEffect, useState } from "react";

const Header = () => {
  const ingresado = true;
  const carritoObjetos = true;
  const [miCuenta, setMiCuenta] = useState(false);
  const [subHeader, setSubHeader] = useState(false);
  // const [scrollDown, setScrollDown] = useState(false);

  const handdleMiCuenta = () => {
    setMiCuenta(!miCuenta);
  };

  const handdleSubmit = (e: any) => {
    e.preventDefault();
    console.log(e.target[0].value);
  };

  // useEffect(() => {
  //   window.addEventListener("scroll", () => {
  //     const isTop = window.scrollY < 100;
  //     if (isTop !== true) {
  //       setScrollDown(true);
  //     } else {
  //       setScrollDown(false);
  //     }
  //   });
  // }, []);
  return (
    <>
      <div className="header">
        <img
          className="header__logo"
          src="/static/img/logoNortesol.png"
          alt="logo"
        />
        <div className="header__contacto">
          <i className="fas fa-phone-square" />
          <span>Contacto</span>
        </div>
        <form className="header__buscador" onSubmit={(e) => handdleSubmit(e)}>
          <input type="text" placeholder="Buscar" />
          <button type="submit">
            <i className="fas fa-search" />
          </button>
        </form>
        {ingresado ? (
          <div
            className="header__miCuenta"
            onClick={handdleMiCuenta}
            onMouseLeave={() => {
              miCuenta && handdleMiCuenta();
            }}
          >
            <i className="fas fa-user" />
            <span>Mi cuenta</span>
            <i className="fas fa-sort-down" />
            {miCuenta && (
              <div className="header__miCuentaDesplegable">
                <a href="https://www.google.com/">Mi cuenta</a>
                <a href="#">Cerrar Sesión</a>
              </div>
            )}
          </div>
        ) : (
          <div className="header__ingresar">
            <i className="fas fa-user" />
            <span>Ingresar</span>
          </div>
        )}

        <div className="header__carrito">
          <i className="fas fa-shopping-cart" />
          {carritoObjetos && (
            <div className="header__carrito-contador">
              <p>999</p>
            </div>
          )}
        </div>
        <div
          className="header__subMenuDesplegar"
          onClick={() => setSubHeader(!subHeader)}
        >
          {subHeader ? (
            <i className="fas fa-times" />
          ) : (
            <i className="fas fa-bars" />
          )}
        </div>
      </div>

      <div className={`subHeader ${!subHeader && "subHeader--desaparecer"}`}>
        <div className="subHeader__menu">
          <a href="#">Inicio</a>
          <a href="#">Productos</a>
          <a href="#">Servicios</a>
          <a href="#">Contacto</a>
          <a href="#">Contacto</a>
        </div>
      </div>
    </>
  );
};

export default Header;
