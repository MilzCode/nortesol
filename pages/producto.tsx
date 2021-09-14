import React from "react";
import Volver from "../components/general/Volver";
import ProductoBody from "../components/venta/ProductoBody";
import ProductoHead from "../components/venta/ProductoHead";
import ProductoRelacionados from "../components/venta/ProductoRelacionados";

const Producto = () => {
  return (
    <>
      <Volver />
      <h1 className="producto__titulo">The standard Lorem Ipsum passage</h1>
      <ProductoHead />
      <ProductoBody />
      <hr />
      <ProductoRelacionados />
      <br />
    </>
  );
};

export default Producto;
