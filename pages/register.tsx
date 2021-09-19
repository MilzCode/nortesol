import React, { useEffect } from "react";
import BotonFAColores1 from "../components/general/BotonFAColores1";
import firebase from "../firebase";
import validarCrearCuenta from "../validaciones/validarCrearCuenta";
import RegionesYComunas from "../utils/RegionesYComunas";
import useValidacion from "../hooks/useValidation";
import Router from "next/router";

/*
Este esperpento de codigo con los errores ya lo se, typescript me estaba dando un drama y fue la forma de solucionarlo xd.
Si puedes refactorizar esto de forma que no tire problemas, lo puedes hacer.

*/
const objetoDeErrores = {
  nombre: "",
  rut: "",
  email: "",
  celular: "",
  region: "",
  ciudad: "",
  direccion: "",
  password: "",
  password2: "",
};
const Register = () => {
  const [errInicial, setErrInicial] = React.useState(objetoDeErrores);
  const [emailUsado, setEmailUsado] = React.useState(false);
  const { valores, errores, handleSubmit, handleChange, handleBlur } =
    useValidacion(objetoDeErrores, validarCrearCuenta, crearCuenta);
  const [ciudades, setCiudades] = React.useState([]);
  useEffect(() => {
    const sinError = Object.keys(errores).length == 0;
    if (!sinError) {
      const nuevosErrores = { ...objetoDeErrores, ...errores };
      setErrInicial(nuevosErrores);
    }
  }, [errores]);
  async function crearCuenta() {
    console.log("Registrando");
    try {
      await firebase.registrar(
        valores.nombre,
        valores.email,
        valores.password,
        valores.rut,
        valores.celular,
        valores.region,
        valores.ciudad,
        valores.direccion
      );
      Router.push("/");
    } catch (error) {
      setEmailUsado(true);
    }
    return;
  }
  return (
    <>
      <div className="register">
        <form className="register__form" noValidate onSubmit={handleSubmit}>
          <h3 className="register__titulo">Registrar</h3>
          <div className="register__input">
            <label htmlFor="nombre" className="fas fa-user" />
            <input
              type="text"
              name="nombre"
              id="nombre"
              placeholder="Nombre y Apellidos"
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errInicial.nombre && <i />}
          </div>
          <div className="register__input">
            <label htmlFor="rut" className="fas fa-address-card" />
            <input
              type="text"
              name="rut"
              id="rut"
              placeholder="Rut ej: 11222333-k"
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errInicial.rut && <i />}
          </div>
          <div className="register__input">
            <label htmlFor="email" className="fas fa-envelope" />
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              onChange={(e) => {
                handleChange(e);
                setEmailUsado(false);
              }}
              onBlur={handleBlur}
            />
            {emailUsado || (errInicial.email && <i />)}
          </div>
          <div className="register__input">
            <label htmlFor="celular" className="fas fa-phone" />
            <input
              type="tel"
              name="celular"
              id="celular"
              placeholder="Celular ej: 944443333"
              maxLength={9}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errInicial.celular && <i />}
          </div>
          <div className="register__input">
            <label htmlFor="region" className="fas fa-map-marker-alt" />
            <select
              name="region"
              id="region"
              onChange={handleChange}
              onBlur={handleBlur}
            >
              <option value="">Seleccione una región</option>
              {RegionesYComunas.map((region: any) => (
                <option
                  key={region.name}
                  value={region.name}
                  onClick={() => {
                    setCiudades(region.communes);
                  }}
                >
                  {region.name}
                </option>
              ))}
            </select>
            {errInicial.region && <i />}
          </div>
          <div className="register__input">
            <label htmlFor="ciudad" className="fas fa-map-marker" />
            <select
              name="ciudad"
              id="ciudad"
              disabled={!valores.region}
              onChange={handleChange}
              onBlur={handleBlur}
            >
              <option value="">Seleccione una ciudad</option>
              {ciudades.map((ciudad: any) => (
                <option key={ciudad} value={ciudad}>
                  {ciudad}
                </option>
              ))}
            </select>
            {errInicial.ciudad && <i />}
          </div>
          <div className="register__input">
            <label htmlFor="direccion" className="fas fa-home" />
            <input
              type="text"
              name="direccion"
              id="direccion"
              placeholder="Dirección ej: Mi calle 555"
              disabled={!valores.ciudad}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errInicial.direccion && <i />}
          </div>
          <div className="register__input">
            <label htmlFor="password" className="fas fa-lock" />
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Contraseña"
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errInicial.password && <i />}
          </div>
          <div className="register__input">
            <label htmlFor="password2" className="fas fa-lock" />
            <input
              type="password"
              name="password2"
              id="password2"
              placeholder="Repita Contraseña"
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errInicial.password2 && <i />}
          </div>
          <div>
            <ul className="register__errInicial">
              {errInicial.nombre && (
                <li>
                  <i className="fas fa-exclamation-circle" />
                  {errInicial.nombre}
                </li>
              )}
              {errInicial.rut && (
                <li>
                  <i className="fas fa-exclamation-circle" />
                  {errInicial.rut}
                </li>
              )}
              {errInicial.email && (
                <li>
                  <i className="fas fa-exclamation-circle" />
                  {errInicial.email}
                </li>
              )}
              {errInicial.celular && (
                <li>
                  <i className="fas fa-exclamation-circle" />
                  {errInicial.celular}
                </li>
              )}
              {errInicial.region && (
                <li>
                  <i className="fas fa-exclamation-circle" />
                  {errInicial.region}
                </li>
              )}
              {errInicial.ciudad && (
                <li>
                  <i className="fas fa-exclamation-circle" />
                  {errInicial.ciudad}
                </li>
              )}
              {errInicial.direccion && (
                <li>
                  <i className="fas fa-exclamation-circle" />
                  {errInicial.direccion}
                </li>
              )}
              {errInicial.password && (
                <li>
                  <i className="fas fa-exclamation-circle" />
                  {errInicial.password}
                </li>
              )}
              {errInicial.password2 && (
                <li>
                  <i className="fas fa-exclamation-circle" />
                  {errInicial.password2}
                </li>
              )}
              {emailUsado && (
                <li>
                  <i className="fas fa-exclamation-circle" />
                  El email ya está en uso
                </li>
              )}
            </ul>
          </div>
          <div className="register__input2">
            <span>Al registrarse acepta los términos y condiciones</span>
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
