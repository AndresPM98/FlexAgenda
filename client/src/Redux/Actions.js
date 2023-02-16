import axios from "axios";
export const GET_CLIENTS = "GET_CLIENTS";
export const GET_CLIENT_BY_NAME = "GET_CLIENT_BY_NAME";
export const FILTER_BY_CLIENT = "FILTER_BY_CLIENT";

export const getClients = () => {
    return async function (dispatch) {
      const bdInfo = await axios.get('/client'); 
      const clients = bdInfo.data
      dispatch({ type: GET_CLIENTS, payload: clients })
    };
  };

export const getClientByName = (name)=> {
    return async function(dispatch){
     const res = await axios.get('/client?name=' + name);
     dispatch({
     type: GET_CLIENT_BY_NAME,
     payload: res.data
      });
    }
  };



/* ------------------------------------------------------------- */

export const GET_TURNS = "GET_TURNS";
export const FILTER_BY_HOUR = "FILTER_BY_HOUR";
export const FILTER_BY_DATE = "FILTER_BY_DATE";
export const GET_TURN_BY_NAME = "GET_TURN_BY_NAME";


export const getTurns = () => {
    return async function (dispatch) {
      const bdInfo = await axios.get('/turn'); 
      const turns = bdInfo.data
      dispatch({ type: GET_TURNS, payload: turns })
    };
  };

export const filterByClient = (payload) => {
    return {
      type: FILTER_BY_CLIENT,
      payload,
    };
  };
  
export const getTurnByName = (name) => {
  return { type: GET_TURN_BY_NAME, payload: name };
} 

  export const filterByDate = (payload) => {
    return {
      type: FILTER_BY_DATE,
      payload,
    };
  };

  export const filterByHour = (payload) => {
    return {
      type: FILTER_BY_HOUR,
      payload,
    };
  };