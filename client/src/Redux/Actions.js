import axios from "axios";
export const GET_CLIENTS = "GET_CLIENTS";

export const getClients = () => {
  return async function (dispatch) {
    const bdInfo = await axios.get("/client");
    const clients = bdInfo.data;
    dispatch({ type: GET_CLIENTS, payload: clients });
  };
};


/* ------------------------------TURNS------------------------------- */

export const GET_TURNS = "GET_TURNS";
export const FILTER_BY_HOUR = "FILTER_BY_HOUR";
export const FILTER_BY_DATE = "FILTER_BY_DATE";
export const GET_TURN_BY_NAME = "GET_TURN_BY_NAME";
export const FILTER_BY_CLIENT = "FILTER_BY_CLIENT";
export const GET_TURN_DETAIL = "GET_TURN_DETAIL";
export const GET_CLIENT_DETAIL_TURN = "GET_CLIENT_DETAIL_TURN";
export const CLEAN_DETAIL_TURN = "CLEAN_DETAIL_TURN";
export const DELETE = "DELETE";
export const FILTER_CANCELED = "FILTER_CANCELED";
export const DELETE_CLIENTS = "DELETE_CLIENTS";

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

export const deleteClients = (id) => {
  return async function (dispatch) {
    try {
      await axios.delete(`/client/${id}`);
      dispatch({
        type: "DELETE_CLIENTS",
        id: id,
      });
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
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



export const filterCanceled = () => {
  return (dispatch, getState) => {
    const allTurnsCancel = getState().turnBackup;
    const allTurnsCancelFiltered = allTurnsCancel.filter((t) => !t.status);
    dispatch({
      type: FILTER_CANCELED,
      payload: allTurnsCancelFiltered,
    });
    return Promise.resolve();
  };
};

/* ----------------------------PROFESSIONALS--------------------------------- */
export const GET_PROFESSIONALS = "GET_PROFESSIONALS";
export const GET_PROF_DETAIL = "GET_PROF_DETAIL";
export const CLEAN_PROF_DETAIL = "CLEAN_PROF_DETAIL";
export const EDIT_PROFESSIONAL = "EDIT_PROFESSIONAL";
export const GET_PROF_CLIENTS_TURNS = "GET_PROF_CLIENTS_TURNS"
export const CLEAN_DATE = "CLEAN_DATE";
export const DELETE_PROFESSIONAL = "DELETE_PROFESSIONAL";


export const getProfessionals = () => {
  return async function (dispatch) {
    const bdInfo = await axios.get("/professional");
    const profs = bdInfo.data;
    dispatch({ type: GET_PROFESSIONALS, payload: profs });
  };
};

export const getProfessionalDetail = (id) => {
  return async function (dispatch) {
    const bdInfoProf = await axios.get(`/professional/${id}`);
    const professional = bdInfoProf.data;
    dispatch({ type: GET_PROF_DETAIL, payload: professional });
  };
};

export const deleteProfessional = (id) => {
  return async function (dispatch) {
    try {
      await axios.delete(`/professional/${id}`);
      dispatch({
        type: "DELETE_PROFESSIONAL",
        id: id,
      });
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };
};

export const cleanProfDetail = () => {
  return {
    type: CLEAN_PROF_DETAIL,
  };
};
export const cleanDate = () => {
  return {
    type: CLEAN_DATE,
  };
};


export const getProfClientsTurns = (id) => {
  return{
    type: GET_PROF_CLIENTS_TURNS,
    payload: id
  }
}

/* ----------------------------SERVICES--------------------------------- */

export const GET_SERVICES = "GET_SERVICES";

export const getServices = () => {
  return async function (dispatch) {
    const bdInfo = await axios.get("/service");
    const services = bdInfo.data
    dispatch({ type: GET_SERVICES, payload: services });
  };
};

/*---------------------------DARK MODE--------------------------------------*/

export const CHANGE_THEME = "CHANGE_THEME";

export const changeTheme = (mode) => {
  return {
    type: CHANGE_THEME,
    payload: mode,
  };
};

/*-----------------------------------------------------------------*/

export const SET_CURRENT_DATE = "SET_CURRENT_DATE";

export const setCurrentDateAction = (newDate) => {
  return {
    type: SET_CURRENT_DATE,
    payload: newDate,
  };
};

