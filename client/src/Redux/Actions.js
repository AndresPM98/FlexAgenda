import axios from "axios";
export const GET_CLIENTS = "GET_CLIENTS";
export const GET_CLIENT_BY_NAME = "GET_CLIENT_BY_NAME";

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