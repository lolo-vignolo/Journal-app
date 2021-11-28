import 'firebase/firestore';
import 'firebase/auth';

import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyAQhjWEZyb1nlDHyNmKpuK3KAc-H7l1i_g",
    authDomain: "react-app-journal-e5b32.firebaseapp.com",
    projectId: "react-app-journal-e5b32",
    storageBucket: "react-app-journal-e5b32.appspot.com",
    messagingSenderId: "955437938441",
    appId: "1:955437938441:web:0a2cc01d7a0c4c391345d8"
  };
  
  
const app = initializeApp(firebaseConfig);
console.log(app);

const db = getFirestore();


/* this is for authentification im google, and it is the sam efor facebook, twiter , github, etc. */
const googleAuthProvider = new GoogleAuthProvider();

export {
    db,
    googleAuthProvider,
}