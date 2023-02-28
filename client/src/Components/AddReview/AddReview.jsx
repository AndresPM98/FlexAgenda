import s from './AddReview.module.css';
import { useState } from 'react';
import axios from 'axios';

const AddReview = (props) => {

    const [state, setState] = useState({
        idProf: props.idProf,
        score: '',
        text: ''
    });

    const starsHandler = (event) => {
        setState({...state, score: event.target.value})
    }

    const textHandler = (event) => {
        setState({...state, text: event.target.value})
    }


    const submitHandler = (event) => {
        console.log(state);       
        event.preventDefault();
        axios
        .post("https://backend-pf-production-1672.up.railway.app/review", state)
        .then((res) => {alert("Opinion agregada con exito")})
        .catch((err) => console.log(err.message));
    }

    return(
        <div className={s.formContainer}>
            {console.log(state)}
            <form onSubmit={submitHandler} className={s.form}>
                <label className={s.textInput} for="name">Agrega tu opinion sobre el profesional</label>
                <p onChange={starsHandler} className={s.stars}>
                    <input id="radio1" type="radio" name="estrellas" value="5"/>
                    <label for="radio1">★</label>
                    <input id="radio2" type="radio" name="estrellas" value="4"/>
                    <label for="radio2">★</label>
                    <input id="radio3" type="radio" name="estrellas" value="3"/>
                    <label for="radio3">★</label>
                    <input id="radio4" type="radio" name="estrellas" value="2"/>
                    <label for="radio4">★</label>
                    <input id="radio5" type="radio" name="estrellas" value="1"/>
                    <label for="radio5">★</label>
                </p>
                <textarea onChange={textHandler} className={s.input} placeholder='Agrega una descripcion del profesional...'  id="name" name="name"  minlength="4" ></textarea>
                <button type='submit' className={s.btn}>Enviar</button>
             </form>
        </div>
    )
};

export default AddReview