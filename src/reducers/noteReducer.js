
/*
initialState = {
    note :[],
    active : null,                     (nota activa = null, pantalla morada) 
    active : {
        id : sdfasefas5a,
        title : "",                     (nota activa, pantalla en blanco)
        body : "",
        imageUrl : "";
        date : 123485566

    }
}
*/

import { types } from "../types/types";

const initialState = {
    note :[],
    active : null                  
}

export const noteReducer = (state = initialState, action) => {

    switch (action.type) {
        case types.noteActive : {
            return{ 
                ...state,
                active : {
                    ...action.payload
                }

            }
        }

        /*action.payloas, es la nota nueva, y esa la agrego a las preexistentes que son ...state.note
        todas dentro de un array, que es la estrucutura de mis notas*/
        case types.noteAddNew:
            return{
                ...state,
                note: [action.payload, ...state.note]
            }
        
        case types.noteLoad :
            return {
                ...state,
                note : [ ...action.payload]

            }

        case types.noteUpDated:
            return{
                ...state,
                note: state.note.map(note =>(
                    note.id === action.payload.id 
                    ? action.payload.note
                    : note
                ))

            }

            /* la nota active la pasa a null y el nuevo estado me devolvera todas
            las notas que su id sea distinto al id de la que voy  eliminar */
        case types.noteDelete:
            return{
                ...state,
                active : null,
                note: state.note.filter(note =>(
                    note.id !==action.payload.id 
                ))
                
            }

        case types.noteLogoutCleaning:
            return{
                ...state,
                note: action.payload
            }

        
    
        default:
            return state;
    }
}