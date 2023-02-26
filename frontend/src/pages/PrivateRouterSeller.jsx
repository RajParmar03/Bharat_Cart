import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import SellerLogin from './SellerLogin';

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

    let [isSeller , setIsSeller] = useState(false);
    useEffect(() => {
        let token = localStorage.getItem("token");
        if(token){
            getUser(localStorage.getItem("token")).then((res) => {
                if(res.role === "seller"){
                    setIsSeller(true);
                }else{
                    setIsSeller(false);
                }
            }).catch((error) => {
                console.log(error);
                setIsSeller(false);
              });
        }
    }, []);
    if(!isSeller){
        return <SellerLogin />;
    }
    return props.children;
}

export default PrivateRoute;