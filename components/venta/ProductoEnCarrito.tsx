import React from "react";
import Image from "next/image";

export const ProductoEnCarrito = () => {
  return (
    <div className="productoEnCarrito NOSELECT">
      <p className="productoEnCarrito__titulo">
        The standard Lorem Ipsum passage
      </p>
      <div className="productoEnCarrito__container">
        <div className="productoEnCarrito__quitar">
          <i className="fas fa-times-circle">
            <div />
          </i>
          Quitar
        </div>
        <div className="productoEnCarrito__imagen">
          <Image
            src={`/static/img/libreta.jpg`}
            alt="..."
            height="720"
            width="1280"
            objectFit="contain"
          />
        </div>
        <div className="productoEnCarrito__datos">
          <p className="productoEnCarrito__datosTitulo1">Precio Unitario</p>
          <p className="productoEnCarrito__precio">$999.999</p>
          <p className="productoEnCarrito__datosTitulo2">Cantidad</p>
          <div className="productoEnCarrito__cantidad">
            <i className="far fa-minus-square">
              <div />
            </i>
            <input type="tel" max={99} maxLength={2} />
            <i className="fas fa-plus-square">
              <div />
            </i>
          </div>
          <div className="productoEnCarrito__total">Total: $9.999.999</div>
        </div>
      </div>
    </div>
  );
};
