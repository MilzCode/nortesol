import React from "react";

const ProductoHeadComprar = () => {
  return (
    <div className="productoHead__comprar">
      <p className="productoHead__comprarTitulo1">Precio Unitario</p>
      <p className="productoHead__comprarPrecio">$1.000</p>
      <p className="productoHead__comprarTitulo2">Cantidad</p>
      <div className="productoHead__comprarCantidad">
        <i className="far fa-minus-square"></i>
        <input type="text" />
        <i className="fas fa-plus-square"></i>
      </div>
      <p className="productoHead__mensajeCantidad">Llevas N articulos</p>
      <div className="productoHead__agregarCarritoBTN">
        <i className="fas fa-cart-arrow-down"></i>
        <p>Agregar al carrito</p>
      </div>
      <div className="productoHead__irCarrito">
        <i className="fas fa-shopping-cart"></i>
        <p>Ir al carrito</p>
      </div>
    </div>
  );
};

export default ProductoHeadComprar;
