import React from "react";
import NavbarTwo from "../../Components/NavbarTwo/NavbarTwo";
import Footer from "../../Components/Footer/Footer";
import styles from "./FormClient.module.css";
import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import AuthProvider from "../../Components/AuthProvider/AuthProvider";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import {
  auth,
  RegisterEmailUser,
  createClient,
  handleSignInWithGoogle,
} from "../../firebase-config";
import Swal from "sweetalert2";
import { validate } from "./validation";
import { async } from "@firebase/util";

const FormClient = () => {
  const darkMode = useSelector((state) => state.darkMode);
  const history = useHistory();
  const { id } = useParams();

  const [state, setCurrentState] = useState(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
  });

  const changeHandler = (event) => {
    const property = event.target.name;
    const value = event.target.value;

    setForm({ ...form, [property]: value });
    if (property !== "email") {
      setErrors(
        validate({
          ...form,
          [property]: value,
        })
      );
    }
  };

  const blurvalidation = async (event) => {
    const property = event.target.name;
    const value = event.target.value;
    const allClients = await axios.get("/client");
    if (property === "email") {
      setErrors(
        validate(
          {
            ...form,
            [property]: value,
          },
          allClients.data
        )
      );
    }
  };

  // try {
  //   //registramos el usuario
  //   const { user } = await RegisterEmailUser(auth, form);
  //   // guardamos en db de firestore
  //   await createUser(user.uid, form);
  //   //guardamos en nuestra db
  //   if (user) {
  //     const prof = await axios.post("/professional", {
  //       ...form,
  //       firebaseId: user.uid,
  //     });
  //     // pop up que todo salio OK
  //     await Swal.fire({
  //       title: "Registro exitoso",
  //       icon: "success",
  //       text: "El usuario ha sido registrado correctamente.",
  //       confirmButtonText: "Aceptar",
  //     }).then(() => {
  //       // redirigir cuando acepta popup
  //       history.push(`/Calendarpage/${prof.data.id}`);
  //     });
  //   }
  // } catch (error) {
  //   Swal.fire({
  //     title: "Error",
  //     text: "El correo electrónico ingresado ya está en uso.",
  //     icon: "error",
  //   });
  // }
  const submitHandler = async (event) => {
    event.preventDefault();
    //              registramos el usuario
    if (!form.name || !form.email || !form.password) {
      console.log("debes rellenar todos los campos");
      return;
    }
    if (!errors.name && !errors.email && !errors.password) {
      const { user } = await RegisterEmailUser(auth, form);

      await createClient(user.uid, form);

      axios
        .post("https://backend-pf-production-1672.up.railway.app/client", form)
        .then((res) => {})
        .catch((err) => alert(err));
    } else {
      await Swal.fire({
        title: "ha ocurrido un error",
        icon: "error",
        text: "Debes validar todos los campos.",
        confirmButtonText: "Aceptar",
      });
    }
  };

  const handleUserLoggedIn = async (id) => {
    await Swal.fire({
      title: "Registro exitoso",
      icon: "success",
      text: "El usuario ha sido registrado correctamente.",
      confirmButtonText: "Aceptar",
    }).then(() => {
      // redirigir cuando acepta popup
      history.push(`/form/${id}`);
    });
  };
  const handleUserNotLoggedIn = () => {
    // si no esta logueado que le muestre el form
    setCurrentState(2);
  };
  const handleUserNotRegistered = async (id) => {
    console.log(id);
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
    // pop up que todo salio OK
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
            <h1 className={styles.tittle}>CREA TU CUENTA </h1>

            <label className={styles.label}>NOMBRE:</label>
            <input
              className={styles.input}
              type="text"
              required
              value={form.name}
              onChange={changeHandler}
              name="name"
            />

            <label className={styles.label}>EMAIL:</label>
            <input
              className={styles.input}
              type="text"
              required
              value={form.email}
              onChange={changeHandler}
              name="email"
            />
            {errors.email && <span>{errors.email}</span>}

            <label className={styles.label}>DNI:</label>
            <input
              className={styles.input}
              type="password"
              value={form.password}
              onChange={changeHandler}
              name="password"
            />

            <button type="submit" className={styles.button}>
              REGISTRARSE
            </button>
            <button
              className={styles.googlebtn}
              onClick={handleSignInWithGoogle}
              type="button"
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
            <form className={styles.form2} onSubmit={submitHandler}>
              <h2 className={styles.tittle2}>Bienvenido a Flex agenda!</h2>
              <label className={styles.name}>Nombre:</label>
              <input
                className={styles.name_input}
                type="text"
                value={form.name}
                onChange={changeHandler}
                onBlur={blurvalidation}
                name="name"
              />
              {errors.name && (
                <p className={styles.name_error}>{errors.name}</p>
              )}
              <label className={styles.email}>Email:</label>
              <input
                type="text"
                value={form.email}
                onChange={changeHandler}
                onBlur={blurvalidation}
                name="email"
                className={styles.email_input}
              />
              {/* <p className={styles.error_email}>Email ingresado no valido</p> */}
              {errors.email && (
                <p className={styles.error_email}>{errors.email}</p>
              )}
              <label className={styles.password}>Contraseña:</label>
              <input
                type="password"
                value={form.password}
                onChange={changeHandler}
                onBlur={blurvalidation}
                name="password"
                className={styles.password_input}
              />
              {errors.password && (
                <p className={styles.error_password}>{errors.password}</p>
              )}
              <button className={styles.login}>Registrarse</button>
              <h3 className={styles.o}>o</h3>
              <div className={styles.register}>
                <div className={styles.register_items}>
                  <p className={styles.text}>Ya te has regstrado?</p>
                  <a href={`/loginClient/${id}`} className={styles.signUp}>
                    Iniciar Sesion
                  </a>
                </div>
              </div>
              <button
                className={styles.google}
                onClick={handleSignInWithGoogle}
              >
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

  return (
    <AuthProvider
      id={id}
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

export default FormClient;
