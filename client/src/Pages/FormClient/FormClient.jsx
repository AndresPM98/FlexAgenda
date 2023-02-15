import React from "react";
import NavbarTwo from "../../Components/NavbarTwo/NavbarTwo";
import Footer from "../../Components/Footer/Footer";
import "./FormClient.css";
import { NavLink } from "react-router-dom";

const FormClient = () => {
  return (
    <div>
      <NavbarTwo />
      <div className="formClientPage">
        <div className="backContainer">
          <NavLink className="back" to="/home">
            <iconify-icon
              icon="ion:arrow-back-circle"
              width="40"
              height="30"
            ></iconify-icon>
            BACK
          </NavLink>
        </div>

        <form>
          <div className="container">
            <div className="card">
              <a className="signup">Formulario del cliente</a>
              <div className="inputBox">
                <input type="text" required />
                <span>NOMBRE</span>
              </div>
              <div className="inputBox1">
                <input type="text" required />
                <span className="user">Email</span>
              </div>
              <div className="inputBox">
                <input type="text" required />
                <span>DNI</span>
              </div>
              <button className="enter">REGISTRARSE</button>
            </div>
          </div>
        </form>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default FormClient;
