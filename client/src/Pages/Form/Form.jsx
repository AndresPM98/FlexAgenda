import React from "react";
import NavbarTwo from "../../Components/NavbarTwo/NavbarTwo";

import "./Form.css";
import { NavLink } from "react-router-dom";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { getClients, getServices } from "../../Redux/Actions";

const Form = () => {
  const dispatch = useDispatch();
  const [error, setError] = useState({});

  useEffect(() => {
    dispatch(getClients());
    dispatch(getServices());
  }, []);


  const serv = useSelector((state)=> state.allServices)


  const [form, setForm] = useState({
    date: "",
    hour: "",
    ProfessionalId: "87de3b43-6331-4493-adfa-c73a4b0afaff",
    ClientId: "2f77e3c6-5b83-4eba-9483-60d775cee7ea",
    ServiceId: "",
  });


 

  function validate(form) {
    let error = {};

    if (!form.date) {
      error.date = "Date is required";
    }

    if (!form.hour) {
      error.hour = "Hour is required";
    }

    if (!form.ServiceId[0]) {
      error.ServiceId = "Service is required";
    }
    return error;
  }

  const changeHandler = (event) => {
    const property = event.target.name;
    const value = event.target.value;

    setForm({ ...form, [property]: value });
    validate({ ...form, [property]: value });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    axios
      .post("https://backend-pf-production-1672.up.railway.app/turn", form)
      .then((res) => alert("Turn taken correctly"))
      .catch((err) => alert(err));
  };

  function handleSelectServ(event) {
    if (
      event.target.value !== "ServiceId" &&
      !form.ServiceId.includes(event.target.value)
    )
      setForm({
        ...form,
        ServiceId: [...form.ServiceId, event.target.value],
      });
    setError(
      validate({
        ...form,
        ServiceId: [...form.ServiceId, event.target.value],
      })
    );
  }

    return(
        <div>
            <NavbarTwo/>
            <div className='formTurnPage'>
                <div className="backContainer">
                    <NavLink className='back' to='/home'><iconify-icon icon="ion:arrow-back-circle" width="40" height="30"></iconify-icon>BACK</NavLink>
                </div>
                    

        <div className="containerForm">
          <div className="cardForm">
            <h1 className="signupForm">Schedule your turn</h1>

            <form onSubmit={submitHandler}>
              <div className="inputBox">
                <input
                  className="input"
                  type="date"
                  value={form.date}
                  onChange={changeHandler}
                  name="date"
                />
                <span>DATE</span>
              </div>
              <div className="error">
                {error.date && <span>{error.date}</span>}{" "}
              </div>

              <div className="inputBox">
                <input
                  className="input"
                  type="time"
                  value={form.hour}
                  onChange={changeHandler}
                  name="hour"
                />
                <span>HOUR</span>
              </div>
              <div className="error">
                {error.hour && <span>{error.hour}</span>}{" "}
              </div>

              <div className="inputBox">
                <input
                  className="input"
                  type="text"
                  value={form.ProfessionalId}
                  readOnly
                  onChange={changeHandler}
                  name="ProfessionalId"
                />
                <span>PROFESSIONAL</span>
              </div>

              <select
                name="ServiceId"
                onChange={handleSelectServ}
                className="desplegable"
              >
                <option value="ServiceId">Service</option>
                {serv?.map((element, index) => (
                  <option key={index}>{element}</option>
                ))}
                <div className="error">
                  {error.ServiceId && <span>{error.ServiceId}</span>}{" "}
                </div>
              </select>

              <div className="inputBox">
                <input
                  className="input"
                  type="text"
                  value={form.ClientId}
                  readOnly
                  name="ClientId"
                  onChange={changeHandler}
                />
                <span>CLIENT</span>
              </div>
              {error.ClientId && (
                <span className="error">{error.ClientId}</span>
              )}

              <button className="enterForm" type="submit">
                TAKE TURN
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
