import { initializeApp, getApps } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import firebaseConfig from "./config";

class Firebase {
  constructor() {
    if (!getApps().length) {
      this.app = initializeApp(firebaseConfig);
    }
    this.auth = getAuth(this.app);

    // this.db = app.firestore();
    // this.storage = app.storage();
  }

  // Registra un usuario

  async registrar(
    nombre,
    email,
    password,
    rut,
    celular,
    region,
    ciudad,
    direccion
  ) {
    const nuevoUsuario = await createUserWithEmailAndPassword(
      this.auth,
      email,
      password
    );
    const direcciones = [
      { nombreDir: "Direccion1", region, ciudad, direccion },
    ];

    return await updateProfile(nuevoUsuario.user, {
      displayName: nombre,
      rut,
      celular,
      direcciones,
    });
  }

  // Inicia sesión del usuario
  async login(email, password) {
    return await signInWithEmailAndPassword(this.auth, email, password);
  }

  // Cierra la sesión del usuario
  async out() {
    return await signOut(this.auth);
  }
}

const firebase = new Firebase();
export default firebase;
