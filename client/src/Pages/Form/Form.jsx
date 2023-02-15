import React from "react";
import NavbarTwo from '../../Components/NavbarTwo/NavbarTwo';
import Footer from "../../Components/Footer/Footer";
import './Form.css';
import { NavLink } from "react-router-dom";

const Form = () => {
    return(
        <div>
            <NavbarTwo/>
            <div className="formPage">
                <div className="backContainer">
                    <NavLink className='back' to='/home'><iconify-icon icon="ion:arrow-back-circle" width="40" height="30"></iconify-icon>BACK</NavLink>
                </div>
                <div className="formContainer">
                    <h1>Formulario de la consulta</h1>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default Form; 