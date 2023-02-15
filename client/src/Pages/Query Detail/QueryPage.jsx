import React from "react";
import NavbarTwo from '../../Components/NavbarTwo/NavbarTwo';
import Footer from "../../Components/Footer/Footer";
import './QueryPage.css';
import { NavLink } from "react-router-dom";

const queryPage = () => {



    return(
        <div>
            <NavbarTwo/>
            <div className="queryPage">
                <div className="backContainer">
                    <NavLink className='back' to='/home'><iconify-icon icon="ion:arrow-back-circle" width="40" height="30"></iconify-icon>BACK</NavLink>
                </div>
                <div className="queryDetailContainer">
                    <h1>Query Details</h1>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default queryPage;