import React from 'react';
import { Redirect, Route } from 'react-router';


/*isAuthenticated no es otra cosa que un simple atributo que luego le doy la calidad de estado inicial en AuthRouters */

const PrivateRoute =  ({

    isAuthenticated,
    component: Component,
    ...rest
}) => {
    return(
        <Route {...rest} 
        component = { (props) => (

            (isAuthenticated)
                ? (<Component {...props} />)
                : (<Redirect to = "/auth/login" />)

        ) }
        />
 
    )
}




export default PrivateRoute
