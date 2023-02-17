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
  CHANGE_THEME

} from "./Actions";

const initialState = {
  //clients:[],
  turnDetail: "",
  clientDetailTurn: "",
  allClients: [],
  turns: [],
  turnBackup: [],
  turnFiltered: [],
  profDetail: [],
  allServices: [],
  darkMode: false
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CLIENTS:
      return {
        ...state,
        /*  turns: action.payload,
            allTurns: action.payload, */
        allClients: action.payload,
      };
    /* 
        case GET_CLIENT_BY_NAME:
            return{
            ...state,
            turns: action.payload
            };
            */

    case FILTER_BY_CLIENT:
      const allClients = state.turnBackup;
      const filterClient =
        action.payload === "Clients"
          ? allClients
          : allClients.filter((e) => e.id === action.payload);
      return {
        ...state,
        turns: filterClient,
      };

    /* ---------------------------------------------------- */

    case GET_TURNS:
      return {
        ...state,
        turns: action.payload,
        turnBackup: action.payload,
      };

    case GET_TURN_BY_NAME:

      const source = state.turnFiltered.length? state.turnFiltered : state.turnBackup;
      const filtered = action.payload
        ? source.filter((t) => t.client.name.toLowerCase() === action.payload)
        : state.turnBackup;

      return {
        ...state,
        turns: filtered,
        turnFiltered: filtered,
      };

    case FILTER_BY_DATE:
        const sourceDate = state.turnFiltered.length? state.turnFiltered : state.turnBackup;
        const date = action.payload
        ? sourceDate.filter((t) => t.date === action.payload)
        : state.turnBackup;

      return {
        ...state,
        turns: date,
        turnFiltered: date,
      };

    case FILTER_BY_HOUR:
      const allTurns = state.turnBackup;
      const filterHours =
        action.payload === "Hours"
          ? allTurns
          : allTurns.filter((e) => e.hour == action.payload);
      return {
        ...state,
        turns: filterHours,
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
        return{
          ...state,
         allServices: action.payload
        };  

       /*--------------------DARK MODE -------------------------------------*/ 

      case CHANGE_THEME:
        return{
          ...state,
          darkMode: action.payload
        }

    default:
      return {
        ...state,
      };
  }
};

export default rootReducer;
