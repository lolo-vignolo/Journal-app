/*
mi state va a estar bacío cuando yo no este authenticado, { }

En cambio cuando este authenticado, tendré:
{
    uid: "215464dasd1a3s5d4a65s4da"
    name : "Lorenzo"
}

*/

import { types } from "../types/types";

 /* Action ahora no tiene nada, pero luego va a ser un objeto
    que action = {
            type = "login"
            payload ={
                uid : "asd45as65d4a6sd"
                displayNmae: "Lorenzo"
            }
    } */

export const authReducer = (state = {}, action) => {
 
   //si acion type (action.type) es igual a login (types.login), return un objeto con las siguentes caract:
   /* return{
                uid: action.payload.uid,
                name: action.payload.displayName
            }
            
    la caul saldr{a de mi accion que tiene las siguientes caracteristicas
    mi accion==>    const login = (uid, displayName)=>{
                            return {
                                type: types.login,
                                payload: {
                                    uid,
                                    displayName
                                }
                            }
                        }

        La accion activa al reducer                
        */


    switch (action.type) {
        case types.login:
            return{
                uid: action.payload.uid,
                name: action.payload.displayName
            }
        
        case types.logout:
            return{  }
            
    
        default:
            return state;
    }
}