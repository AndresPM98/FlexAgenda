import React from "react";
import "./LandingPage.css";
import Navbar from "../../Components/Navbar/Navbar";
import { NavLink } from "react-router-dom";
/* import calendar from "../../Imagenes y logos/Calendar.png";
import illustration from "../../Imagenes y logos/people.png"; */
import { Icon } from '@iconify/react';

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
            En FlexAgenda, ofrecemos una herramienta práctica e intuitiva que te permitirá organizar tu agenda de una manera sencilla y cómoda. Ya no tendrás que preocuparte por perder citas o cambiar tu horario en papel: con nuestro sistema, podrás manejar todo <strong>en línea</strong>, desde cualquier dispositivo y en cualquier momento.
            </h3>
          </div>
          <div className="vistas"/> 
      </div>
      <div className="section3">
        <div className="textConteiner3">
        <h3 className="text3">En FlexAgenda, creemos que la  <strong>gestión del tiempo </strong>es clave para el <strong>éxito</strong>  de cualquier profesional, y estamos comprometidos en ofrecer una solución <strong>accesible</strong> y eficaz para ayudarte a alcanzar tus objetivos y maximizar tu productividad.</h3>
      </div>
      <div className="iconContainer">
      <Icon icon="ic:baseline-more-time" width="150" height="150" />
      <Icon icon="material-symbols:event-available-outline" width="150" height="150" />
      <Icon icon="ic:outline-monetization-on" width="150" height="150" />
      <Icon icon="fa6-solid:computer" width="150" height="150" />
      </div>
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
