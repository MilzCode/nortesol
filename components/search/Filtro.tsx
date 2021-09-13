import React, { useState } from "react";
import Select from "react-select";
import SliderPrecios from "./SliderPrecios";

const Filtro = () => {
  const [togle, setTogle] = useState(true);
  const marcas = [
    { value: "torre", label: "Torre" },
    { value: "murano", label: "Murano" },
    { value: "colon", label: "Colon" },
  ];
  //precio es una variable que maneja string, aunque se inicializa como int para establecer el rango de precios
  const [precio, setPrecio] = useState([0, 1000000]);
  const categorias = [
    { value: "categoria1", label: "Categoria 1" },
    { value: "categoria2", label: "Categoria 2" },
    { value: "categoria3", label: "Categoria 3" },
  ];
  const productos = [
    { value: "producto1", label: "Producto 1" },
    { value: "producto2", label: "Producto 2" },
    { value: "producto3", label: "Producto 3" },
  ];
  const [marcasSeleccionadas, setMarcasSeleccionadas] = useState([]);
  const [categoriasSeleccionadas, setCategoriasSeleccionadas] = useState([]);
  const [productosSeleccionados, setProductosSeleccionados] = useState([]);

  return (
    <div className={`filtro ${togle && "filtro--noFilter"} NOSELECT`}>
      <div className="filtro__togle" onClick={() => setTogle(!togle)}>
        <span>Filtrar: </span>
        {togle && <i className="far fa-window-maximize"></i>}
        {!togle && <i className="fas fa-window-maximize"></i>}
      </div>
      <div className="filtro__marca">
        <span>Marca:</span>
        <Select
          inputId="filtro-marca"
          isMulti
          name="marcas"
          options={marcas}
          className="basic-multi-select"
          classNamePrefix="select"
          value={marcasSeleccionadas}
          onChange={(e: any) => setMarcasSeleccionadas(e)}
          placeholder="Filtrar marca"
        />
      </div>
      <div className="filtro__precio">
        <span className="filtro__labelPrecio">Precio:</span>
        <SliderPrecios
          minValue={precio[0]}
          maxValue={precio[1]}
          onChange={(e: any[]) => setPrecio(e)}
          className="filtro__slider"
        />
      </div>
      <div className="filtro__categoria">
        <span>Categoria:</span>
        <Select
          inputId="filtro-categoria"
          isMulti
          name="categoria"
          options={categorias}
          className="basic-multi-select"
          classNamePrefix="select"
          value={categoriasSeleccionadas}
          onChange={(e: any) => setCategoriasSeleccionadas(e)}
          placeholder="Filtrar categoria"
        />
      </div>
      <div className="filtro__producto">
        <span>Producto:</span>
        <Select
          inputId="filtro-producto"
          isMulti
          name="producto"
          options={productos}
          className="basic-multi-select"
          classNamePrefix="select"
          value={productosSeleccionados}
          onChange={(e: any) => setProductosSeleccionados(e)}
          placeholder="Filtrar producto"
        />
      </div>
    </div>
  );
};

export default Filtro;
