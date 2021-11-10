/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
import BotonFAColores1 from "../../components/general/BotonFAColores1";
import VentanaModal from "../../components/general/VentanaModal";
import Volver from "../../components/general/Volver";
import useValidacion from "../../hooks/useValidation";
import formatoRut from "../../utils/formatoRut";
//validarEditarMisDatos
import validarEditarMisDatos from "../../validations/validarEditarMisDatos";

const Edit = ({ fb, me }: any) => {
  const [nombre, setNombre] = React.useState(false);
  const [rut, setRut] = React.useState(false);
  const [celular, setCelular] = React.useState(false);
  const [password, setPassword] = React.useState(false);
  const [envio, setEnvio] = React.useState(false);

  //si la contraseña toma este valor significa que no se haran cambios
  const valorContraseñaSinCambios = "*8979ca3276d.965b/91ff0.68c325af2853*";
  const STATE_INIT_USER = {
    nombre: me.nombre,
    rut: me.rut,
    celular: me.celular,
    password: valorContraseñaSinCambios,
    password2: valorContraseñaSinCambios,
  };
  const STATE_INIT_ERR = {
    nombre: "",
    rut: "",
    celular: "",
    password: "",
    password2: "",
  };

  const actualizarDatos = () => {
    if (valores.contraseña !== valorContraseñaSinCambios) {
      //no cambia
    }
    if (nombre) {
      fb.updateName(valores.nombre);
    }
    //actualizar datos de contacto

    fb.updateMeData({
      rut: formatoRut(valores.rut),
      celular: valores.celular,
    });

    setEnvio(true);
    return true;
  };

  const {
    valores,
    errores,
    handleSubmit,
    handleChange,
    handleBlur,
    sendChange,
  } = useValidacion(
    STATE_INIT_USER,
    validarEditarMisDatos,
    actualizarDatos,
    STATE_INIT_ERR
  );

  return (
    <>
      {envio && (
        <VentanaModal titulo="Datos modificados" redireccionar="/user" reload>
          Se modificaron los siguientes datos:
          <br />
          {nombre && "- Nombre"}
          <br />
          {rut && "- Rut"}
          <br />
          {celular && "- Celular"}
          <br />
          {password && "- Contraseña"}
        </VentanaModal>
      )}
      <Volver />
      <div className="userEdit">
        <form className="userEdit__form" onSubmit={handleSubmit}>
          <h3 className="userEdit__titulo">Editar mis datos</h3>
          <p className="TEXT1">Seleccione datos a cambiar</p>
          <div className="userEdit__input">
            <label htmlFor="nombre" className="fas fa-user" />
            <input
              type="text"
              name="nombre"
              id="nombre"
              placeholder="Nombre y Apellidos"
              disabled={!nombre}
              value={valores.nombre}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <input
              type="checkbox"
              name="nombrecheck"
              id="nombrecheck"
              onChange={() => {
                setNombre(!nombre);
                sendChange({ nombre: me.nombre });
                errores.nombre = "";
              }}
            />
          </div>
          <div className="userEdit__input">
            <label htmlFor="rut" className="fas fa-address-card" />
            <input
              type="text"
              name="rut"
              id="rut"
              placeholder="Rut ej: 11222333-k"
              disabled={!rut}
              value={valores.rut}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <input
              type="checkbox"
              name="rutcheck"
              id="rutcheck"
              onChange={() => {
                setRut(!rut);
                sendChange({ rut: me.rut });
                errores.rut = "";
              }}
            />
          </div>
          <div className="userEdit__input">
            <label htmlFor="celular" className="fas fa-phone" />
            <input
              type="tel"
              name="celular"
              id="celular"
              placeholder="Celular"
              disabled={!celular}
              value={valores.celular}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <input
              type="checkbox"
              name="celularcheck"
              id="celularcheck"
              onChange={() => {
                setCelular(!celular);
                sendChange({ celular: me.celular });
                errores.celular = "";
              }}
            />
          </div>
          <div className="userEdit__input">
            <label htmlFor="password" className="fas fa-lock" />
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Contraseña"
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={!password}
              value={
                valores.password == valorContraseñaSinCambios
                  ? ""
                  : valores.password
              }
            />

            <input
              type="checkbox"
              name="passwordcheck"
              id="passwordcheck"
              onChange={() => {
                password &&
                  sendChange({
                    password: valorContraseñaSinCambios,
                    password2: valorContraseñaSinCambios,
                  });
                !password &&
                  sendChange({
                    password: "",
                    password2: "",
                  });
                setPassword(!password);
                errores.password = "";
                errores.password2 = "";
              }}
            />
          </div>
          <div className="userEdit__input">
            <label htmlFor="password2" className="fas fa-lock" />
            <input
              type="password"
              name="password2"
              id="password2"
              placeholder="Repetir contraseña"
              disabled={!password}
              onChange={handleChange}
              onBlur={handleBlur}
              value={
                valores.password2 == valorContraseñaSinCambios
                  ? ""
                  : valores.password2
              }
            />
            <div />
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
              {errores.celular && (
                <li>
                  <i className="fas fa-exclamation-circle" />
                  {errores.celular}
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
            </ul>
          </div>
          <hr />
          <div>
            <BotonFAColores1 backgroundColor="#48d597">
              <i className="fas fa-pen-square"></i>
              Modificar datos seleccionados
            </BotonFAColores1>
          </div>
        </form>
      </div>
    </>
  );
};

export default Edit;
