import React from "react";
import s from "./PaymentApproved.module.css"
import NavbarTwo from "../../Components/NavbarTwo/NavbarTwo";
import { NavLink, useHistory } from "react-router-dom";
import { useParams, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Cookies from 'universal-cookie';
import axios from "axios";


const PaymentApproved = () => {

    const search = window.location.search;
    const cookies = new Cookies();
    const send = cookies.get('turnToPost');
    const id = cookies.get('idProfessional')

    const history = useHistory();

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

    const handleNavLinkClick = () => {
        history.push(`/profTT/${id}`);
    }

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
                <botton className={s.link} to="#" onClick={handleNavLinkClick}>Tomar otro turno</botton> 
            </div>
        </div>
    )
}

export default PaymentApproved;
