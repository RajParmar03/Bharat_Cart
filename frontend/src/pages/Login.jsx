import React, { useRef } from 'react';
import { Box, Button, Flex, FormLabel, Heading, Input, Text } from '@chakra-ui/react';
import axios from 'axios';
import {useNavigate} from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { startLoading, stopLoading, startError } from "../Redux/stateManager/stateManager.action";
import { useEffect } from 'react';
import { loginState } from '../Redux/authManager/authManager.action';


let baseUrl = process.env.REACT_APP_BASEURL;




const Login = () => {

  const emailInput = useRef(null);
  const passwordInput = useRef(null);

  const loadingManager = useSelector(store => store.loadingManager);
  const authManager = useSelector(store => store.authManager);
  const dispatch = useDispatch();
  console.log(authManager);

  const navigate = useNavigate();

  useEffect(() => {
    emailInput.current.focus();
  },[]);

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(startLoading());
    if(emailInput.current.value && passwordInput.current.value){
      try {
        let loginObj = {
          email : emailInput.current.value,
          password : passwordInput.current.value
        }
        let ans = await axios.post(`${baseUrl}/user/login` , loginObj);
        alert(ans.data.message);
        localStorage.setItem("token",ans.data.token);
        dispatch(loginState());
        dispatch(stopLoading());
        navigate("/");
      } catch (error) {
        alert(error.message);
        dispatch(startError());
      }
    }else{
      alert("please provide your email and password..");
      dispatch(stopLoading());
    }
  }

  return (
    <Box m={"130px auto 30px auto"}>
    <Heading as={"h1"} size={"2xl"} color="orange">Login</Heading>
    <Box m={"40px auto auto auto"} w={"30%"}>
      <form onSubmit={(e) => handleLogin(e)}>
        <FormLabel>Email / User Name / Mobile Number</FormLabel>
        <Input type='text' placeholder='Enter Your Email or User Name or Mobile Number...' border={"1px"} ref={emailInput}/>
        <FormLabel>Password</FormLabel>
        <Input type='password' placeholder='Enter Your Password...' border={"1px"} ref={passwordInput}/>
        {
          loadingManager.isLoading?
          <Button m={"20px auto auto auto"} border={"2px solid orange"} fontSize={"20px"} color={"orange.400"} fontWeight={"bold"} isLoading={true} loadingText={"logging in"} spinnerPlacement={"end"}></Button>
          :
          <Input m={"20px auto auto auto"} type="submit" value="Login" border={"2px solid orange"} fontSize={"20px"} color={"orange.400"} fontWeight={"bold"}  />
        }
      </form>
    </Box>
    <Flex w={"24%"} m={"30px auto auto auto"} fontSize={"18px"} justifyContent={"space-around"}>Don't Have An Account? <Box onClick={() => navigate("/signup")} _hover={{cursor:"pointer",textDecoration:"underline"}} color={"blue.500"}>Sign-Up</Box> Here..</Flex>
    </Box>
  )
}

export default Login;