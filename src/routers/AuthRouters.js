import React from 'react';
import { Redirect, Route, Switch } from 'react-router';
import { LoginScreen } from '../components/auth/LoginScreen';
import { RegisterScreeen } from '../components/auth/RegisterScreeen';



export const AuthRouters = () => {
    return (
        <>
             
            <div className= "auth__main">
            <div className="auth__box-conteiner">
            <Switch>
                <Route path ="/auth/login" component={LoginScreen} />
                <Route path ="/auth/register" component={RegisterScreeen} />
           


                <Redirect to="/auth/login" />
                </Switch>

            </div>
            </div>
            
        </>
    )
}
