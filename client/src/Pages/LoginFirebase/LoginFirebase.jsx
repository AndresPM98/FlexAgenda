import React, { useEffect, useState } from "react";
import styles from "./LoginFirebase.module.css";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Footer from "../../Components/Footer/Footer";
import NavbarTwo from "../../Components/NavbarTwo/NavbarTwo";
import { useDispatch, useSelector } from "react-redux";

import { auth } from "../../firebase-config";

import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { async } from "@firebase/util";
import { getProfessionals } from "../../Redux/Actions";

const LoginFirebase = () => {
  const history = useHistory();
  const darkMode = useSelector((state) => state.darkMode);
  const professionals = useSelector((state) => state.allProfessionals);
  const dispatch = useDispatch();
  const [currentUser, setCurrentUser] = useState(null);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    dispatch(getProfessionals());
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    return () => {
      unsubscribe();
    };
  }, []);

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
  };
  if (currentUser) {
    const findProf = professionals.find((prof) => prof.email === form.email);
    history.push(`/home/${findProf.id}`);
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
