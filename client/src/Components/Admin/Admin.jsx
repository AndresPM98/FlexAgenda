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
      <Link to={`/allProfessionalsDashboardAdmin/879e90bf-403b-4dfe-b46a-79a9ddc34d26`}>
        <button className={style.adminbutton}>Profesionales</button>
      </Link>
      <Link to={`/allClientsDashboardAdmin/879e90bf-403b-4dfe-b46a-79a9ddc34d26`}>
        <button className={style.adminbutton}>Clientes</button>
      </Link>
     
     
       <h3 style={{display:"flex", justifyContent:"center", alignItems:"center", marginTop:"200px",color: "red"}}>Bienvenido a la pagina del administrador. Aqui podras controlar a los profesionales, los clientes y a los turnos </h3>
     

    </div>
  );
}
