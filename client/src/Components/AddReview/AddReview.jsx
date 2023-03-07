import s from "./AddReview.module.css";
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
const AddReview = (props) => {
  const [display, setDisplay] = useState(true);

  const [state, setState] = useState({
    idProf: props.idProf,
    score: "",
    text: "",
  });

  const [formSumbited, setFormSubmitted] = useState(false);

  const starsHandler = (event) => {
    setState({ ...state, score: event.target.value });
  };

  const textHandler = (event) => {
    setState({ ...state, text: event.target.value });
  };

  const submitHandler = async (event) => {
    setDisplay(false);
    event.preventDefault();
    try {
      await axios.post(
        "https://backend-pf-production-1672.up.railway.app/review",
        state
      );
      await Swal.fire({
        title: "Opinion enviada",
        icon: "success",
        text: "Calificaste al profesional con éxito.",
        confirmButtonText: "Aceptar",
      });
      setFormSubmitted(true);
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className={s.formContainer}>
      {!formSumbited ? (
        <form onSubmit={submitHandler} className={s.form}>
          <label className={s.textInput} for="name">
            Agrega tu opinion sobre el profesional
          </label>
          <p onChange={starsHandler} className={s.stars}>
            <input id="radio1" type="radio" name="estrellas" value="5" />
            <label for="radio1">★</label>
            <input id="radio2" type="radio" name="estrellas" value="4" />
            <label for="radio2">★</label>
            <input id="radio3" type="radio" name="estrellas" value="3" />
            <label for="radio3">★</label>
            <input id="radio4" type="radio" name="estrellas" value="2" />
            <label for="radio4">★</label>
            <input id="radio5" type="radio" name="estrellas" value="1" />
            <label for="radio5">★</label>
          </p>
          <textarea
            onChange={textHandler}
            className={s.input}
            placeholder="Agrega una descripcion del profesional..."
            id="name"
            name="name"
            minlength="4"
          ></textarea>
          <button type="submit" className={s.btn}>
            Enviar
          </button>
        </form>
      ) : (
        <h1 style={{ backgroundColor: "transparent", width: "100%", height: "50px" }}>
          ¡Gracias por enviar tu opinión!
        </h1>
      )}
    </div>
  );
};

export default AddReview;
