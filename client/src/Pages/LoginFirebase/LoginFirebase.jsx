import React, { useEffect, useState } from "react";
import styles from "./LoginFirebase.module.css";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Footer from "../../Components/Footer/Footer";
import NavbarTwo from "../../Components/NavbarTwo/NavbarTwo";
import { useSelector } from "react-redux";

import { auth } from "../../firebase-config";

import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { async } from "@firebase/util";

const LoginFirebase = () => {
  const history = useHistory();
  const [currentUser, setCurrentUser] = useState(null);
  const darkMode = useSelector((state) => state.darkMode);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  //   const [error, setErrors] = useState({
  //     email: "",
  //     name: "",
  //   });

  //   const validate = (form) => {
  //     if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(form.email)) {
  //       setErrors({ ...error, email: "" });
  //     } else {
  //       setErrors({ ...error, email: "Hay un error en email" });
  //     }

  //     if (form.email === "") setErrors({ ...error, email: "email " });
  //   };

  const changeHandler = (event) => {
    const property = event.target.name;
    const value = event.target.value;

    setForm({ ...form, [property]: value });
    // validate({ ...form, [property]: value });
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    try {
      const user = await signInWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );
      console.log("Logueo exitoso", user);
      // Aquí puedes hacer cualquier cosa que necesites después de que el usuario haya iniciado sesión, como redireccionar a otra página o mostrar un mensaje de bienvenida
    } catch (error) {
      console.error(error);
      // Aquí puedes manejar el error de inicio de sesión, como mostrar un mensaje de error al usuario
    }
    // axios
    //   .post("https://backend-pf-production-1672.up.railway.app/client", form)
    //   .then((res) => {
    //     alert("Created correctly");
    //     // history.push(`/form/${id}`);
    //   })
    //   .catch((err) => alert(err));
  };
  if (currentUser) {
    history.push("/");
  }
  return (
    <div>
      <NavbarTwo />
      <div
        className={darkMode === false ? styles.container : styles.containerDark}
      >
        <form onSubmit={submitHandler} className={styles.form}>
          <h1 className={styles.tittle}>LOGIN</h1>

          <label className={styles.label}>EMAIL:</label>
          <input
            className={styles.input}
            type="text"
            required
            value={form.email}
            onChange={changeHandler}
            name="email"
          />

          <label className={styles.label}>PASSWORD:</label>
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
        </form>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default LoginFirebase;
