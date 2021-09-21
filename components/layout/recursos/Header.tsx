import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import Router from "next/router";
import { FirebaseContext } from "../../../firebase";

const Header = () => {
  const carritoObjetos = true;
  const [miCuenta, setMiCuenta] = useState(false);
  const [subHeader, setSubHeader] = useState(false);
  const { usuario, firebase } = useContext(FirebaseContext) || {};

  const handdleMiCuenta = () => {
    setMiCuenta(!miCuenta);
  };

  const handdleSubmit = (e: any) => {
    e.preventDefault();
    Router.push("/search");
  };

  async function salir() {
    try {
      await firebase.out();
      Router.push("/");
    } catch (error) {
      
    }
  }
  return (
    <>
      <header className="header NOSELECT">
        <Link passHref href="/">
          <img
            className="header__logo"
            src="/static/img/logoNortesol.png"
            alt="logo"
          />
        </Link>
        <div className="header__contacto">
          <i className="fas fa-phone-square" />
          <span>Contacto</span>
        </div>
        <form className="header__buscador" onSubmit={(e) => handdleSubmit(e)}>
          <input type="text" placeholder="Buscar" />
          <button type="submit">
            <i className="fas fa-search" />
            <span className="TEXTINVISIBLE">buscar</span>
          </button>
        </form>
        {usuario ? (
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
                <Link passHref href="/user">
                  <div className="header__desplegableOpcion">Mi cuenta</div>
                </Link>
                <div className="header__desplegableOpcion" onClick={salir}>
                  Cerrar Sesión
                </div>
              </div>
            )}
          </div>
        ) : (
          <Link passHref href="/login">
            <div className="header__ingresar">
              <i className="fas fa-user" />
              <span>Ingresar</span>
            </div>
          </Link>
        )}
        <Link passHref href="/carrito">
          <div className="header__carrito">
            <i className="fas fa-shopping-cart" />
            {carritoObjetos && (
              <div className="header__carrito-contador">
                <p>999</p>
              </div>
            )}
          </div>
        </Link>
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
      </header>

      <nav
        className={`subHeader ${
          !subHeader && "subHeader--desaparecer"
        } NOSELECT`}
      >
        <div className="subHeader__menu">
          <a href="#">
            <i className="fas fa-home"></i>
            <span className="TEXTINVISIBLE">Inicio</span>
          </a>
          <a href="#">Productos</a>
          <a href="#">Servicios</a>
          <a href="#">Contacto</a>
          <a href="#">Contacto</a>
        </div>
      </nav>
    </>
  );
};

export default Header;
