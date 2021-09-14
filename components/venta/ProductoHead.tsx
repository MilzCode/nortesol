import React from "react";
import ProductoHeadComprar from "./recursos/ProductoHeadComprar";
import ProductoHeadImagenes from "./recursos/ProductoHeadImagenes";
const ProductoHead = () => {
  return (
    <div className="productoHead">
      <ProductoHeadImagenes />
      <ProductoHeadComprar />
    </div>
  );
};

export default ProductoHead;
