import {
  GET_CLIENTS,
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
  CLEAN_DATE,
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
  profClientsTurnsFilteredByDate: [],
  profClientsTurnsFilteredByName: [],
  allServices: [],
  darkMode: false,
  hasTurn: null,
  currentDate: null,
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
          ? allTurnsC
          : allTurnsC.filter((e) => e.client.name === action.payload);
      console.log(state.currentDate); // primer render => NULL

      return {
        ...state,
        profClientsTurns: filterClient,
        profClientsTurnsFilteredByName: filterClient,
        hasTurn: state.currentDate && allTurnsC.some(
          (t) => t.date === state.currentDate && t.client.name === action.payload
        ),
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
    case CLEAN_DATE:
      return {
        ...state,
        currentDate: null,
      };

    case GET_TURN_BY_NAME:
      const toFilter = state.turnFiltered.length
        ? state.turnFiltered
        : state.turnBackup;
      const filtered = action.payload
        ? toFilter.filter((t) => t.client.name.toLowerCase() === action.payload)
        : state.turnBackup;
      return {
        ...state,
        turns: filtered,
        turnFiltered: filtered,
      };

    case FILTER_BY_DATE:
      const toFilterDate = state.profClientsTurnsFilteredByName;
      const date =
        action.payload === ""
          ? toFilterDate
          : toFilterDate.filter((t) => t.date === action.payload);
      console.log(action.payload);
      return {
        ...state,
        profClientsTurns: date,
        profClientsTurnsFilteredByDate: date,
        currentDate: action.payload,
      };

    case FILTER_BY_HOUR:
      const allTurns = state.profClientsTurns;
      const filterHours =
        action.payload === "Hours"
          ? allTurns
          : allTurns.filter((e) => e.hour === action.payload);
      return {
        ...state,
        profClientsTurns: filterHours,
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
      const allTurnsClientFiltered = allTurnsClient.filter(
        (t) => t.professionalID === action.payload
      );
      return {
        ...state,
        profClientsTurnsFilteredByName: allTurnsClientFiltered,
        profClientsTurnsBackup: allTurnsClientFiltered,
        profClientsTurns: allTurnsClientFiltered,
      };

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
