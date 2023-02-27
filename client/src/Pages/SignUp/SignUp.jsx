import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
} from "firebase/auth";
import { useEffect, useState } from "react";
import { auth, db } from "../../firebase-config";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
  query,
  where,
  setDoc,
  deleteDoc,
} from "firebase/firestore";
import axios from "axios";
import { useHistory } from "react-router-dom";
import NavbarTwo from "../../Components/NavbarTwo/NavbarTwo";
import styles from "./Singup.module.css";
import Swal from "sweetalert2";

function SignUp() {
  const history = useHistory();
  const [form, setForm] = useState({
    firebaseId: "",
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    description: "",
    category: "",
  });

  useEffect(() => {
    onAuthStateChanged(auth, handleUserStateChanged);
  }, []);

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };
  const handleUserStateChanged = (user) => {
    user
      ? console.log(user.displayName)
      : console.log("No hay nadie autenticado...");
  };

  const handleSignInWithGoogle = async () => {
    const googleProvider = new GoogleAuthProvider();

    const signInWithGoogle = async (googleProvider) => {
      try {
        const res = await signInWithPopup(auth, googleProvider);
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    };
    await signInWithGoogle(googleProvider);
  };

  const handleRegister = async (event) => {
    event.preventDefault();

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );
      const user = userCredential.user;
      const uid = user.uid;
      setForm({ ...form, firebaseId: uid });
      console.log(uid);
      console.log(form);
      const prof = await axios.post("/professional", {
        ...form,
        firebaseId: uid,
      });

      await setDoc(doc(db, "professionals", uid), {
        name: form.name,
        email: form.email,
        password: form.password,
        phone: form.phone,
        address: form.address,
        description: form.description,
        category: form.category,
      });
      console.log(prof.data.id);
      await Swal.fire({
        title: "Registro exitoso",
        icon: "success",
        text: "El usuario ha sido registrado correctamente.",
        confirmButtonText: "Aceptar",
      }).then(() => {
        history.push(`/Calendarpage/${prof.data.id}`);
      });
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <>
      <NavbarTwo />
      <div className={styles.container}>
        <form onSubmit={handleRegister} className={styles.form}>
          <h1 className={styles.tittle}>CREACION DE CUENTA</h1>

          <label className={styles.label}>NOMBRE:</label>
          <br />
          <input
            className={styles.input}
            onChange={(e) => handleChange(e)}
            type="text"
            name="name"
            value={form.name}
          />

          <br />

          <label className={styles.label}>EMAIL:</label>
          <br />
          <input
            className={styles.input}
            onChange={(e) => handleChange(e)}
            type="text"
            name="email"
            value={form.email}
          />

          <label className={styles.label}>CONTRASEÑA:</label>
          <br />
          <input
            className={styles.input}
            type="password"
            onChange={(e) => handleChange(e)}
            name="password"
            value={form.password}
          />

          <label className={styles.label}>CONTACTO:</label>
          <br />
          <input
            className={styles.input}
            type="text"
            onChange={(e) => handleChange(e)}
            name="phone"
            value={form.phone}
            placeholder="Ej: 3511234567"
          />

          <label className={styles.label}>DIRECCIÓN:</label>
          <br />
          <input
            className={styles.input}
            type="text"
            onChange={(e) => handleChange(e)}
            name="address"
          />

          <label className={styles.label}>DESCRIPCION/PROFESION:</label>
          <br />
          <input
            className={styles.input}
            type="text"
            onChange={(e) => handleChange(e)}
            name="description"
            value={form.description}
          />

          <label className={styles.label}>ÁREA:</label>
          <br />
          <input
            className={styles.input}
            type="text"
            onChange={(e) => handleChange(e)}
            name="category"
            value={form.category}
          />

          <button className={styles.button} type="submit">
            REGISTRARSE
          </button>
          <h2>O</h2>
          <button className={styles.googlebtn} onClick={handleSignInWithGoogle}>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
              alt="Google logo"
            />
            Sign in with Google
          </button>
        </form>
      </div>
      <br />
      <br />
      <br />
    </>
  );
}

export default SignUp;
