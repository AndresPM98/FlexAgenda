import React from "react";
import { getProfessionals } from "../../Redux/Actions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import style from "./Admin.module.css";
import { useParams } from "react-router-dom";

export default function Admin() {

  return (
    <div className={style.adminpage}>
      <h1>Dashboard admin</h1>
      <Link to={`/allProfessionalsDashboardAdmin/16aa4db8-b8cf-43bf-989a-5c7945212080`}>
        <button className={style.adminbutton}>Profesionales</button>
      </Link>
      <Link to={`/allClientsDashboardAdmin/16aa4db8-b8cf-43bf-989a-5c7945212080`}>
        <button className={style.adminbutton}>Clientes</button>
      </Link>
      <Link to={`/allReviewsDashboardAdmin/16aa4db8-b8cf-43bf-989a-5c7945212080`}>
        <button className={style.adminbutton}>Reviews</button>
      </Link>
     
       <h3 style={{display:"flex", justifyContent:"center", alignItems:"center", marginTop:"200px",color: "red"}}>Bienvenido a la pagina del administrador. Aqui podras controlar a los profesionales, los clientes y a los turnos </h3>
     <Link to="/">
     
     <button className={style.btnexit}> 
        <img style={{height:"200px"}} src="https://i.pinimg.com/564x/d2/ee/61/d2ee6167cbd52a5dff092b9f42429ef2.jpg" alt="" />
     <h1>Home</h1>
     </button>
     </Link>

    </div>
  );
}
