import axios from "axios";
export const GET_CLIENTS = "GET_CLIENTS";
export const GET_PROFESSIONALS = "GET_PROFESSIONALS";
export const GET_CLIENT_BY_NAME = "GET_CLIENT_BY_NAME";
export const FILTER_BY_CLIENT = "FILTER_BY_CLIENT";
export const GET_TURN_DETAIL = "GET_TURN_DETAIL";
export const GET_CLIENT_DETAIL_TURN = "GET_CLIENT_DETAIL_TURN";
export const CLEAN_DETAIL_TURN = "CLEAN_DETAIL_TURN";
export const CHANGE_THEME = "CHANGE_THEME";
export const DELETE = "DELETE";

export const getClients = () => {
  return async function (dispatch) {
    const bdInfo = await axios.get("/client");
    const clients = bdInfo.data;
    dispatch({ type: GET_CLIENTS, payload: clients });
  };
};

export const getProfessionals = () => {
  return async function (dispatch) {
    const bdInfo = await axios.get("/professional");
    const profs = bdInfo.data;
    dispatch({ type: GET_PROFESSIONALS, payload: profs });
  };
};

export const getClientByName = (name) => {
  return async function (dispatch) {
    const res = await axios.get("/client?name=" + name);
    dispatch({
      type: GET_CLIENT_BY_NAME,
      payload: res.data,
    });
  };
};

/* ------------------------------------------------------------- */

export const GET_TURNS = "GET_TURNS";
export const FILTER_BY_HOUR = "FILTER_BY_HOUR";
export const FILTER_BY_DATE = "FILTER_BY_DATE";
export const GET_TURN_BY_NAME = "GET_TURN_BY_NAME";

export const getTurns = () => {
  return async function (dispatch) {
    const bdInfo = await axios.get("/turn");
    const turns = bdInfo.data;
    dispatch({ type: GET_TURNS, payload: turns });
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
};

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

export const getTurnDetail = (id) => {
  return async function (dispatch) {
    const bdInfo = await axios.get(`/turn/${id}`);
    dispatch({ type: GET_TURN_DETAIL, payload: bdInfo });
  };
};

export const getClientDetailTurn = (id) => {
  return async function (dispatch) {
    const bdInfo = await axios.get(`/client/${id}`);
    dispatch({ type: GET_CLIENT_DETAIL_TURN, payload: bdInfo });
  };
};

export const cleanDetailTurn = () => {
  return {
    type: CLEAN_DETAIL_TURN,
  };
};

export const deleteTurn = (id) => {
  return async function (dispatch) {
    let url = await axios.delete(`/turn/${id}`);
    return {
      type: "DELETE",
      url,
    };
  };
};
/* ------------------------------------------------------------- */

export const GET_PROF_DETAIL = "GET_PROF_DETAIL";
export const CLEAN_PROF_DETAIL = "CLEAN_PROF_DETAIL";
export const EDIT_PROFESSIONAL = "EDIT_PROFESSIONAL";
export const GET_PROF_CLIENTS_TURNS = "GET_PROF_CLIENTS_TURNS"

export const getProfessionalDetail = (id) => {
  return async function (dispatch) {
    const bdInfoProf = await axios.get(`/professional/${id}`);
    const professional = bdInfoProf.data;
    dispatch({ type: GET_PROF_DETAIL, payload: professional });
  };
};

export const cleanProfDetail = () => {
  return {
    type: CLEAN_PROF_DETAIL,
  };
};


export const getProfClientsTurns = (id) => {
  return{
    type: GET_PROF_CLIENTS_TURNS,
    payload: id
  }
}

/* ------------------------------------------------------------- */

export const GET_SERVICES = "GET_SERVICES";

export const getServices = () => {
  return async function (dispatch) {
    const bdInfo = await axios.get("/service");
    const services = bdInfo.data.map((s) => s.id);
    dispatch({ type: GET_SERVICES, payload: services });
  };
};

/*---------------------------DARK MODE--------------------------------------*/

export const changeTheme = (mode) => {
  return {
    type: CHANGE_THEME,
    payload: mode,
  };
};
