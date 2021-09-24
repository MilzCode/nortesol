import React from "react";
import BotonFAColores1 from "../../components/general/BotonFAColores1";
import Volver from "../../components/general/Volver";

const EditAddress = () => {
  const [nombre, setNombre] = React.useState(false);
  const [region, setRegion] = React.useState(false);

  return (
    <>
      <Volver />
      <div className="editAddress">
        <form action="" className="editAddress__form">
          <h3 className="editAddress__titulo">Editar: Direccion 1</h3>
          <p className="TEXT1">Seleccione datos a cambiar</p>
          <div className="userEdit__input">
            <label htmlFor="nombre" className="fas fa-user" />
            <input
              type="text"
              name="nombre"
              id="nombre"
              placeholder="Nombre ej: Mi casa"
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
            <label htmlFor="region" className="fas fa-map-marker-alt" />
            <select name="region" id="region" disabled={!region}>
              <option value="">Seleccione una región</option>
              <option value="1">Region 1</option>
              <option value="2">Region 2</option>
              <option value="3">Region 3</option>
            </select>
            <input
              type="checkbox"
              name="regioncheck"
              id="regioncheck"
              onChange={() => setRegion(!region)}
            />
          </div>
          <div className="userEdit__input">
            <label htmlFor="ciudad" className="fas fa-map-marker" />
            <select name="ciudad" id="ciudad" disabled={!region}>
              <option value="">Seleccione una ciudad</option>
              <option value="1">Ciudad 1</option>
              <option value="2">Ciudad 2</option>
              <option value="3">Ciudad 3</option>
            </select>
            <div />
          </div>
          <div className="userEdit__input">
            <label htmlFor="direccion" className="fas fa-home" />
            <input
              type="text"
              name="direccion"
              id="direccion"
              placeholder="Direccion"
              disabled={!region}
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

export default EditAddress;
