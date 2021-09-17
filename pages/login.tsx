import React from "react";
import BotonFAColores1 from "../components/general/BotonFAColores1";
import Link from "next/link";

const Ingresar = () => {
  const ingresoValido = true;
  return (
    <div className="login">
      <form className="login__form">
        <h3 className="login__titulo">Ingresar</h3>
        <div className="login__correo">
          <label htmlFor="correo" className="fas fa-user"></label>
          <input type="text" id="correo" placeholder="Correo" />
        </div>
        <div className="login__contrasena">
          <label htmlFor="contrasena" className="fas fa-key"></label>
          <input
            type="password"
            id="contrasena"
            placeholder="Contraseña"
          ></input>
        </div>
        {!ingresoValido && (
          <p className="login__noValido">Usuario o contraseña incorrectos</p>
        )}

        <BotonFAColores1>Ingresar</BotonFAColores1>
        <span className="login__mensajeOlvido">¿Olvidó su contraseña?</span>
      </form>
      <div className="login__irRegistro">
        <h3 className="login__titulo">Registrarse</h3>
        <Link passHref href="/register">
          <div>
            <BotonFAColores1>Crear Cuenta</BotonFAColores1>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Ingresar;
