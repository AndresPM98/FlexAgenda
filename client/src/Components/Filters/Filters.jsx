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
import "./Filters.css";

const Filters = ({ lastProfessional }) => {
  const dispatch = useDispatch();

  const hasTurn = useSelector((state) => state.hasTurn);
  const profClientsTurns = useSelector((state) => state.profClientsTurns);
  const profClientsTurnsBackup = useSelector(
    (state) => state.profClientsTurnsBackup
  );

  function handleFilterByClient(event) {
    event.preventDefault();
    setClient(event.target.value);

    dispatch(filterByClient(event.target.value));
  }

  const [inputDate, setInputDate] = useState("");

  useEffect(() => {
    // console.log(hasTurn); // primer render: CUANDO CAMBIE HASTURN
    if (!hasTurn) {
      setInputDate("");
      dispatch(cleanDate());
    }
  }, [dispatch, hasTurn]);

  const [hour, setHour] = useState("Hours");
  const [client, setClient] = useState("Clients");

  function handleOnChangeDate(e) {
    e.preventDefault();
    setInputDate(e.target.value);
    dispatch(filterByDate(e.target.value));
  }

  function handleFilterByHour(event) {
    event.preventDefault();
    setHour(event.target.value);
    dispatch(filterByHour(event.target.value));
  }

  useEffect(() => {
    dispatch(getTurns());
    dispatch(getProfClientsTurns(lastProfessional));
  }, [dispatch, lastProfessional]);

  const uniqueOptions = profClientsTurnsBackup
    .sort((a, b) => (a.client.name > b.client.name ? 1 : -1))
    .filter(
      (v, i, arr) => arr.findIndex((t) => t.client.name === v.client.name) === i
    );

  const uniqueHour = profClientsTurns
    .sort((a, b) => (a.hour > b.hour ? 1 : -1))
    .filter((v, i, arr) => arr.findIndex((t) => t.hour === v.hour) === i);

  const refreshHandler = () => {
    setHour("Hours");
    setClient("Clients");
    setInputDate("");
    dispatch(cleanDate());
    dispatch(filterByClient("Clients"));
  };

  return (
    <div className="filterContainer">
      <div>
        <select
          value={client}
          onChange={(event) => handleFilterByClient(event)}
        >
          <option value="" hidden>
            {" "}
            Clients{" "}
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
          value={inputDate}
          type="date"
          onChange={handleOnChangeDate}
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
      <div className="buttonContainer">
        <button className="inputReset" onClick={refreshHandler}>
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
