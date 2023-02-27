import React, { useEffect, useState } from "react";
import styles from "./LoginFirebase.module.css";
import { useHistory } from "react-router-dom";
import Footer from "../../Components/Footer/Footer";
import NavbarTwo from "../../Components/NavbarTwo/NavbarTwo";
import { useDispatch, useSelector } from "react-redux";

import { auth } from "../../firebase-config";

import { signInWithEmailAndPassword } from "firebase/auth";

import Swal from "sweetalert2";
import AuthProvider from "../../Components/AuthProvider/AuthProvider";

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

  // const handleSignInWithGoogle = async () => {
  //   const googleProvider = new GoogleAuthProvider();

  //   const signInWithGoogle = async (googleProvider) => {
  //     try {
  //       const res = await signInWithPopup(auth, googleProvider).then(() => {
  //         // history.push(`/`);
  //         console.log("se ha logueado con google correctamente");
  //       });
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   setCurrentState(true);
  //   await signInWithGoogle(googleProvider);
  // };

  const submitHandler = async (event) => {
    event.preventDefault();
    // registrase con mail
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );
    } catch (error) {
      console.error(error);
    }
  };
  const handleUserLoggedIn = async (id) => {
    // si se logueo correctamente que le mande a su calendario
    await Swal.fire({
      title: "Registro exitoso",
      icon: "success",
      text: "El usuario ha sido registrado correctamente.",
      confirmButtonText: "Aceptar",
    }).then(() => {
      history.push(`/Calendarpage/${id}`);
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
            <button className={styles.googlebtn}>
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

  // todas las validaciones se manejan aca
  return (
    <AuthProvider
      onUserLoggedIn={handleUserLoggedIn}
      onUserNotLoggedIn={handleUserNotLoggedIn}
      onUserNotRegistered={handleUserNotRegistered}
    >
      <NavbarTwo></NavbarTwo>
      loading...
      <Footer></Footer>
    </AuthProvider>
  );
};

export default LoginFirebase;
