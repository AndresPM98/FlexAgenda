import {GET_CLIENTS, GET_CLIENT_BY_NAME, FILTER_BY_CLIENT, GET_TURNS, GET_TURN_BY_NAME, FILTER_BY_DATE, FILTER_BY_HOUR} from "./Actions";

const initialState = {
    //clients:[],
    allClients:[], 
    turns:[],
    turnBackup:[]
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
            const filterClient = action.payload === 'Clients' ? allClients : allClients.filter(e => e.id === action.payload);
            return{
                ...state,
                turns: filterClient
            };
 
        /* ---------------------------------------------------- */
        
        case GET_TURNS:
            return {
            ...state,
            turns: action.payload,
            turnBackup: action.payload,
            };
        
        case GET_TURN_BY_NAME:
            return{
            ...state,
            turns: state.turnBackup.map(t => t.client.name === action.payload)
            }; 

        case FILTER_BY_DATE:
            const allTurn = state.turnBackup;
            const filterDate = action.payload === 'Hours' ? allTurn : allTurn.filter(e => e.id === action.payload);
            return{
                ...state,
                turns: filterDate
            };
            
        case FILTER_BY_HOUR:
            const allTurns = state.turnBackup;
            const filterHours = action.payload === 'Hours' ? allTurns : allTurns.filter(e => e.hour == action.payload);
            return{
                ...state,
                turns: filterHours
            };

    
        default:
            return {
            ...state,
            };
         }
        };
            
export default rootReducer;
