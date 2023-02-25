import React, { useEffect, useState } from "react";
import {
  filterByClient,
  getTurns,
  filterByDate,
  filterByHour,
  getProfClientsTurns,
  cleanDate,
} from "../../Redux/Actions";
import { useDispatch, useSelector } from "react-redux";
import style from "./Filters.module.css";
import { Link } from "react-router-dom";
import { id } from "date-fns/locale";

const Filters = ({ lastProfessional }) => {
  const dispatch = useDispatch();
  const profClientsTurns = useSelector((state) => state.profClientsTurns);
  const profClientsTurnsBackup = useSelector(
    (state) => state.profClientsTurnsBackup
  );
  const fecha = useSelector((state) => state.setCurrentDate);
  const fecha2 = fecha.toISOString().split('T')[0]; 
  const [selectedDate, setSelectedDate] = useState(fecha2);

  const [hour, setHour] = useState("Hours");
  const [client, setClient] = useState("Clients");

  // HANDLERS - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  // FILTRAR POR CLIENTE
  function handleFilterByClient(event) {
    event.preventDefault();
    setClient(event.target.value);

    dispatch(filterByClient(event.target.value));
  }
  // FILTRAR POR FECHA
  function handleOnChangeDate(e) {
    e.preventDefault();
    dispatch(filterByDate(e.target.value));
    setSelectedDate(e.target.value)
  }
  // FILTRAR POR HORA
  function handleFilterByHour(event) {
    event.preventDefault();
    setHour(event.target.value);
    dispatch(filterByHour(event.target.value));
  }
  // RESETEAR FILTROS
  const refreshHandler = () => {
    setHour("Hours");
    setClient("Clients");
    dispatch(cleanDate());
    setSelectedDate("Dale");
    dispatch(getProfClientsTurns(lastProfessional));
  };
  // MOSTRAR HORARIOS ACTUALES
  const uniqueOptions = profClientsTurnsBackup
    .sort((a, b) => (a.client.name > b.client.name ? 1 : -1))
    .filter(
      (v, i, arr) => arr.findIndex((t) => t.client.name === v.client.name) === i
    );
  const uniqueHour = profClientsTurns
    .sort((a, b) => (a.hour > b.hour ? 1 : -1))
    .filter((v, i, arr) => arr.findIndex((t) => t.hour === v.hour) === i);

  // DISTRIBUIR
  function handleSelectChange(event) {
    const { name, value } = event.target;

    if (name === "client") {
      if (value === "Clients") {
        // El usuario ha seleccionado el valor por defecto del select de nombres
        // Realiza la acción necesaria para mostrar todos los turnos

        dispatch(getProfClientsTurns(lastProfessional));
      } else {
        // El usuario ha seleccionado un nombre específico
        // Realiza la acción necesaria para filtrar los turnos por ese nombre
        handleFilterByClient(event);
      }
    } else if (name === "date") {
      if (value === "Date") {
        // El usuario ha seleccionado el valor por defecto del select de fechas
        // Realiza la acción necesaria para mostrar todos los turnos
        dispatch(getProfClientsTurns(lastProfessional));
      } else {
        // El usuario ha seleccionado una fecha específica
        // Realiza la acción necesaria para filtrar los turnos por esa fecha
        handleOnChangeDate(event);
      }
    }
  }

  // RENDERIZACION - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  // useEffect(() => {
  //   if (!hasTurn) {
  //     setInputDate("");
  //     dispatch(cleanDate());
  //   }
  // }, [input]);

  useEffect(() => {
    dispatch(getTurns());
    dispatch(getProfClientsTurns(lastProfessional));
  }, [dispatch, lastProfessional]);

  useEffect(() => {
    dispatch(filterByDate(fecha2));
  }, [fecha2]);


// console.log(lastProfessional);


  return (
    <div className={style.filterContainer}>
      <Link to={`/turnCanceled/${lastProfessional}`}>
      
      <button className={style.turnosCancelados} >Turnos cancelados</button>
      </Link>
      <div>
        <select
          value={client}
          onChange={(e) => handleSelectChange(e)}
          name="client"
        >
          <option value="" hidden>
            Clients
          </option>
          {uniqueOptions.map((v) => (
            <option value={v.name} key={v.id}>
              {v.client.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <input
          className="input"
          defaultValue={selectedDate}
          value={selectedDate}
          type="date"
          onChange={(e)=>handleOnChangeDate(e)}
          name="date"
        />
      </div>
      <div>
        <select value={hour} onChange={(event) => handleFilterByHour(event)}>
          <option value="" hidden>
            {" "}
            Hours{" "}
          </option>
          {uniqueHour.map((v) => (
            <option value={v.hour} key={v.hour}>
              {v.hour}
            </option>
          ))}
        </select>
      </div>
      <div className={style.buttonContainer}>
        <button className={style.inputReset} onClick={refreshHandler}>
          <iconify-icon
            icon="material-symbols:refresh"
            width="20"
          ></iconify-icon>
        </button>
      </div>
    </div>
  );
};

export default Filters;
