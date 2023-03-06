import React, { useEffect, useState } from "react";
import styles from "./LoginClient.module.css";
import { useHistory, useParams } from "react-router-dom";
import Footer from "../../Components/Footer/Footer";
import NavbarTwo from "../../Components/NavbarTwo/NavbarTwo";
import { useDispatch, useSelector } from "react-redux";

import { auth, handleSignInWithGoogle } from "../../firebase-config";

import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";

import Swal from "sweetalert2";
import AuthProvider from "../../Components/AuthProvider/AuthProvider";
import Loading from "../Loading/Loading";

const LoginClient = () => {
  const history = useHistory();
  const { id } = useParams();
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

  const handleUserLoggedIn = async (id) => {
    // si se logueo correctamente que le mande a su calendario
    const user = auth.currentUser;
    if (user) {
      // El usuario ya ha iniciado sesión, redirigir al usuario a la página de destino
      history.push(`/form/${id}`);
      return;
    }
    await Swal.fire({
      title: "Logueo exitoso",
      icon: "success",
      text: "El usuario ha sido logueado correctamente.",
      confirmButtonText: "Aceptar",
    }).then(() => {
      history.push(`/form/${id}`);
    });
  };
  const handleUserNotLoggedIn = () => {
    // si no esta logueado que le muestre el form
    setCurrentState(2);
  };
  const handleUserNotRegistered = async (id) => {
    const user = auth.currentUser;
    if (user) {
      // El usuario ya ha iniciado sesión, redirigir al usuario a la página de destino
      history.push(`/form/${id}`);
      return;
    }
    await Swal.fire({
      title: "Logueo exitoso",
      icon: "success",
      text: "El usuario ha sido logueado correctamente.",
      confirmButtonText: "Aceptar",
    }).then(() => {
      // redirigir cuando acepta popup
      history.push(`/form/${id}`);
    });
  };

  if (state === 1) {
    return (
      <div>
        <NavbarTwo />
        <div
          className={
            darkMode === false ? styles.container : styles.containerDark
          }
        >
          <form onSubmit={submitHandler} className={styles.form}>
            <h1 className={styles.tittle}>LOGIN</h1>

            <label className={styles.label}>EMAIL:</label>
            <br />
            <input
              className={styles.input}
              type="text"
              required
              value={form.email}
              onChange={changeHandler}
              name="email"
            />

            <label className={styles.label}>CONTRASEÑA:</label>
            <br />
            <input
              className={styles.input}
              type="password"
              required
              value={form.name}
              onChange={changeHandler}
              name="password"
            />
            <button type="submit" className={styles.button}>
              LOGIN
            </button>
            <button
              className={styles.googlebtn}
              onClick={handleSignInWithGoogle}
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                alt="Google logo"
              />
              Sign in with Google
            </button>
          </form>
        </div>
        <Footer></Footer>
      </div>
    );
  }

  if (state === 2) {
    return (
      <>
        <NavbarTwo />
        <div className={styles.container2}>
          <div className={styles.img2}></div>
          <div>
            <form className={styles.form2}>
              <h2 className={styles.tittle2}>Bienvenido a Flex agenda!</h2>
              <label className={styles.email}>Email:</label>
              <input type="text" className={styles.email_input} />
              <p className={styles.error_email}>Email ingresado no valido</p>

              <label className={styles.password}>Contraseña:</label>
              <input type="password" className={styles.password_input} />
              <p className={styles.error}>contraseña no valida</p>
              <button className={styles.login}>Iniciar sesion</button>
              <h3 className={styles.o}>o</h3>
              <div className={styles.register}>
                <div className={styles.register_items}>
                  <p className={styles.text}>No tienes una cuenta?</p>
                  <a href="#" className={styles.signUp}>
                    registrarse
                  </a>
                </div>
              </div>
              <button className={styles.google}>
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                  alt="Google logo"
                />
                Continuar con google
              </button>
            </form>
          </div>
        </div>
      </>
    );
  }

  // todas las validaciones se manejan aca
  return (
    <AuthProvider
      id={id}
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

export default LoginClient;
