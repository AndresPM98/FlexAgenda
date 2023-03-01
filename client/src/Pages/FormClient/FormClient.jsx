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
import { auth } from "../../firebase-config";

const FormClient = () => {
  const darkMode = useSelector((state) => state.darkMode);
  const history = useHistory();
  const { id } = useParams();

  const [state, setCurrentState] = useState(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    dni: "",
  });

  const [error, setErrors] = useState({
    name: "",
    email: "",
    dni: "",
  });

  const validate = (form) => {
    if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(form.email)) {
      setErrors({ ...error, email: "" });
    } else {
      setErrors({ ...error, email: "Hay un error en email" });
    }

    if (form.email === "") setErrors({ ...error, email: "email " });
  };

  const changeHandler = (event) => {
    const property = event.target.name;
    const value = event.target.value;

    setForm({ ...form, [property]: value });
    validate({ ...form, [property]: value });
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

  const submitHandler = (event) => {
    event.preventDefault();
    axios
      .post("https://backend-pf-production-1672.up.railway.app/client", form)
      .then((res) => {
        alert("Created correctly");
        history.push(`/form/${id}`);
      })
      .catch((err) => alert(err));
  };

  const handleUserLoggedIn = async (id) => {};
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
            {error.email && <span>{error.email}</span>}

            <label className={styles.label}>DNI:</label>
            <input
              className={styles.input}
              type="text"
              value={form.dni}
              onChange={changeHandler}
              name="dni"
            />

            <button type="submit" className={styles.button}>
              REGISTRARSE
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

export default FormClient;
