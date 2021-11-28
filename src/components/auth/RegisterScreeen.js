import React from 'react'
import { Link } from 'react-router-dom'
import { useForm } from '../hooks/useForm'
import validator from 'validator'
import { useDispatch, useSelector } from 'react-redux'
import { removeError, setError } from '../../actions/ui'
import { startRegisterWithEmailNamePassw } from '../../actions/auth'

export const RegisterScreeen = () => {

    const dispatch = useDispatch();

    const {msgError} = useSelector(state => state.ui);
    

    const [registerValues, handleRegister] = useForm ({
        name: "",
        email: "",
        password: "",
        confirm: ""
    })

    const {name , email , password, confirm } = registerValues;

    const changeValues = (event)=>{
        event.preventDefault();
        

        if (isFormValid()) {
           dispatch(startRegisterWithEmailNamePassw(name, email, password));
        }

    }

    const isFormValid = ()=> {

        //buscar en npm validator

        if (name.trim().length === 0){
            dispatch (setError("Name is required "));
            return false
        }else if (!validator.isEmail(email)) {
            dispatch (setError("Email is not valid"));
            return false
        } else if ( password !== confirm || password.length < 6){
            dispatch (setError("Password should be at leat 6 characters or this is not matching"));
            return false
        }

        dispatch(removeError());
        return true;
    }


    return (
        <>
        <h3 className="auth__title">Register</h3>
        <form
         className = "animate__animated animate__fadeIn"
         onSubmit = {changeValues}>

       {/* es condicional, solo aparecera si esta el error  */}
        {
            msgError && (
                <div className = "auth__alert-error">
                     {msgError}
                </div>
            )
           

        }
       

        <input 
             type ="text"
             placeholder = "Name"
             name = "name"
             className ="auth__input"
             value = {name}
             onChange = {handleRegister}
         /> 

         <input 
             type ="text"
             placeholder = "Email"
             name = "email"
             className ="auth__input"
             value = {email}
             onChange = {handleRegister}
         /> 

         <input 
             type ="password"
             placeholder = "Password"
             name = "password"
             className ="auth__input"
             value = {password}
             onChange = {handleRegister}
         /> 

        
        <input 
             type ="password"
             placeholder = "Confirm Password"
             name = "confirm"
             className ="auth__input"
             value = {confirm}
             onChange = {handleRegister}
         /> 

         <button
             type= "submit"
             className = "btn btn-primary btn-block mb-5"
         >
             Register
         </button>

         
         
         <Link 
         className = "link mt-5"
         to ="/auth/login"
         > 
             Already registered?
         </Link>

         
        </form>
     </>
    )
}
