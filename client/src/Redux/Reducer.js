import {GET_CLIENTS, GET_CLIENT_BY_NAME} from "./Actions";

const initialState = {
    allClients:[],
    clients:[],
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
    
        default:
            return {
            ...state,
            };
         }
        };
            
export default rootReducer;
