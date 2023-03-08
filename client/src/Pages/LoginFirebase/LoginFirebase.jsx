import React, { useState } from "react";
import styles from "./LoginFirebase.module.css";
import { useHistory } from "react-router-dom";
import Footer from "../../Components/Footer/Footer";
import NavbarTwo from "../../Components/NavbarTwo/NavbarTwo";
import axios from "axios";
import { auth } from "../../firebase-config";

import { signInWithEmailAndPassword } from "firebase/auth";

import Swal from "sweetalert2";
import AuthProvider from "../../Components/AuthProvider/AuthProvider";
import Loading from "../Loading/Loading";
import { validate } from "./validation";

const LoginFirebase = () => {
  const history = useHistory();
  const [botonTexto, setBotonTexto] = useState("Iniciar Sesion");

  // depende el estado se renderiza algo, no funcionando actualmente
  const [state, setCurrentState] = useState(null);
  //enviar al auth de firebase para que verifique
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  // ir seteando el form
  const changeHandler = (event) => {
    const property = event.target.name;
    const value = event.target.value;

    setForm({ ...form, [property]: value });
  };

  const blurvalidation = (event) => {
    const property = event.target.name;
    const value = event.target.value;
    setErrors(
      validate({
        ...form,
        [property]: value,
      })
    );
  };

  function mostrarCargando() {
    setBotonTexto("Cargando...");
    setTimeout(function () {
      setBotonTexto("Iniciar Sesion");
    }, 2000);
  }
  const submitHandler = async (event) => {
    event.preventDefault();
    mostrarCargando();
    // loguearse con mail
    if (!form.email || !form.password) {
      await Swal.fire({
        title: "ha ocurrido un error",
        icon: "error",
        text: "Debes rellenar todos los campos.",
        confirmButtonText: "Aceptar",
      });
      return;
    }
    if (errors.email || errors.password) {
      await Swal.fire({
        title: "ha ocurrido un error",
        icon: "error",
        text: "Debes validar todos los campos.",
        confirmButtonText: "Aceptar",
      });
      return;
    }
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );
    } catch (error) {
      error.message.includes("password")
        ? setErrors(
            validate(
              {
                ...form,
              },
              "password"
            )
          )
        : setErrors(
            validate(
              {
                ...form,
              },
              "email"
            )
          );
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
        <div className={styles.container}>
          <div className={styles.img2}></div>
          <form onSubmit={submitHandler} className={styles.form}>
            <h1 className={styles.tittle}>Iniciar sesion</h1>

            <label className={styles.email}>EMAIL:</label>
            <br />
            <input
              className={styles.email_input}
              type="text"
              value={form.email}
              onChange={changeHandler}
              onBlur={blurvalidation}
              name="email"
            />
            {errors.email && (
              <p className={styles.error_email}>{errors.email}</p>
            )}

            <label className={styles.password}>CONTRASEÑA:</label>
            <br />
            <input
              className={styles.password_input}
              type="password"
              value={form.password}
              onChange={changeHandler}
              name="password"
            />
            {errors.password && (
              <p className={styles.error_password}>{errors.password}</p>
            )}
            <button type="submit" className={styles.login}>
              {botonTexto}
            </button>
            <div className={styles.register}>
              <div className={styles.register_items}>
                <p className={styles.text}>No tienes una cuenta?</p>
                <a href={`/SignUp`} className={styles.signUp}>
                  registrarse
                </a>
              </div>
            </div>
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
