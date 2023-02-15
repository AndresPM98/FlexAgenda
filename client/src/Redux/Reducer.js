import {GET_CLIENTS, GET_CLIENT_BY_NAME, FILTER_BY_CLIENT} from "./Actions";

const initialState = {
    clients:[],
    allClients:[]
    };

    const rootReducer = (state = initialState, action) => {
        switch (action.type) {
        case GET_CLIENTS:
            return {
            ...state,
            clients: action.payload,
            allClients: action.payload,
            };

        case GET_CLIENT_BY_NAME:
            return{
            ...state,
            clients: action.payload
            };

        case FILTER_BY_CLIENT:
            const allClients = state.allClients;
            const filterClient = action.payload === 'Clients' ? allClients : allClients.filter(e => e.id === action.payload);
            return{
                ...state,
                clients: filterClient
            };
    
        default:
            return {
            ...state,
            };
         }
        };
            
export default rootReducer;
