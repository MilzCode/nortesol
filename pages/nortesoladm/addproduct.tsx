/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";
import BotonFAColores1 from "../../components/general/BotonFAColores1";
import Volver from "../../components/general/Volver";
import EditorTexto from "../../components/nortesoladm/EditorTexto";
import ProductoBody from "../../components/venta/ProductoBody";
import ProductoHead from "../../components/venta/ProductoHead";
import ProductoRelacionados from "../../components/venta/ProductoRelacionados";

const Addproduct = ({ auth, me }: any) => {
  if (!auth || !me.admin) {
    window.location.href = "/";
    return null;
  }
  const [contenidoToUpload, setContenidoToUpload] = useState("");
  const [imagenesToUpload, setImagenesToUpload] = useState({});
  const [title, setTitle] = useState("");
  const [precio, setPrecio] = useState(9999999);
  const [cantidadDisponible, setCantidadDisponible] = useState(0);
  const [siguiente, setSiguiente] = useState(false);
  const [preview, setPreview] = useState(false);
  useEffect(() => {
    const contenidoInicial = localStorage.getItem("contenidoNsol982");
    const precioInicial = localStorage.getItem("precioNsol982");
    const cantidadInicial = localStorage.getItem("cantidadDisponibleNsol982");
    const titleInicial = localStorage.getItem("titleNsol982");
    if (contenidoInicial) setContenidoToUpload(contenidoInicial);
    if (precioInicial) setPrecio(parseInt(precioInicial));
    if (cantidadInicial) setCantidadDisponible(parseInt(cantidadInicial));
    if (titleInicial) setTitle(titleInicial);
  }, []);

  const handdleGuardarLocalmente = () => {
    localStorage.setItem("contenidoNsol982", contenidoToUpload);
    // localStorage.setItem("imagenesNsol982", JSON.stringify(imagenesToUpload));
    localStorage.setItem("titleNsol982", title);
    //convert precio to string
    localStorage.setItem("precioNsol982", precio.toString());
    localStorage.setItem(
      "cantidadDisponibleNsol982",
      cantidadDisponible.toString()
    );
  };
  const handdleBorrarContenido = () => {
    localStorage.removeItem("contenidoNsol982");
    // localStorage.removeItem("imagenesNsol982");
    localStorage.removeItem("titleNsol982");
    localStorage.removeItem("precioNsol982");
    localStorage.removeItem("cantidadDisponibleNsol982");
    window.location.href = "/nortesoladm/addproduct";
  };
  const handdleSiguiente = () => {
    handdleGuardarLocalmente();
    setSiguiente(true);
  };
  const handdleAnterior = () => {
    handdleGuardarLocalmente();
    setSiguiente(false);
  };
  const handdlePreview = () => {
    !preview && handdleGuardarLocalmente();
    setPreview(!preview);
  };
  const handdleTitle = (e: any) => {
    setTitle(e.target.value);
  };
  const handdlePrecio = (e: any) => {
    setPrecio(e.target.value);
  };
  const handdleCantidadDisponible = (e: any) => {
    setCantidadDisponible(e.target.value);
  };
  return (
    <>
      <Volver />
      <hr />
      <div className="BOTONES">
        {!preview && (
          <>
            <BotonFAColores1
              onClick={handdleBorrarContenido}
              backgroundColor="#f9423a"
            >
              Borrar
            </BotonFAColores1>
            <BotonFAColores1 onClick={handdleGuardarLocalmente}>
              Guardar
            </BotonFAColores1>

            {siguiente && (
              <BotonFAColores1
                backgroundColor="#ff6a39"
                onClick={handdleAnterior}
              >
                <i className="fas fa-arrow-left"></i>
                &nbsp;Anterior
              </BotonFAColores1>
            )}

            {!siguiente && (
              <BotonFAColores1
                backgroundColor="#00a5df"
                onClick={handdleSiguiente}
              >
                Siguiente&nbsp;
                <i className="fas fa-arrow-right"></i>
              </BotonFAColores1>
            )}
          </>
        )}
        <BotonFAColores1 backgroundColor="#69b3e7" onClick={handdlePreview}>
          {!preview && <i className="fas fa-eye"></i>}
          {preview && <i className="fas fa-eye-slash"></i>}
        </BotonFAColores1>
      </div>
      <br />
      {!siguiente && !preview && (
        <>
          <h1 className="TITULOSFORM">Editor de descripción</h1>
          <hr />
          <EditorTexto
            setStateContenido={setContenidoToUpload}
            setStateImagesToUpload={setImagenesToUpload}
            dataInicial={contenidoToUpload}
          />
        </>
      )}
      {siguiente && !preview && (
        <>
          <h1 className="TITULOSFORM">Datos del producto</h1>
          <hr />
          <div className="LABELINPUT">
            <label>Título</label>
            <input type="text" value={title} onChange={handdleTitle} />
          </div>
          <div className="LABELINPUT">
            <label>Precio</label>
            <input type="number" value={precio} onChange={handdlePrecio} />
          </div>
          <div className="LABELINPUT">
            <label>Cantidad disponible</label>
            <input
              type="number"
              value={cantidadDisponible}
              onChange={handdleCantidadDisponible}
            />
          </div>
          <BotonFAColores1 backgroundColor="#48d597">
            Subir&nbsp;
            <i className="fas fa-arrow-up"></i>
          </BotonFAColores1>
        </>
      )}
      {preview && (
        <>
          <h1 className="TITULOSFORM">PREVISUALIZACIÓN</h1>
          <hr />
          <h1 className="producto__titulo">{title ? title : "SIN TITULO"}</h1>
          <ProductoHead precio={precio} />
          <ProductoBody contenido={contenidoToUpload} />
          <hr />
          <ProductoRelacionados />
          <br />
        </>
      )}
    </>
  );
};

export default Addproduct;
