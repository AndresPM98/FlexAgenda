import React from "react";
import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Footer from "../../Components/Footer/Footer";
import NavbarTwo from "../../Components/NavbarTwo/NavbarTwo";
import { useDispatch, useSelector } from "react-redux";

import { auth, userExists } from "../../firebase-config";

import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { getProfessionals } from "../../Redux/Actions";
import Swal from "sweetalert2";

const AuthProvider = ({
  children,
  onUserLoggedIn,
  onUserNotLoggedIn,
  onUserNotRegistered,
}) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const professionals = useSelector((state) => state.allProfessionals);
  // posibilidades
  // 1: el usuario no esta logueado ni registrado
  // 3: el usuario esta logueado y esta registrado
  // 4: el usuario esta registrado pero no logueado (esto ya deberia estar)
  useEffect(() => {
    dispatch(getProfessionals());
  }, []);

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      // el usuario se registro
      if (user) {
        //
        const register = await userExists(user.uid);
        console.log("estoy aca culiao", register);
        const prof = await axios.get("/professional");
        console.log("ando x aca", prof);
        const findProf = prof.data.find(
          (prof) => prof.email === register.email
        );
        console.log(findProf);
        if (register) {
          console.log("usuario registrado y logueado");
          onUserLoggedIn(findProf.id);
        } else {
          console.log("el usuario esta logueado pero no registrado");
          onUserNotRegistered();
          //   history.push("/SignUp");
        }
      } else {
        console.log("el usuraio no esta logueado y no esta registrado");
        onUserNotLoggedIn();
        // console.log("no hay nadie autenticado");
      }
    });
  }, [
    dispatch,
    onUserLoggedIn,
    onUserNotLoggedIn,
    onUserNotRegistered,
    professionals,
  ]);
  return <div>{children}</div>;
};

export default AuthProvider;
