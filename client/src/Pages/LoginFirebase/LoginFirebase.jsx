import React, { useEffect, useState } from "react";
import styles from "./LoginFirebase.module.css";
import { useHistory } from "react-router-dom";
import Footer from "../../Components/Footer/Footer";
import NavbarTwo from "../../Components/NavbarTwo/NavbarTwo";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { auth } from "../../firebase-config";

import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";

import Swal from "sweetalert2";
import AuthProvider from "../../Components/AuthProvider/AuthProvider";
import Loading from "../Loading/Loading";

const LoginFirebase = () => {
  const history = useHistory();
  const darkMode = useSelector((state) => state.darkMode);

  // depende el estado se renderiza algo, no funcionando actualmente
  const [state, setCurrentState] = useState(null);
  //enviar al auth de firebase para que verifique
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  // ir seteando el form
  const changeHandler = (event) => {
    const property = event.target.name;
    const value = event.target.value;

    setForm({ ...form, [property]: value });
  };

  const handleSignInWithGoogle = async () => {
    const googleProvider = new GoogleAuthProvider();

    const signInWithGoogle = async (googleProvider) => {
      try {
        const res = await signInWithPopup(auth, googleProvider).then(() => {
          // history.push(`/`);
          console.log("se ha logueado con google correctamente");
        });
      } catch (error) {
        console.log(error);
      }
    };
    setCurrentState(true);
    await signInWithGoogle(googleProvider);
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    // loguearse con mail
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "El correo o contraseña ingresado es incorrecto.",
        icon: "error",
      });
      console.error(error.message);
    }
  };

  const handleUserLoggedIn = async (id, register) => {
    // si se logueo correctamente que le mande a su calendario
    const prof = await axios.get("/professional");
    const findProf = prof.data.find((pro) => pro.email === register.email);
    console.log(findProf);
    const user = auth.currentUser;
    if (user) {
      // El usuario ya ha iniciado sesión, redirigir al usuario a la página de destino
      history.push(`/Calendarpage/${findProf.id}`);
      return;
    }
    await Swal.fire({
      title: "Logueo exitoso",
      icon: "success",
      text: "El usuario ha sido logueado correctamente.",
      confirmButtonText: "Aceptar",
    }).then(() => {
      history.push(`/Calendarpage/${findProf.id}`);
    });
  };
  const handleUserNotLoggedIn = () => {
    // si no esta logueado que le muestre el form
    setCurrentState(1);
  };
  const handleUserNotRegistered = () => {};

  if (state === 1) {
    return (
      <div>
        <NavbarTwo />
        <div className={ styles.container}>
        <div className={styles.img2}></div>
          <form onSubmit={submitHandler} className={styles.form}>
            <h1 className={styles.tittle}>LOGIN</h1>

            <label className={styles.email}>EMAIL:</label>
            <br />
            <input
              className={styles.email_input}
              type="text"
              required
              value={form.email}
              onChange={changeHandler}
              name="email"
            />

            <label className={styles.password}>CONTRASEÑA:</label>
            <br />
            <input
              className={styles.password_input}
              type="password"
              required
              value={form.name}
              onChange={changeHandler}
              name="password"
            />
            <button type="submit" className={styles.login}>
              LOGIN
            </button>
          </form>
        </div>
        <Footer></Footer>
      </div>
    );
  }

  // todas las validaciones se manejan aca
  return (
    <AuthProvider
      onUserLoggedIn={handleUserLoggedIn}
      onUserNotLoggedIn={handleUserNotLoggedIn}
      onUserNotRegistered={handleUserNotRegistered}
    >
      <NavbarTwo></NavbarTwo>
      <Loading />
      <Footer></Footer>
    </AuthProvider>
  );
};

export default LoginFirebase;
