import React from "react";
import s from "./PaymentApproved.module.css"
import NavbarTwo from "../../Components/NavbarTwo/NavbarTwo";
import { NavLink } from "react-router-dom";
import { useParams, useHistory } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Cookies from 'universal-cookie';
import axios from "axios";


const PaymentApproved = () => {

    const params = useParams()
    const search = window.location.search;
    const cookies = new Cookies();
    const send = cookies.get('turnToPost');
    const dispatch = useDispatch();


    const deleteParams = () => {
        if (search) {
            window.location=window.location.origin + window.location.pathname
        }
    }

    const postHandler = () => {
        axios
          .post("https://backend-pf-production-1672.up.railway.app/turn", send)
          .then((res) => {
            alert("Turn taken correctly");
          })
          .catch((err) => alert("Algo salio mal"));
      };

    useEffect(() => {
        {postHandler()}
    },[])

    return(
        <div>
            <NavbarTwo/>
            {deleteParams()}
            <div className={s.pageContainer}>
                <div className={s.succesContainer}>
                    <div className={s.textCont}>
                        <h2 className={s.text}>Pago realizado correctamente</h2>
                        <iconify-icon icon="clarity:success-standard-solid" width="30" height="30"></iconify-icon>
                    </div>
                    <h3>Tu turno ya está registrado</h3>
                </div>
                <NavLink className={s.link} to="/form"> Tomar otro turno</NavLink>
            </div>
        </div>
    )
}

export default PaymentApproved; 