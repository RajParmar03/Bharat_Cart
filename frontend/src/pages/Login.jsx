import React, { useRef } from 'react';
import { Box, FormLabel, Heading, Input } from '@chakra-ui/react';
import axios from 'axios';



const Login = () => {

  const emailInput = useRef(null);
  const passwordInput = useRef(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      let loginObj = {
        email : emailInput.current.value,
        password : passwordInput.current.value
      }
      let ans = await axios.post("http://localhost:1010/user/login" , loginObj);
      alert(ans.data.message);
      localStorage.setItem("token",ans.data.token);
    } catch (error) {
      alert(error.message);
    }
    

  }


  return (
    <>
    <Heading as={"h1"} size={"2xl"} color="orange">Login</Heading>
    <Box m={"40px auto auto auto"} w={"30%"}>
      <form onSubmit={(e) => handleLogin(e)}>
        <FormLabel>Email / User Name / Mobile Number</FormLabel>
        <Input type='text' placeholder='Enter Your Email or User Name or Mobile Number...' border={"1px"} ref={emailInput}/>
        <FormLabel>Password</FormLabel>
        <Input type='password' placeholder='Enter Your Password...' border={"1px"} ref={passwordInput}/>
        <Input m={"20px auto auto auto"} type="submit" value="Login" border={"2px solid orange"} fontSize={"20px"} color={"orange.400"} fontWeight={"bold"}  />
      </form>
    </Box>
    </>
  )
}

export default Login;