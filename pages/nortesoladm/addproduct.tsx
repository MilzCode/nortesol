/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from "react";
import Volver from "../../components/general/Volver";
import EditorTexto from "../../components/nortesoladm/EditorTexto";

const Addproduct = ({ auth, me }: any) => {
  if (!auth || !me.admin) {
    window.location.href = "/";
    return null;
  }
  const [contenidoToUpload, setContenidoToUpload] = useState("");
  const [imagenesToUpload, setImagenesToUpload] = useState({});

  return (
    <>
      <Volver />
      <EditorTexto
        setStateContenido={setContenidoToUpload}
        setStateImagesToUpload={setImagenesToUpload}
      />
    </>
  );
};

export default Addproduct;
