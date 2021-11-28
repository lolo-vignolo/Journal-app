import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "@firebase/auth";
import { googleAuthProvider } from "../firebase/firebase-config";
import {types} from '../types/types';
import { FinishLoading, StartLoading } from "./loading";
import Swal from 'sweetalert2';
import { initialStateAgain } from "./note";

export const startLoginEmailPassword = (email,password)=>{
    return (dispatch)=>{

        dispatch(StartLoading());
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
        .then(({user})=>{
            dispatch(login(user.uid, user.displayName))
            dispatch(FinishLoading());
        })
        .catch (e => {console.log(e)
            dispatch(FinishLoading());
            Swal.fire("Error", e.message, "error");
        });

    }
}


export const startRegisterWithEmailNamePassw = (name, email, password)=>{
    return (dispatch) => {
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
        .then(async({user})=> {
            await updateProfile (user, {displayName:name});
            dispatch(login(user.uid, user.displayName));
        })

        .catch(e => {console.log(e)
            
            Swal.fire("Error", e.message, "error");
        })

    }

}


 // el then lanza una respuesta, la cual es un objeto que dentro tiene a user, que
 //a su vez dentro tiene items, dos de esos son uid y displayName.
export const startGoogleLogin = () =>{
    return (dispatch) =>{
        const auth = getAuth();
        signInWithPopup(auth, googleAuthProvider)
            .then(({user}) =>{
                dispatch(login(user.uid, user.displayName))
            });
    }
}

export const login = (uid, displayName)=>{
    return {
        type: types.login,
        payload: {
            uid,
            displayName
        }
    }
}


export const startLogout =  () => {
    return async(dispatch) => {
        const auth = getAuth();
        await signOut(auth);
        dispatch(logout());
        dispatch(initialStateAgain())

    }
}

/*devueve un objeto vacío , ver authReducer*/
export const logout = ()=> {
    return{
        type:types.logout,
    }
}