import React from "react";
import "./LandingPage.css";
import Navbar from "../../Components/Navbar/Navbar";
import { NavLink } from "react-router-dom";
import calendar from "../../Imagenes y logos/Calendar.png";
import illustration from "../../Imagenes y logos/people.png";

const landingPage = () => {
  return (
    <div>
      <Navbar />
      <div className="landContainer">
        <div className="textContainer">
          <div className="text">
            <h2 className="textTitle">
              Create your online agenda and grow your business
            </h2>
            <h3 className="textPa">
              Manage your appointments, clients and payments from the app
            </h3>
          </div>
          <NavLink className="start" to="/SignUp">
            START NOW
          </NavLink>
        </div>
        <div className="imagesContainer">
          <div className="images">
            <img className="image1" src={calendar} alt="calendar" />
            <img className="image2" src={illustration} alt="calendar" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default landingPage;
