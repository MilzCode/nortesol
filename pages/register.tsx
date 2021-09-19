import React, { useEffect, useState } from "react";
import BotonFAColores1 from "../components/general/BotonFAColores1";
import firebase from "../firebase";
import validarCrearCuenta from "../validaciones/validarCrearCuenta";
import RegionesYComunas from "../utils/RegionesYComunas";
import useValidacion from "../hooks/useValidation";
import Router from "next/router";
import formatoRut from "../utils/formatoRut";

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
const ciudadesInicial: string[] = [];
const Register = () => {
  const [emailUsado, setEmailUsado] = useState(false);
  const [comprobarErrores, setComprobarErrores] = useState(objetoDeErrores);
  const {
    valores,
    errores: erroresRecibidosDeUseValidation,
    handleSubmit,
    handleChange,
    handleBlur,
    sendChange,
  } = useValidacion(objetoDeErrores, validarCrearCuenta, crearCuenta);
  const [ciudades, setCiudades] = useState(ciudadesInicial);
  useEffect(() => {
    const conErroresDeUseValidacion =
      Object.keys(erroresRecibidosDeUseValidation).length != 0;
    if (conErroresDeUseValidacion) {
      setComprobarErrores({
        ...objetoDeErrores,
        ...erroresRecibidosDeUseValidation,
      });
    } else {
      setComprobarErrores(objetoDeErrores);
    }
  }, [erroresRecibidosDeUseValidation]);
  async function crearCuenta() {
    try {
      await firebase.registrar(
        valores.nombre,
        valores.email,
        valores.password,
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
            {comprobarErrores.nombre && <i className="far fa-hand-pointer" />}
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
            />
            {comprobarErrores.rut && <i className="far fa-hand-pointer" />}
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
              (comprobarErrores.email && <i className="far fa-hand-pointer" />)}
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
            {comprobarErrores.celular && <i className="far fa-hand-pointer" />}
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
            {comprobarErrores.region && <i className="far fa-hand-pointer" />}
          </div>
          <div className="register__input">
            <label htmlFor="ciudad" className="fas fa-map-marker" />
            <select
              name="ciudad"
              id="ciudad"
              disabled={!valores.region}
              onChange={handleChange}
              onBlur={handleBlur}
              //ciudad depende de la region
              value={valores.region ? valores.ciudad : ""}
            >
              <option value="">Seleccione una ciudad</option>
              {ciudades.map((ciudad: string) => (
                <option key={ciudad} value={ciudad}>
                  {ciudad}
                </option>
              ))}
            </select>
            {comprobarErrores.ciudad && <i className="far fa-hand-pointer" />}
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
            {comprobarErrores.direccion && (
              <i className="far fa-hand-pointer" />
            )}
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
            {comprobarErrores.password && <i className="far fa-hand-pointer" />}
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
            {comprobarErrores.password2 && (
              <i className="far fa-hand-pointer" />
            )}
          </div>
          <div className="ERRFORM">
            <ul className="register__comprobarErrores">
              {comprobarErrores.nombre && (
                <li>
                  <i className="fas fa-exclamation-circle" />
                  {comprobarErrores.nombre}
                </li>
              )}
              {comprobarErrores.rut && (
                <li>
                  <i className="fas fa-exclamation-circle" />
                  {comprobarErrores.rut}
                </li>
              )}
              {comprobarErrores.email && (
                <li>
                  <i className="fas fa-exclamation-circle" />
                  {comprobarErrores.email}
                </li>
              )}
              {comprobarErrores.celular && (
                <li>
                  <i className="fas fa-exclamation-circle" />
                  {comprobarErrores.celular}
                </li>
              )}
              {comprobarErrores.region && (
                <li>
                  <i className="fas fa-exclamation-circle" />
                  {comprobarErrores.region}
                </li>
              )}
              {comprobarErrores.ciudad && (
                <li>
                  <i className="fas fa-exclamation-circle" />
                  {comprobarErrores.ciudad}
                </li>
              )}
              {comprobarErrores.direccion && (
                <li>
                  <i className="fas fa-exclamation-circle" />
                  {comprobarErrores.direccion}
                </li>
              )}
              {comprobarErrores.password && (
                <li>
                  <i className="fas fa-exclamation-circle" />
                  {comprobarErrores.password}
                </li>
              )}
              {comprobarErrores.password2 && (
                <li>
                  <i className="fas fa-exclamation-circle" />
                  {comprobarErrores.password2}
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
