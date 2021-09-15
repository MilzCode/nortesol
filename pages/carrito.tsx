import React from "react";
import BotonFAColores1 from "../components/general/BotonFAColores1";
import Volver from "../components/general/Volver";
import { ProductoEnCarrito } from "../components/venta/ProductoEnCarrito";

const Carrito = () => {
  const [domicilio, setDomicilio] = React.useState(false);
  const [region, setRegion] = React.useState("");
  const [ciudad, setCiudad] = React.useState("");
  const [domicilioNoDisponible, setdomicilioNoDisponible] =
    React.useState(false);
  const handdleRegion = (e: any) => {
    setRegion(e.currentTarget.value);
    if (domicilioNoDisponible) setdomicilioNoDisponible(false);
  };
  const handdleCiudad = (e: any) => {
    const ciudad = e.currentTarget.value;
    if (ciudad === "arica") {
      setdomicilioNoDisponible(true);
      setRegion("");
      return;
    }
    if (domicilioNoDisponible) setdomicilioNoDisponible(false);
    setCiudad(ciudad);
  };
  const handdleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(e);
    alert("Gracias por su compra");
  };
  return (
    <div className="carrito">
      <Volver />
      <h1>CARRITO DE COMPRA</h1>
      <div className="carrito__container">
        <div className="carrito__productos">
          <h3 className="carrito__msgProductos">Producto/s</h3>
          <ProductoEnCarrito />
          <ProductoEnCarrito />
          <ProductoEnCarrito />
          <ProductoEnCarrito />
          <ProductoEnCarrito />
          <ProductoEnCarrito />
          <ProductoEnCarrito />
        </div>
        <div className="carrito__totalContainer">
          <p className="carrito__totalEspacioPago">Espacio de pago</p>

          <form className="carrito__total NOSELECT" onSubmit={handdleSubmit}>
            <h3 className="carrito__totalTitulo">Total de Productos</h3>
            <p className="carrito__totalPrecio">$9.999.999</p>
            <div>
              <div className="carrito__retiroTienda">
                <input
                  type="radio"
                  id="tienda"
                  name="retiro"
                  value="tienda"
                  defaultChecked
                  onChange={() => {
                    setDomicilio(!domicilio);
                  }}
                />
                <label htmlFor="tienda">Retiro en tienda</label>
              </div>
              <div className="carrito__retiroDomicilio">
                <input
                  type="radio"
                  id="domicilio"
                  name="retiro"
                  value="domicilio"
                  onChange={() => {
                    setDomicilio(!domicilio);
                  }}
                />
                <label htmlFor="domicilio">Envio a domicilio</label>
              </div>
              <div className="carrito__retiroDomicilioSelect">
                {domicilio && (
                  <>
                    <select onChange={handdleRegion} value={region}>
                      <option value="">Región</option>
                      <option value="arica">Arica</option>
                      <option value="tarapaca">Tarapaca</option>
                      <option value="antofagasta">Antofagasta</option>
                      <option value="atacama">Atacama</option>
                      <option value="coquimbo">Coquimbo</option>
                      <option value="valparaiso">Valparaiso</option>
                      <option value="ohiggins">O Higgins</option>
                      <option value="maule">Maule</option>
                      <option value="biobio">Biobio</option>
                      <option value="araucania">Araucania</option>
                      <option value="loslagos">Los Lagos</option>
                      <option value="aysen">Aysen</option>
                      <option value="magallanes">Magallanes</option>
                      <option value="metropolitana">Metropolitana</option>
                    </select>
                    {region !== "" && (
                      <select onChange={handdleCiudad}>
                        <option value="">Ciudad</option>
                        <option value="arica">Arica</option>
                        <option value="tarapaca">Tarapaca</option>
                        <option value="antofagasta">Antofagasta</option>
                        <option value="atacama">Atacama</option>
                        <option value="coquimbo">Coquimbo</option>
                        <option value="valparaiso">Valparaiso</option>
                        <option value="ohiggins">O Higgins</option>
                        <option value="maule">Maule</option>
                      </select>
                    )}
                  </>
                )}
              </div>
            </div>
            {/* si esta disponible el domicilio o no es envio a domicilio se despliega el boton */}
            {(!domicilioNoDisponible || !domicilio) && (
              <BotonFAColores1 type="submit">
                <i className="fas fa-shopping-bag"></i>
                Comprar
              </BotonFAColores1>
            )}
            {/* Si el domicilio no esta disponible y es envio a domicilio no se despliega boton, y despliega mensaje */}
            {domicilioNoDisponible && domicilio && (
              <p className="carrito__totalDomicilioNoMsg">
                Actualmente no enviamos a esa ubicación. Para mayor información,
                puede contactarnos por whatsapp o correo.
              </p>
            )}

            <small className="carrito__totalMensajeFinal">
              Se solicitaran más datos para realizar la entrega.
              <br />
              El envio a domicilio puede tener un costo adicional.
            </small>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Carrito;
