/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";

/*
El objeto de valores O State inicial
debe ser un objeto que comparta los mismos atributos de los valores que se validan idealmente,
ej:
const stateInicial = {
  nombre: "",
  rut: "",
  email: "",
  celular: "",
  region: "",
  ciudad: "",
  direccion: "",
  password: "",
  password2: "",
};

donde vemos que este mismo objeto servira de estructura para crear un objeto de errores y para asignar valores, por tanto los nombres
son los mismos.
por defecto se asume que es asi, pero si no se cumple esta condicion, se debe pasar un objetoErrores.
fn: Función que se ejecuta en el componente. por ej: crearCuenta().

*/

const useValidacion = (
  objetoDeValores: { [key: string]: any },
  validar: (datosEntrada: { [key: string]: any }) => { [key: string]: any },
  fn: () => any,
  objetoErrores: { [key: string]: any } | null = null
) => {
  //si objetoErrores no existe entonces se asume que los errores tienen el mismo nombre que los valores
  //Tanto objetoErrores como objetoDeValores deben ser objetos con sus atributos en formato key:value donde value sea vacio "", null, false, etc
  //De esta forma se entiende que la condicion de No error es que todos los valores esten vacios, es decir, en la forma que se inicializo el objeto.
  // objeto sin errores -> objeto con errores o objeto sin errores.
  objetoErrores = objetoErrores || objetoDeValores;

  const [valores, setValores] = useState({ ...objetoDeValores });
  const [errores, setErrores] = useState({ ...objetoErrores });
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
      const erroresValidacion: { [key: string]: any } = validar(valores);
      const noErrores = Object.keys(erroresValidacion).length;

      if (noErrores === 0) {
        fn(); // Fn = Función que se ejecuta en el componente
      }
      setErrores({ ...objetoErrores, ...erroresValidacion });
      setSubmitForm(false);
    }
  }, [submitForm]);

  // Función que se ejecuta conforme el usuario escribe algo (si quiero validacion handleChange añado el segundo parámetro como true)
  //formatoInput es una funcion que da formato al input, por ejemplo, si queremos que el input quede en mayusculas, podemos añadir una funcion que lo haga.
  //ej: input = "texto" => formatoInput(input) = "Texto" (en este caso la funcion deja la primera letra en mayuscula y las demas en minuscula)
  //y asi se guardara en el objeto de valores.
  //Esto es para no manejar objetos vacios y evitar referencias no existente para el objeto errores.
  const handleChange = (
    e: any,
    validacionOnChange = false,
    formatoInput: any = false
  ) => {
    if (validacionOnChange) {
      const erroresValidacion: { [key: string]: any } = validar(valores);
      setErrores({ ...objetoErrores, ...erroresValidacion });
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
    const erroresValidacion: { [key: string]: any } = validar(valores);
    setErrores({ ...objetoErrores, ...erroresValidacion });
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
    sendChange,
  };
};

export default useValidacion;
