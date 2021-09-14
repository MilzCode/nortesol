import React from "react";
import Image from "next/image";

const ProductoVistaMiniatura = ({className} : any) => {
  return (
    <div className={`productoVistaMiniatura ${className}`}>
      <div className="productoVistaMiniatura__imagen NOSELECT">
        <Image
          src={`/static/img/libreta.jpg`}
          alt="..."
          height="720"
          width="1280"
          objectFit="contain"
        />
      </div>
      <div className="productoVistaMiniatura__nombre">
        Producto de prueba de titulo largo
      </div>
      <div className="productoVistaMiniatura__precio NOSELECT">$999.999</div>
      <div className="productoVistaMiniatura__mostrar">
        <i className="fas fa-eye" />
        <span className="NOSELECT">Ver</span>
      </div>
    </div>
  );
};

export default ProductoVistaMiniatura;
