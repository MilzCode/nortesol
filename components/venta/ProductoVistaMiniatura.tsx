import React from "react";
import Image from "next/image";

const ProductoVistaMiniatura = () => {
  return (
    <div className="productoVistaMiniatura">
      <div className="productoVistaMiniatura__imagen">
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
      <div className="productoVistaMiniatura__precio">$999.999</div>
      <div className="productoVistaMiniatura__mostrar">
        <i className="fas fa-eye" />
        {/* Este texto no se muestra solo es para SEO, el texto real se encuentra en variables.scss en seccion //Textos Pseudoelementos
         */}
        <span>Ver</span>
      </div>
    </div>
  );
};

export default ProductoVistaMiniatura;
