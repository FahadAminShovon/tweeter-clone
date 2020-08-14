import React from 'react';
// router imports
import { Route, Redirect } from 'react-router-dom';
// Redux import
import { useSelector } from 'react-redux';


const AuthRoute = ({component: Component, ...rest}) => {
    const authenticated = useSelector(state => state.user.authenticated);
    return <Route
        {...rest}
        render = { props => 
            authenticated === true? <Redirect to = "/"/> : <Component {...props}/>}
    />
}

export default AuthRoute;