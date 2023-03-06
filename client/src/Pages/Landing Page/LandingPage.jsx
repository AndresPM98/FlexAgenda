import React from "react";
import "./LandingPage.css";
import Navbar from "../../Components/Navbar/Navbar";
import { NavLink } from "react-router-dom";
/* import calendar from "../../Imagenes y logos/Calendar.png";
import illustration from "../../Imagenes y logos/people.png"; */

const landingPage = () => {
  return (
    <div>
      <Navbar />
      <div className="landContainer">
        <div className="textContainer">
          <div className="text">
            <h2 className="textTitle">
              ¡Bienvenido a <span class="cursiva">Flex</span>Agenda!
            </h2>
            <h3 className="textPa">
            La plataforma virtual de gestión de turnos y organización de agendas que te ayudará a optimizar tu tiempo y aumentar tu productividad.
            </h3>
          </div>
          <NavLink className="start" to="/SignUp">
            START NOW
          </NavLink>
        </div>
        
      </div>
        <div className="section2">
        <div className="textConteiner2">
            <h3 className="text2">
            En FlexAgenda, ofrecemos una herramienta práctica e intuitiva que te permitirá organizar tu agenda de una manera sencilla y cómoda. Ya no tendrás que preocuparte por perder citas o cambiar tu horario en papel: con nuestro sistema, podrás manejar todo en línea, desde cualquier dispositivo y en cualquier momento.
            </h3>
          </div>
          <div className="vistas"/> 
      </div>
      <div className="section3">
        ...
      </div>
      <div className="section4">
        ...
      </div>
      <div className="section5">
        ...
      </div>
      <div className="section6">
        ...
      </div>
    </div>
  );
};

export default landingPage;
