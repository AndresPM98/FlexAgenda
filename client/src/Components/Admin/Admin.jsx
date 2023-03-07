import React from "react";
import { getProfessionals } from "../../Redux/Actions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import style from "./Admin.module.css";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase-config";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";

import { useState } from "react";


export default function Admin() {
  const [currentUser, setCurrentUser] = useState(null);
  const history = useHistory();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      
      setCurrentUser(null)
      await Swal.fire({
        icon: "success",
        title: "Sesion cerrada",
        showConfirmButton: false,
        timer: 1500,
      });
      history.push("/")
    } catch (error) {
      // Manejar el error
      console.error(error);
    }
  };

  return (
    <div className={style.adminpage}>
      <h1 style={{ margin: "40px" }}>Dashboard admin</h1>

      <Link
        to={`/allProfessionalsDashboardAdmin/36d12c77-50ae-4f7c-914b-21a53f82eaab`}
      >
        <button className={style.adminbutton}>Profesionales</button>
      </Link>
      <Link
        to={`/allClientsDashboardAdmin/36d12c77-50ae-4f7c-914b-21a53f82eaab`}
      >
        <button className={style.adminbutton}>Clientes</button>
      </Link>
      <Link
        to={`/allReviewsDashboardAdmin/36d12c77-50ae-4f7c-914b-21a53f82eaab`}
      >
        <button className={style.adminbutton}>Reviews</button>
      </Link>

      <h2
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "50px",
          color: "black",
          backgroundColor: "#999a9dc3",
          borderRadius: "10px",
          padding: "30px",
          maxWidth: "800px",
          margin: "5% auto",
          boxShadow: "0px 3px 10px rgba(0, 0, 0, 0.2)",
        }}
      >
        ¡Bienvenido al panel de administración de Flex Agenda! Aquí tendrás
        acceso a una gran cantidad de herramientas que te permitirán controlar y
        gestionar de manera eficiente a los profesionales y clientes que forman
        parte de la plataforma. Con este panel, podrás supervisar y administrar
        las cuentas de todos los profesionales que ofrecen sus servicios en
        nuestra plataforma, así como también la información de sus respectivos
        clientes. Además, tendrás acceso a las revisiones y calificaciones que
        los usuarios han realizado de los servicios brindados. Este panel te
        proporcionará una visión completa de toda la actividad en la plataforma,
        lo que te permitirá tomar decisiones informadas para mejorar la calidad
        de los servicios que se ofrecen y garantizar la satisfacción de los
        usuarios. Nuestro objetivo es brindarte todas las herramientas que
        necesitas para asegurarte de que los usuarios disfruten de una
        experiencia única en nuestra plataforma y confíen en nosotros para
        encontrar los servicios que necesitan. ¡Gracias por ser parte de nuestro
        equipo de administradores y estamos seguros de que este panel te será de
        gran ayuda en tu tarea de mantener la calidad y la excelencia de
        nuestros servicios!{" "}
      </h2>
      <div style={{ position: "absolute", top: 0, left: 30 }}>
        <Link to={`/`} onClick={handleLogout}>
          <img
            style={{ width: "50px", height: "50px", marginTop: "10px" }}
            src="https://cdn-icons-png.flaticon.com/512/6437/6437583.png"
            alt=""
          />
        </Link>
      </div>
    </div>
  );
}
