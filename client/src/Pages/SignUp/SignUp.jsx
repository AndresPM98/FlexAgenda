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
      alert("Creado correctamente");

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
      console.log("User registered successfully!");
      history.push(`/home/${prof.data.id}`);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <>
      <div>
        <form onSubmit={handleRegister}>
          <h1>Create Account</h1>

          <label>Name:</label>
          <input
            onChange={(e) => handleChange(e)}
            type="text"
            name="name"
            value={form.name}
          />

          <br />

          <label>Email:</label>
          <input
            onChange={(e) => handleChange(e)}
            type="text"
            name="email"
            value={form.email}
          />

          <label>Password:</label>
          <input
            type="password"
            onChange={(e) => handleChange(e)}
            name="password"
            value={form.password}
          />

          <label>Phone:</label>
          <input
            type="text"
            onChange={(e) => handleChange(e)}
            name="phone"
            value={form.phone}
            placeholder="Ej: 3511234567"
          />

          <label>Adress:</label>
          <input type="text" onChange={(e) => handleChange(e)} name="address" />

          <label>Description:</label>
          <input
            type="text"
            onChange={(e) => handleChange(e)}
            name="description"
            value={form.description}
          />

          <label>Category:</label>
          <input
            type="text"
            onChange={(e) => handleChange(e)}
            name="category"
            value={form.category}
          />

          <button type="submit">Register</button>
        </form>
        <div>
          <button onClick={handleSignInWithGoogle}>Sign in with Google</button>
        </div>
      </div>
      <br />
      <br />
      <br />
    </>
  );
}

export default SignUp;
