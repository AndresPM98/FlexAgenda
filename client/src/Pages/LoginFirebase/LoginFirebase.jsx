import React, { useEffect, useState } from "react";
import styles from "./LoginFirebase.module.css";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Footer from "../../Components/Footer/Footer";
import NavbarTwo from "../../Components/NavbarTwo/NavbarTwo";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";

import { auth } from "../../firebase-config";

import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
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
      await Swal.fire({
        title: "Logueo exitoso",
        icon: "success",
        // text:,
        confirmButtonText: "Aceptar",
      }).then(() => {
        const findProf = professionals.find(
          (prof) => prof.email === form.email
        );
        history.push(`/home/${findProf.id}`);
      });
      console.log(user);
      // Aquí puedes hacer cualquier cosa que necesites después de que el usuario haya iniciado sesión, como redireccionar a otra página o mostrar un mensaje de bienvenida
    } catch (error) {
      console.error(error);
      // Aquí puedes manejar el error de inicio de sesión, como mostrar un mensaje de error al usuario
    }
  };

  const handleSignInWithGoogle = async () => {
    const googleProvider = new GoogleAuthProvider();

    const signInWithGoogle = async (googleProvider) => {
      try {
        const res = await signInWithPopup(auth, googleProvider).then(() => {
          history.push(`/`);
        });
      } catch (error) {
        console.log(error);
      }
    };
    await signInWithGoogle(googleProvider);
  };

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
          <button className={styles.googlebtn} onClick={handleSignInWithGoogle}>
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
};

export default LoginFirebase;
