import React from "react";
import BotonFA from "../../general/BotonFAColores1";

const ProductoHeadComprar = () => {
  return (
    <div className="productoHeadComprar NOSELECT">
      <p className="productoHeadComprar__titulo1">Precio Unitario</p>
      <p className="productoHeadComprar__precio">$999.999</p>
      <p className="productoHeadComprar__titulo2">Cantidad</p>
      <div className="productoHeadComprar__cantidad">
        <i className="far fa-minus-square">
          <div />
        </i>
        <input type="tel" max={99} maxLength={2} />
        <i className="fas fa-plus-square">
          <div/>
        </i>
      </div>
      <p className="productoHeadComprar__mensajeCantidad">Llevas N articulos</p>
      <BotonFA className="productoHeadComprar__boton" backgroundColor="#ff6a39">
        <i className="fas fa-cart-arrow-down"></i>
        Agregar al carrito
      </BotonFA>
      <BotonFA className="productoHeadComprar__boton" backgroundColor="#f9423a">
        <i className="fas fa-shopping-cart"></i>
        Ir al carrito
      </BotonFA>
    </div>
  );
};

export default ProductoHeadComprar;
