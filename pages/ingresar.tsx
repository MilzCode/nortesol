import React from "react";
import BotonFAColores1 from "../components/general/BotonFAColores1";

const Ingresar = () => {
  const ingresoValido = true;
  return (
    <div className="ingresar">
      <form className="ingresar__form">
        <h3 className="ingresar__titulo">Ingresar</h3>
        <div className="ingresar__correo">
          <label htmlFor="correo" className="fas fa-user"></label>
          <input type="text" id="correo" placeholder="Correo" />
        </div>
        <div className="ingresar__contrasena">
          <label htmlFor="contrasena" className="fas fa-key"></label>
          <input
            type="password"
            id="contrasena"
            placeholder="Contraseña"
          ></input>
        </div>
        {!ingresoValido && (
          <p className="ingresar__noValido">Usuario o contraseña incorrectos</p>
        )}

        <BotonFAColores1>Ingresar</BotonFAColores1>
        <span className="ingresar__mensajeOlvido">¿Olvidó su contraseña?</span>
      </form>
      <div className="ingresar__irRegistro">
        <h3 className="ingresar__titulo">Registrarse</h3>
        <BotonFAColores1>Crear Cuenta</BotonFAColores1>
      </div>
    </div>
  );
};

export default Ingresar;
