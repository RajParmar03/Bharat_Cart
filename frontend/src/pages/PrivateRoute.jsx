import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import Login from "./Login";

let baseUrl = process.env.REACT_APP_BASEURL;


const getUser = async (token) => {
  let user = await axios.get(`${baseUrl}/user/getuser`, {
    headers: {
      Authorization: token
    }
  });
  return user.data;
}


const PrivateRoute = (props) => {

    let [isBuyer , setIsBuyer] = useState(false);
    useEffect(() => {
        let token = localStorage.getItem("token");
        if(token){
            getUser(localStorage.getItem("token")).then((res) => {
                if(res.role === "buyer"){
                    setIsBuyer(true);
                }else{
                    setIsBuyer(false);
                }
            }).catch((error) => {
                console.log(error);
                setIsBuyer(false);
              });
        }
    }, []);
    if(!isBuyer){
        return <Login />;
    }
    return props.children;
}

export default PrivateRoute;