import React from "react";
import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { auth, userExists } from "../../firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import styles from "./AuthProvider.module.css";

const AuthProvider = ({
  children,
  onUserLoggedIn,
  onUserNotLoggedIn,
  onUserNotRegistered,
  id,
}) => {
  // posibilidades
  // 1: el usuario no esta logueado ni registrado
  // 3: el usuario esta logueado y esta registrado
  // 4: el usuario esta registrado pero no logueado (esto ya deberia estar)

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      // el usuario se registro
      console.log(user);
      if (user) {
        //
        const register = await userExists(user.uid);
        // usuario logueado y registrado
        if (register) {
          // const prof = await axios.get("/professional");

          console.log("usuario registrado y logueado");
          onUserLoggedIn(id);
        } else {
          console.log("el usuario esta logueado pero no registrado");
          onUserNotRegistered(id);
        }
      } else {
        console.log("el usuraio no esta logueado y no esta registrado");
        onUserNotLoggedIn();
      }
    });
  }, [id, onUserLoggedIn, onUserNotLoggedIn, onUserNotRegistered]);
  return <div className={styles.container}>{children}</div>;
};

export default AuthProvider;
