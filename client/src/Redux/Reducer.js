import {
  GET_CLIENTS,
  GET_CLIENT_BY_NAME,
  FILTER_BY_CLIENT,
  GET_TURNS,
  GET_TURN_BY_NAME,
  FILTER_BY_DATE,
  FILTER_BY_HOUR,
  CLEAN_DETAIL_TURN,
  GET_TURN_DETAIL,
  GET_CLIENT_DETAIL_TURN,
  GET_PROF_DETAIL,
  CLEAN_PROF_DETAIL,
  GET_SERVICES,
  CHANGE_THEME,
  GET_PROFESSIONALS,
  GET_PROF_CLIENTS_TURNS,

  DELETE,

} from "./Actions";

const initialState = {
  turnDetail: "",
  clientDetailTurn: "",
  allClients: [],
  allProfessionals: [],
  turns: [],
  turnBackup: [],
  turnFiltered: [],
  profDetail: [],
  profClientsTurns: [],
  profClientsTurnsBackup: [],
  allServices: [],
  darkMode: false,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CLIENTS:
      return {
        ...state,
        allClients: action.payload,
      };

    case GET_PROFESSIONALS:
      return {
        ...state,
        allProfessionals: action.payload,
      };

    case FILTER_BY_CLIENT:
      const allTurnsC = state.profClientsTurnsBackup;
      const filterClient =
        action.payload === "Clients"
          ? state.profClientsTurnsBackup
          : allTurnsC.filter((e) => e.client.name == action.payload);
      return {
        ...state,
        profClientsTurns: filterClient
      };

    /* ---------------------------------------------------- */

    case GET_TURNS:
      return {
        ...state,
        turns: action.payload,
        turnBackup: action.payload,
      };
    case DELETE:
      return {
        ...state,
      };

    case GET_TURN_BY_NAME:
      const source = state.turnFiltered.length
        ? state.turnFiltered
        : state.turnBackup;
      const filtered = action.payload
        ? source.filter((t) => t.client.name.toLowerCase() === action.payload)
        : state.turnBackup;

      return {
        ...state,
        turns: filtered,
        turnFiltered: filtered,
      };

    case FILTER_BY_DATE:
      const sourceDate = state.profClientsTurns
      const date =  
      action.payload === ""
        ? sourceDate
        : sourceDate.filter((t) => t.date == action.payload)
      return {
        ...state,
        profClientsTurns: date,
      };

    case FILTER_BY_HOUR:
      const allTurns = state.profClientsTurns;
      const filterHours =
        action.payload === "Hours"
          ? allTurns
          : allTurns.filter((e) => e.hour == action.payload);
      return {
        ...state,
        profClientsTurns: filterHours
      };

    case GET_TURN_DETAIL:
      return {
        ...state,
        turnDetail: action.payload.data,
      };

    case GET_CLIENT_DETAIL_TURN:
      return {
        ...state,
        clientDetailTurn: action.payload.data,
      };

    case CLEAN_DETAIL_TURN:
      return {
        ...state,
        turnDetail: "",
        clientDetailTurn: "",
      };

    /* - - - - - - - - - - - - - - - - - - - - - - - - - - REDUCER PROFESSIONAL - - - - - - - - - - - - - - - -- - - - - - - - - - - - - - */

    case GET_PROF_DETAIL:
      return {
        ...state,
        profDetail: action.payload,
      };

    case CLEAN_PROF_DETAIL:
      return {
        ...state,
        profDetail: action.payload,
      };

    case GET_SERVICES:
      return {
        ...state,
        allServices: action.payload,
      };

    case GET_PROF_CLIENTS_TURNS:
      const allTurnsClient = state.turnBackup;
      const allTurnsClientFiltered = allTurnsClient.filter((t) => t.professionalID == action.payload);
      return{
        ...state,
        profClientsTurnsBackup: allTurnsClientFiltered,
        profClientsTurns: allTurnsClientFiltered
      }

    /*--------------------DARK MODE -------------------------------------*/

    case CHANGE_THEME:
      return {
        ...state,
        darkMode: action.payload,
      };

    default:
      return {
        ...state,
      };
  }
};

export default rootReducer;
