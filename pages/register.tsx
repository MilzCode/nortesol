import React from "react";
import BotonFAColores1 from "../components/general/BotonFAColores1";

const Register = () => {
  return (
    <>
      <div className="register">
        <form className="register__form">
          <h3 className="register__titulo">Registrar</h3>
          <div className="register__input">
            <label htmlFor="nombre" className="fas fa-user" />
            <input
              type="text"
              name="nombre"
              id="nombre"
              placeholder="Nombre y Apellidos"
            />
          </div>
          <div className="register__input">
            <label htmlFor="rut" className="fas fa-address-card" />
            <input
              type="text"
              name="rut"
              id="rut"
              placeholder="Rut ej: 11222333-k"
            />
          </div>
          <div className="register__input">
            <label htmlFor="email" className="fas fa-envelope" />
            <input type="email" name="email" id="email" placeholder="Email" />
          </div>
          <div className="register__input">
            <label htmlFor="telefono" className="fas fa-phone" />
            <input
              type="tel"
              name="telefono"
              id="telefono"
              placeholder="Celular ej: 9 4444 4444"
            />
          </div>
          <div className="register__input">
            <label htmlFor="region" className="fas fa-map-marker-alt" />
            <select name="region" id="region">
              <option value="">Seleccione una región</option>
              <option value="1">Region 1</option>
              <option value="2">Region 2</option>
              <option value="3">Region 3</option>
            </select>
          </div>
          <div className="register__input">
            <label htmlFor="ciudad" className="fas fa-map-marker-alt" />
            <select name="ciudad" id="ciudad">
              <option value="">Seleccione una ciudad</option>
              <option value="1">Ciudad 1</option>
              <option value="2">Ciudad 2</option>
              <option value="3">Ciudad 3</option>
            </select>
          </div>
          <div className="register__input">
            <label htmlFor="direccion" className="fas fa-home" />
            <input
              type="text"
              name="direccion"
              id="direccion"
              placeholder="Dirección ej: Mi calle 555"
            />
          </div>
          <div className="register__input">
            <label htmlFor="password" className="fas fa-lock" />
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Contraseña"
            />
          </div>
          <div className="register__input">
            <label htmlFor="password2" className="fas fa-lock" />
            <input
              type="password"
              name="password2"
              id="password2"
              placeholder="Repita Contraseña"
            />
          </div>
          <div className="register__input2">
            <input type="checkbox" name="terminos" id="terminos" />
            <span>Acepto los términos y condiciones</span>
          </div>
          <BotonFAColores1>
            <i className="fas fa-user-plus"></i>
            Registrarme
          </BotonFAColores1>
        </form>
      </div>
    </>
  );
};

export default Register;
