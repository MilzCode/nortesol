import React from "react";
import Volver from "../components/general/Volver";
import { ProductoEnCarrito } from "../components/venta/ProductoEnCarrito";

const Carrito = () => {
  return (
    <div className="carrito">
      <Volver />
      <h1>CARRITO DE COMPRA</h1>
      <h3>Producto/s</h3>
      <ProductoEnCarrito />
      <ProductoEnCarrito />
    </div>
  );
};

export default Carrito;
