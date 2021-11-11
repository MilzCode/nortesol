import React, { useEffect, useState, useRef } from "react";
import dynamic from "next/dynamic";
import "suneditor/dist/css/suneditor.min.css"; // Import Sun Editor's CSS File
// import SunEditorCore from "suneditor/src/lib/core";
const SunEditor = dynamic(() => import("suneditor-react"), {
  ssr: false,
});
const configSunEditor = {
  height: "500px",
  resizingBar: false,
  font: ["Roboto", "Arial", "tahoma", "Courier New,Courier"],
  defaultStyle: "font-family: Roboto; font-size:16px; line-height: 1;",
  imageFileInput: false,
  videoFileInput: false,
  buttonList: [
    // default
    ["undo", "redo"],
    [
      ":p-Opciones de Texto-default.more_paragraph",
      "font",
      "fontSize",
      "formatBlock",
    ],
    ["bold", "underline", "italic", "strike"],
    ["fontColor", "hiliteColor", "textStyle"],
    ["align"],
    ["removeFormat"],
    ["outdent", "indent"],
    ["list", "horizontalRule", "table"],
    ["subscript", "superscript"],
    ["link", "image", "video"],
    ["print"],
  ],
};

//remueve src las imagenes que el usuario añade arrastrando hacia el editor.
// const removeImagesSunEditor = (body_: string) => {
//   const newBody = new DOMParser().parseFromString(body_, "text/html").body;

//   let images = newBody.getElementsByTagName("img");
//   for (let i = 0; i < images.length; i++) {
//     // images[i].src = "https://picsum.photos/50/50";
//     // images[i].id = "img" + i;
//     if (images[i].src.includes("data:image")) {
//       // images[i].remove();
//       images[i].src = "";
//     }
//   }

//   console.log(newBody);
// };
interface editorTextoProps {
  setStateContenido: any;
  setStateImagesToUpload: any;
}

const EditorTexto = ({
  setStateContenido,
  setStateImagesToUpload,
}: editorTextoProps) => {
  // const editor = useRef<SunEditorCore>();
  // const getSunEditorInstance = (sunEditor: SunEditorCore) => {
  //   editor.current = sunEditor;
  // };
  const handleContenido = (e: any) => {
    setStateContenido(e);
  };

  useEffect(() => {}, []);

  // @ts-ignore
  const handleOnImageUpload = async (
    // @ts-ignore
    targetElement, // @ts-ignore
    // @ts-ignore
    index, // @ts-ignore
    // @ts-ignore
    state, // @ts-ignore
    imageInfo, // @ts-ignore
    remainingFilesCount
  ) => {
    if (imageInfo && imageInfo.size > 0) {
      setStateImagesToUpload[index] = imageInfo;
    }
    if (state === "delete") {
      delete setStateImagesToUpload[index];
    }
  };

  return (
    <div className="test">
      <br />
      <SunEditor
        lang="es"
        setOptions={configSunEditor as any}
        onChange={handleContenido}
        onImageUpload={handleOnImageUpload}
        onVideoUpload={(e) => {
          return;
        }}
        onAudioUpload={(e) => {
          return;
        }}
      />
      <br />
    </div>
  );
};
export default EditorTexto;
