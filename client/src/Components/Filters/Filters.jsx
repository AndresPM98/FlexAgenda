import React, { useEffect, useState } from "react";
import {
  getClients,
  filterByClient,
  getTurns,
  getTurnByName,
  filterByDate,
  filterByHour,
} from "../../Redux/Actions";
import { useDispatch, useSelector } from "react-redux";
import "./Filters.css";

const Filters = ({allTurns}) => {
  const [inputName, setInputName] = useState("");
  const [inputDate, setInputDate] = useState("");
  const dispatch = useDispatch();
 
  /* const allTurns = useSelector((state) => state.turnBackup); */
  

  function handleFilterByClient(event) {
    event.preventDefault();
    dispatch(filterByClient(event.target.value));
  }

  function handleOnChangeName(e) {
    setInputName(e.target.value);
  }
  function handleOnChangeDate(e) {
    setInputDate(e.target.value);
  }
  function handleOnClickDate(e) {
    e.preventDefault();
    dispatch(filterByDate(inputDate));
  }

  function handleOnClickName(e){
    e.preventDefault()
    dispatch(getTurnByName(inputName))
}

  function handleFilterByHour(event) {
    event.preventDefault();
    dispatch(filterByHour(event.target.value));
  }

  useEffect(() => {
    dispatch(getClients());
    dispatch(getTurns());
  }, [dispatch]);

  const uniqueOptions = allTurns
    .sort((a, b) => (a.client.name > b.client.name ? 1 : -1))
    .filter(
      (v, i, arr) => arr.findIndex((t) => t.client.name === v.client.name) === i
    );

  const uniqueHour = allTurns
    .sort((a, b) => (a.hour > b.hour ? 1 : -1))
    .filter((v, i, arr) => arr.findIndex((t) => t.hour === v.hour) === i);

    const handleKeyPressName = (event) => {
      if (event.key === "Enter") {
        handleOnClickName(event);
      }
    };

    const handleKeyPressDate = (event) => {
      if (event.key === "Enter") {
        handleOnClickDate(event);
      }
    };

  return (
    <div className="filterContainer">
      <div>
        <button 
        onClick={handleOnClickName} className="ButtonSearch">Search</button>
        <input 
        onKeyPress={handleKeyPressName}
        type='text'
        value={inputName} 
        onChange={handleOnChangeName} 
        placeholder='Client...' 
        className="InputSearch">

        </input>
    </div>
      <div>
        <select onChange={(event) => handleFilterByClient(event)}>
          <option value="Clients"> Clients </option>
          {uniqueOptions.map((v) => (
            <option value={v.id} key={v.id}>
              {v.client.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <button onClick={handleOnClickDate} className="ButtonSearch">
          Search
        </button>
        <input
          onKeyPress={handleKeyPressDate}
          type="text"
          value={inputDate}
          onChange={handleOnChangeDate}
          placeholder="Date..."
          className="InputSearch"
        ></input>
      </div>
      <div>
        <select onChange={(event) => handleFilterByHour(event)}>
          <option value="Hours"> Hours </option>
          {uniqueHour.map((v) => (
            <option value={v.hour} key={v.hour}>
              {v.hour}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Filters;
