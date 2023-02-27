import React, { useEffect, useState } from "react";
import styles from "./LoginFirebase.module.css";
import { useHistory } from "react-router-dom";
import Footer from "../../Components/Footer/Footer";
import NavbarTwo from "../../Components/NavbarTwo/NavbarTwo";
import { useDispatch, useSelector } from "react-redux";

import { auth, userExists } from "../../firebase-config";

import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";

import { getProfessionals } from "../../Redux/Actions";
import Swal from "sweetalert2";
import AuthProvider from "../../Components/AuthProvider/AuthProvider";

const LoginFirebase = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.darkMode);
  const professionals = useSelector((state) => state.allProfessionals);

  const [state, setCurrentState] = useState(null);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    dispatch(getProfessionals());
  }, [dispatch]);

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
    // redirigir a home
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
    setCurrentState(1);
  };
  const handleUserNotRegistered = () => {};

  if (state === 1) {
  return (
    <>
    </>
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
          <button className={styles.googlebtn} onClick={handleSignInWithGoogle}>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
              alt="Google logo"
            />
            Sign in with Google
          </button>
        </form>
      </div>
   
    </div>
  );
}

export default LoginFirebase;
