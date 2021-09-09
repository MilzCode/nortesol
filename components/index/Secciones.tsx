import React, { useState } from "react";

const Secciones = () => {
  const [seleccion, setSeleccion] = useState(0);
  return (
    <section className="secciones">
      <nav className="secciones__opciones">
        <a
          onClick={() => setSeleccion(0)}
          className={`secciones__opcion ${
            seleccion == 0 && "secciones__opcion--seleccionada"
          }`}
          href="#"
        >
          Más Vendidos
        </a>
        <a
          onClick={() => setSeleccion(1)}
          className={`secciones__opcion ${
            seleccion == 1 && "secciones__opcion--seleccionada"
          }`}
          href="#"
        >
          Novedades
        </a>
      </nav>
    </section>
  );
};

export default Secciones;
