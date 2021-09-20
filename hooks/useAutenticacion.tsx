import { useEffect, useState } from "react";
import firebase from "../firebase";

const useAutenticacion = () => {
  const userInicial: any = null;

  const [usuario, setUsuario] = useState(userInicial);
  useEffect(() => {
    const onsuscribe = firebase.auth.onAuthStateChanged((user) => {
      if (user) {
        setUsuario(user);
      } else {
        setUsuario(null);
      }
    });
    return () => onsuscribe();
  }, []);
  return usuario;
};

export default useAutenticacion;
