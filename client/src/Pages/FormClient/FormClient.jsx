import React from "react";
import NavbarTwo from '../../Components/NavbarTwo/NavbarTwo';
import Footer from "../../Components/Footer/Footer";
import './FormClient.css';
import { NavLink } from "react-router-dom";

const FormClient = () => {
    return(
        <div>
            <NavbarTwo/>
            <div className="formClientPage">
                <div className="backContainer">
                    <NavLink className='back' to='/home'><iconify-icon icon="ion:arrow-back-circle" width="40" height="30"></iconify-icon>BACK</NavLink>
                </div>
                <div className="formClientContainer">
                    <h1>Formulario del cliente</h1>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default FormClient; 