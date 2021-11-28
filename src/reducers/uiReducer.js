import { types } from "../types/types";


//mi estado inicial sera este:
const initialState = {
    loading : false,
    msgError: null,

}

export const uiReducer = (state = initialState, action )=> {

    switch (action.type) {
        case types.uiSetError:
            // aqui me tira el estado inicial pero con un error.
            return {
                ...state,
                msgError : action.payload
            }
        case types.uiRemoveError:
            // aqui en cambio retorna nuevamente el message en null.
            return {
                ...state,
                msgError: null,
            } 
            
        case types.uiStartLoading:
            return{
                ...state,
                loading:action.payload
            }

        case types.uiFinishLoading:
            return{
                ...state,
                loading:action.payload
            }


            
       
    
        default:
            return state;
         
    }

}