/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";

const useValidacion = (
  objetoDeValores: any,
  validar: (datosEntrada: any) => any,
  fn: () => any
) => {
  const [valores, setValores] = useState(objetoDeValores);
  const [errores, setErrores] = useState({});
  const [submitForm, setSubmitForm] = useState(false);
  /*
  remplazarObjetoDeErroresConErroresEncontrados:
  esta funcion  llena el objeto de errores con los errores que se encuentren en la validacion
  la idea es que el objeto de errores nunca quede vacio, sino solo que se resetee a su estado ideal.
  ej: {nombre: "", apellido: "", email: ""} seria un objeto cuyos valores no tienen errores
  ej2: {nombre: "", apellido: "Este atributo es obligatorio", email: "este email no es valido"} es un objeto cuyos valores tienen errores.
  */

  useEffect(() => {
    if (submitForm) {
      const erroresValidacion = validar(valores);
      const noErrores = Object.keys(erroresValidacion).length;

      if (noErrores === 0) {
        fn(); // Fn = Función que se ejecuta en el componente
      }
      setErrores(erroresValidacion);
      setSubmitForm(false);
    }
  }, [submitForm]);

  // Función que se ejecuta conforme el usuario escribe algo (si quiero validacion handleChange añado el segundo parámetro como true)
  //formatoInput es una funcion que da formato al input, por ejemplo, si queremos que el input quede en mayusculas, podemos añadir una funcion que lo haga.
  //ej: input = "texto" => formatoInput(input) = "Texto" (en este caso la funcion deja la primera letra en mayuscula y las demas en minuscula)
  //y asi se guardara en el objeto de valores
  const handleChange = (
    e: any,
    validacionOnChange = false,
    formatoInput: any = false
  ) => {
    if (validacionOnChange) {
      setErrores(validar(valores));
    }
    if (formatoInput) {
      setValores({
        ...valores,
        [e.target.name]: formatoInput(e.target.value),
      });
      return;
    }
    setValores({
      ...valores,
      [e.target.name]: e.target.value,
    });
  };

  // Función que se ejecuta cuando el usuario hace submit
  const handleSubmit = (e: any) => {
    e.preventDefault();
    setSubmitForm(true);
  };

  // cuando se realiza el evento de blur
  const handleBlur = () => {
    setErrores(validar(valores));
  };

  //funcion para mandar un cambio manualmente
  const sendChange = (objeto: any) => {
    setValores({
      ...valores,
      ...objeto,
    });
  };

  return {
    valores,
    errores,
    handleSubmit,
    handleChange,
    handleBlur,
    sendChange
  };
};

export default useValidacion;
