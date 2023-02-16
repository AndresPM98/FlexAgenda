import {GET_CLIENTS, GET_CLIENT_BY_NAME, FILTER_BY_CLIENT, GET_TURNS, GET_TURN_BY_NAME, FILTER_BY_DATE, FILTER_BY_HOUR, CLEAN_DETAIL_TURN,
     GET_TURN_DETAIL, GET_CLIENT_DETAIL_TURN} from "./Actions";

const initialState = {
    //clients:[],
    turnDetail:'',
    clientDetailTurn: '',
    allClients:[], 
    turns:[],
    allTurns:[]
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

        case FILTER_BY_CLIENT:
            const allClients = state.allTurns;
            const filterClient = action.payload === 'Clients' ? allTurns : allTurns.filter(e => e.id === action.payload);
            return{
                ...state,
                turns: filterClient
            };
 */
        /* ---------------------------------------------------- */
        
        case GET_TURNS:
            return {
            ...state,
            turns: action.payload,
            allTurns: action.payload,
            };
        
        /* case GET_TURN_BY_NAME:
            return{
            ...state,
            turns: action.payload.turns.map(t => t.Client.name == action.payload.name)
            }; */

        case FILTER_BY_DATE:
            const allTurn = state.allTurns;
            const filterDate = action.payload === 'Hours' ? allTurn : allTurn.filter(e => e.id === action.payload);
            return{
                ...state,
                turns: filterDate
            };
            
        case FILTER_BY_HOUR:
            const allTurns = state.allTurns;
            const filterHours = action.payload === 'Hours' ? allTurns : allTurns.filter(e => e.hour == action.payload);
            return{
                ...state,
                turns: filterHours
            };

        case GET_TURN_DETAIL:
            return{
                ...state,
                turnDetail: action.payload.data
            }

        case GET_CLIENT_DETAIL_TURN:
            return{
                ...state,
                clientDetailTurn: action.payload.data
            }

        case CLEAN_DETAIL_TURN:
            return{
                ...state,
                turnDetail: '',
                clientDetailTurn: ''
            }

    
        default:
            return {
            ...state,
            };
         }
        };
            
export default rootReducer;
