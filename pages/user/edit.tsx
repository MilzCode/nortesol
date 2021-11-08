import React from "react";
import BotonFAColores1 from "../../components/general/BotonFAColores1";
import Volver from "../../components/general/Volver";

const Edit = ({ fb }: any) => {
  // console.log(fb);
  const [nombre, setNombre] = React.useState(false);
  const [rut, setRut] = React.useState(false);
  const [email, setEmail] = React.useState(false);
  const [telefono, setTelefono] = React.useState(false);
  const [password, setPassword] = React.useState(false);

  return (
    <>
      <Volver />
      <div className="userEdit">
        <form action="" className="userEdit__form">
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
            />
            <input
              type="checkbox"
              name="nombrecheck"
              id="nombrecheck"
              onChange={() => setNombre(!nombre)}
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
            />
            <input
              type="checkbox"
              name="rutcheck"
              id="rutcheck"
              onChange={() => setRut(!rut)}
            />
          </div>
          <div className="userEdit__input">
            <label htmlFor="email" className="fas fa-envelope" />
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              disabled={!email}
            />
            <input
              type="checkbox"
              name="emailcheck"
              id="emailcheck"
              onChange={() => setEmail(!email)}
            />
          </div>
          <div className="userEdit__input">
            <label htmlFor="telefono" className="fas fa-phone" />
            <input
              type="tel"
              name="telefono"
              id="telefono"
              placeholder="Telefono"
              disabled={!telefono}
            />
            <input
              type="checkbox"
              name="telefonocheck"
              id="telefonocheck"
              onChange={() => setTelefono(!telefono)}
            />
          </div>
          <div className="userEdit__input">
            <label htmlFor="password" className="fas fa-lock" />
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Contraseña"
              disabled={!password}
            />

            <input
              type="checkbox"
              name="passwordcheck"
              id="passwordcheck"
              onChange={() => setPassword(!password)}
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
            />
            <div />
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
