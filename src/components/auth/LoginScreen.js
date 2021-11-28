import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {  startLoginEmailPassword , startGoogleLogin } from '../../actions/auth'
import { useForm } from '../hooks/useForm'

export const LoginScreen = () => {

    const dispatch = useDispatch();
    //con este Use selector puedo seleccionar una parte del objero de la tool Redux de mi pagina, en esete caso selecciono "loading".
    const {loading} = useSelector(state => state.ui)

    const [formuValues, handleInputChange,] = useForm ({
        email: "vignolo_3@hotmail.com",
        password : "123456"
    });

    const {email , password }= formuValues;

    const handleLogin = (event)=>{
        event.preventDefault();
        dispatch(startLoginEmailPassword (email , password));
       
    }

    const handleGoogleLogin = ()=>{
        dispatch (startGoogleLogin ());
    }
    

    return (
        <>
           <h3 className="auth__title">Login</h3>
           <form 
           className = "animate__animated animate__fadeIn"
           onSubmit = {handleLogin}>

            <input 
                type ="text"
                placeholder = "Email"
                name = "email"
                className ="auth__input"
                value = {email}
                onChange = {handleInputChange}
            /> 

            <input 
                type ="password"
                placeholder = "Password"
                name = "password"
                className ="auth__input"
                value = {password}
                onChange = {handleInputChange}
            /> 

            <button
                type= "submit"
                className = "btn btn-primary btn-block"
                disabled={ loading } /* arriba seleccione la parte de este objeto con el useSelector, ahora cuando loading este en true (segung mi accion y el reducer) el boton andará, de lo contrario no. */
            >
                Login
            </button>

            
            <div className ="auth__social-networks" >
                <p className = "mb-1">Login with socail networks</p>
                <div 
                        className="google-btn"
                        onClick = {handleGoogleLogin}
                    >
                        <div className="google-icon-wrapper">
                            <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />
                        </div>
                        <p className="btn-text">
                            <b>Sign in with google</b>
                        </p>
                </div>
            </div>
            <Link 
            className = "link"
            to ="/auth/register"
            > 
                Create New Account
            </Link>

            
           </form>
        </>
    )
}
