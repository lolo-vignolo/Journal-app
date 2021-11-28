import { getAuth, onAuthStateChanged } from '@firebase/auth';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import {
    BrowserRouter as Router,
    Switch,
    Redirect,
  } from "react-router-dom";
import { login } from '../actions/auth';
import {  startLoginNotes } from '../actions/note';

import { JournalScreen } from '../components/journal/JournalScreen'

import { AuthRouters } from './AuthRouters'
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

export const AppRouters = () => {


    const dispatch = useDispatch();
/*un useState para verificar que mi app ya termino de cargar o no, lo que me va a decir si tengo el ususario
o no para ver que hacer, si esta en true, todav{ia esta cargando} */
    const [cheking, setChecking] = useState(true);


  /* ahora un nuevo use state que me va a decir  a donde mandar el usuario, con el anterior useState
  ya recibí la información para saber si lo dejo entrar o no, ahora lo debo enviar */  
    const [isLogeedIn, setisLogeedIn] = useState(false)


   /* firebase me va a avisar cuando la autenticación cambia, con eso que me da, debo hacer algo. 
    para lo que voy a usar un useEffect. Al no haber nada en el [], solo se ejecutara cuando el
   estado de la authentication cambie.
   se pone aqui el useEffec debido a que la funcion es sincrona, por lo cual el use effect sera un freno 
   que re diriga al usuario o al journalscreen or al authrouter*/
   useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth,(user)=>{
       
        if(user?.uid){
            dispatch (login(user.uid, user.displayName));
            setisLogeedIn(true)
            dispatch(startLoginNotes(user.uid))
        } else{
            setisLogeedIn(false)
        }
        setChecking(false)
        

    })      
   }, [dispatch, setChecking, setisLogeedIn])

   if (cheking){
       return(
        <h1>Espere...</h1>
       )
      
   }


    return (
       <Router>
           <div>
               <Switch>
                    <PublicRoute
                    path = "/auth"
                    component = {AuthRouters}
                    isAuthenticated = {isLogeedIn}
                    />

                    <PrivateRoute
                    exact
                    path = "/"
                    component = {JournalScreen}
                    isAuthenticated = {isLogeedIn}
                     />

                    <Redirect to="/auth/login" />

               </Switch>
           </div>
       </Router>
    )
}
