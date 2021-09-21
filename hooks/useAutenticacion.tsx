import { useEffect, useState } from "react";
import firebase from "../firebase";

const useAutenticacion = () => {
  const userInicial: any = false;

  const [usuario, setUsuario] = useState(userInicial);
  useEffect(() => {
    const onsuscribe = firebase.auth.onAuthStateChanged((user) => {
      if (user) {
        setUsuario(user);
      } else {
        setUsuario(user);
      }
    });
    return () => onsuscribe();
  }, []);
  return usuario;
};

export default useAutenticacion;
