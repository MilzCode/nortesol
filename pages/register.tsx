import React, { useState } from "react";
import BotonFAColores1 from "../components/general/BotonFAColores1";
import firebase from "../firebase";
import validarCrearCuenta from "../validaciones/validarCrearCuenta";
import RegionesYComunas from "../utils/RegionesYComunas";
import useValidacion from "../hooks/useValidation";
import Router from "next/router";
import formatoRut from "../utils/formatoRut";

const stateInicial = {
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
const ciudadesInicial: string[] = [];
const Register = () => {
  const [emailUsado, setEmailUsado] = useState(false);
  const {
    valores,
    errores,
    handleSubmit,
    handleChange,
    handleBlur,
    sendChange,
  } = useValidacion(stateInicial, validarCrearCuenta, crearCuenta);
  const [ciudades, setCiudades] = useState(ciudadesInicial);

  async function crearCuenta() {
    try {
      await firebase.registrar(
        valores.nombre,
        valores.email,
        valores.password,
        //el valor de rut debe ir formateado correctamente en firebase
        formatoRut(valores.rut),
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
  //a veces se bugea el select, por eso lo hago asi xd como plan B.
  const getCiudades = (region: string) => {
    if (region == "") {
      setCiudades([]);
      sendChange({ ciudad: "", region: "" });
      return;
    }
    if (region === valores.region) {
      return;
    }
    const regionEncontrada = RegionesYComunas.find((r) => r.name === region);
    if (regionEncontrada) {
      setCiudades(regionEncontrada.communes);
      return;
    }

    setCiudades([]);
    sendChange({ ciudad: "", region: "" });
    return;
  };
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
            {errores.nombre && <i className="far fa-hand-pointer" />}
          </div>
          <div className="register__input">
            <label htmlFor="rut" className="fas fa-address-card" />
            <input
              type="text"
              name="rut"
              id="rut"
              placeholder="Ingrese Rut"
              onChange={handleChange}
              onBlur={handleBlur}
              value={errores.rut ? valores.rut : formatoRut(valores.rut)}
            />
            {errores.rut && <i className="far fa-hand-pointer" />}
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
            {emailUsado ||
              (errores.email && <i className="far fa-hand-pointer" />)}
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
            {errores.celular && <i className="far fa-hand-pointer" />}
          </div>
          <div className="register__input">
            <label htmlFor="region" className="fas fa-map-marker-alt" />
            <select
              name="region"
              id="region"
              onChange={(e) => {
                handleChange(e);
                getCiudades(e.target.value);
              }}
              onBlur={handleBlur}
            >
              <option value="" onClick={() => sendChange({ region: "" })}>
                Seleccione una región
              </option>
              {RegionesYComunas.map((region: any) => (
                <option key={region.name} value={region.name}>
                  {region.name}
                </option>
              ))}
            </select>
            {errores.region && <i className="far fa-hand-pointer" />}
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
              {ciudades.map((ciudad: string) => (
                <option key={ciudad} value={ciudad}>
                  {ciudad}
                </option>
              ))}
            </select>
            {errores.ciudad && <i className="far fa-hand-pointer" />}
          </div>
          <div className="register__input">
            <label htmlFor="direccion" className="fas fa-home" />
            <input
              type="text"
              name="direccion"
              id="direccion"
              placeholder="Dirección ej: Mi calle 555"
              disabled={!valores.ciudad || !valores.region}
              onChange={handleChange}
              onBlur={handleBlur}
              //direccion depende de la ciudad y la region
              value={valores.ciudad && valores.region ? valores.direccion : ""}
            />
            {errores.direccion && <i className="far fa-hand-pointer" />}
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
            {errores.password && <i className="far fa-hand-pointer" />}
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
            {errores.password2 && <i className="far fa-hand-pointer" />}
          </div>
          <div className="ERRFORM">
            <ul className="register__errores">
              {errores.nombre && (
                <li>
                  <i className="fas fa-exclamation-circle" />
                  {errores.nombre}
                </li>
              )}
              {errores.rut && (
                <li>
                  <i className="fas fa-exclamation-circle" />
                  {errores.rut}
                </li>
              )}
              {errores.email && (
                <li>
                  <i className="fas fa-exclamation-circle" />
                  {errores.email}
                </li>
              )}
              {errores.celular && (
                <li>
                  <i className="fas fa-exclamation-circle" />
                  {errores.celular}
                </li>
              )}
              {errores.region && (
                <li>
                  <i className="fas fa-exclamation-circle" />
                  {errores.region}
                </li>
              )}
              {errores.ciudad && (
                <li>
                  <i className="fas fa-exclamation-circle" />
                  {errores.ciudad}
                </li>
              )}
              {errores.direccion && (
                <li>
                  <i className="fas fa-exclamation-circle" />
                  {errores.direccion}
                </li>
              )}
              {errores.password && (
                <li>
                  <i className="fas fa-exclamation-circle" />
                  {errores.password}
                </li>
              )}
              {errores.password2 && (
                <li>
                  <i className="fas fa-exclamation-circle" />
                  {errores.password2}
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
