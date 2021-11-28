import { types } from "../types/types"

export const StartLoading = ()=>{
    return{
        type: types.uiStartLoading,
        payload: true,
    }
} 

export const FinishLoading = ()=>{
    return{
        type: types.uiFinishLoading,
        payload: false,
    }
} 
