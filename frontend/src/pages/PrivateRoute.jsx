import React from 'react';
import { Navigate } from 'react-router';


const PrivateRoute = (props) => {
    let token = localStorage.getItem("token");
    console.log(token);
    if(token == undefined || token == null){
       return <Navigate to="/login" />
    }
    return props.children;
}

export default PrivateRoute;