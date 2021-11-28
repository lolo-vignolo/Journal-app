import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from 'redux-thunk';

import { authReducer } from "../reducers/authReducer";
import { noteReducer } from "../reducers/noteReducer";
import { uiReducer } from "../reducers/uiReducer";

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;


const reducers = combineReducers({
    auth: authReducer,
    ui: uiReducer,
    note:noteReducer,
    
});




/* este createStore acepta solo un reducer, es por eso que debo
 crear la constante conbineReducer, de esta forma podré poner mas....
  el texto window +++ sale de error que tengo en el redux de mi consola */
export const store = createStore (
    reducers,
    composeEnhancers(
        applyMiddleware(thunk)
    ) 
    );