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
  SET_CURRENT_DATE,
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
  profClientsTurns: [], // renderiza los turnos en pantalla
  profClientsTurnsBackup: [], // tienetodos los turnos, siempre
  profClientsTurnsFilteredByDate: [], // el resultado de filtrar por name
  profClientsTurnsFilteredByName: [], // el resultado de filtrar por date
  currentDate: [],
  currentName: [],
  allServices: [],
  darkMode: false,
  setCurrentDate: new Date(),
};

const rootReducer = (state = initialState, action) => {
  let allTurnsC = state.profClientsTurnsBackup;
  switch (action.type) {
    case "SET_CURRENT_DATE":
      return {
        ...state,
        setCurrentDate: action.payload,
      };

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
        currentDate: [],
        currentName: [],
      };

    case FILTER_BY_CLIENT:
      // Primero definimos cual es la fuente que vamos a filtrar.
      // Si ya se filtro por date, usamos esos resultados
      let toFilterbyName = state.currentDate.length
        ? state.profClientsTurnsFilteredByDate
        : allTurnsC;

      // Ahora filtramos
      let filteredbyName = toFilterbyName.filter(
        (e) => e.client.name === action.payload
      );

      // filtro por nombre en base a la fecha que ya estaba puesta
      if (
        state.currentDate.length &&
        state.currentName.length &&
        state.currentName !== action.payload
        ){
 
        filteredbyName = allTurnsC.filter(
          (t) =>
            t.date === state.currentDate && t.client.name === action.payload
        );}
      return {
        ...state,
        profClientsTurns: filteredbyName,
        profClientsTurnsFilteredByName: filteredbyName,
        currentName: action.payload,
      };

    case FILTER_BY_DATE:
      // Primero definimos cual es la fuente que vamos a filtrar.
      // Si ya se filtro por date, usamos esos resultados:
      let toFilterbyDate = state.currentName.length
        ? state.profClientsTurnsFilteredByName
        : allTurnsC;
      // Ahora filtramos
      let filteredbyDate = toFilterbyDate.filter(
        (e) => e.date === action.payload
      );
      // filtro por fecha en base al nombre que ya estaba puesto
      if (
        state.currentDate.length &&
        state.currentName.length &&
        state.currentDate !== action.payload
      ){
        console.log("filtro por fecha en base al nombre que ya estaba puesto");
        filteredbyDate = allTurnsC.filter(
          (t) =>
            t.date === action.payload && t.client.name === state.currentName
        );}
      return {
        ...state,
        profClientsTurns: filteredbyDate,
        profClientsTurnsFilteredByDate: filteredbyDate,
        currentDate: action.payload,
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
