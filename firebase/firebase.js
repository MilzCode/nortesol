import { initializeApp, getApps } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
//import firestore
import {
  collection,
  doc,
  setDoc,
  addDoc,
  getFirestore,
  getDoc,
  updateDoc,
} from "firebase/firestore";

import firebaseConfig from "./config";

class Firebase {
  constructor() {
    if (!getApps().length) {
      this.app = initializeApp(firebaseConfig);
    }
    this.auth = getAuth(this.app);
    this.db = getFirestore(this.app);
    this.hola = "holaFirebase";

    // this.db = app.firestore();
    // this.storage = app.storage();
  }

  // async añadirDato(dato) {
  //   // const docRef = await addDoc(collection(this.db, "collection"), dato);
  //   const docRef = await setDoc(doc(this.db, "collection", "5599"), dato);
  //   // console.log(docRef);
  // }

  // Registra un datos de contacto y rut de un usuario
  async registrarDatosUsuario(
    rut,
    celular,
    region,
    ciudad,
    direccion,
    uid,
    fechaCreacion
  ) {
    const ubicacion = {
      dir1: {
        nombreDir: "Direccion1" + uid,
        region,
        ciudad,
        direccion,
      },
    };

    // const ubicacion = {
    //   nombreDir: "Direccion" + uid,
    //   region,
    //   ciudad,
    //   direccion,
    // };

    return await setDoc(doc(this.db, "usuarios", fechaCreacion + uid), {
      rut,
      celular,
      ubicacion,
      uid,
    });
  }

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
    //si no se logra registra con exito salimos del metodo
    if (!nuevoUsuario.user.uid) return false;
    // console.log(nuevoUsuario.user.metadata.createdAt);
    //Registrar datos de contacto y su rut
    this.registrarDatosUsuario(
      rut,
      celular,
      region,
      ciudad,
      direccion,
      nuevoUsuario.user.uid,
      nuevoUsuario.user.metadata.createdAt
    );

    //ingresamos el nombre del usuario
    return await updateProfile(nuevoUsuario.user, {
      displayName: nombre,
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

  // Obtener mis datos de contacto
  async getMeData() {
    const docRef = doc(
      this.db,
      "usuarios",
      this.auth.currentUser.metadata.createdAt + this.auth.currentUser.uid
    );
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      return null;
    }
  }

  async updateName(name) {
    return await updateProfile(this.auth.currentUser, {
      displayName: name,
    });
  }
  //actualiza los datos del usuario recibe un objeto por parametro
  async updateMeData(data) {
    data = { ...data, uid: this.auth.currentUser.uid };
    const docRef = doc(
      this.db,
      "usuarios",
      this.auth.currentUser.metadata.createdAt + this.auth.currentUser.uid
    );
    return await updateDoc(docRef, data);
  }
  //este metodo devuelve true cuando se es admin.
  //tambien esta validado en la base de datos, pero asi agilizas el proceso de controlar el acceso al frontend
  async isAdmin() {
    try {
      const docRef = doc(this.db, "admin-test", "admin-test");
      const docSnap = await getDoc(docRef);
      return true;
    } catch (error) {
      return false;
    }
  }
}

const firebase = new Firebase();
export default firebase;
