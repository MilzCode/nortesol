import { useEffect, useState } from "react";
import firebase from "../firebase";

const useAutenticacion = async () => {
  const userInicial: any = null;

  const [usuario, setUsuario] = useState(userInicial);
  useEffect(() => {
    const onsuscribe = firebase.auth.onAuthStateChanged((user) => {
      setUsuario(user);
    });
    return () => onsuscribe();
  }, []);
  return usuario;
};

export default useAutenticacion;
