import 'firebase/firestore';
import 'firebase/auth';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { GoogleAuthProvider } from 'firebase/auth';
 
 
// Your web app's Firebase configuration
const firebaseConfig = {
 //tuinformación de tu app en firebase
};
 
// Initialize Firebase
const app = initializeApp(firebaseConfig);
 
const db = getFirestore();
 
const googleAuthProvider = new GoogleAuthProvider();
 
export{
    db,
    googleAuthProvider
}
auth.js

import { getAuth, signInWithPopup } from 'firebase/auth';
import { googleAuthProvider } from '../components/firebase/firebase-config';
import {types} from '../types/types';
 
export const startLoginEmailPassword = (email, password) =>{
    return (dispatch) =>{
        setTimeout(() => {
            dispatch(login(123, 'Pedro'))
        }, 3500);
    }
}
 
export const startGoogleLogin = () =>{
    return (dispatch) =>{
        const auth = getAuth();
        signInWithPopup(auth, googleAuthProvider)
            .then(({user}) =>{
                dispatch(login(user.uid, user.displayName))
            });
    }
}
 
export const login = (uid, displayName) =>(
    {
        type:types.login,
        payload: {
            uid,
            displayName
        }
    }
)