import React, { useRef } from 'react';
import { Box,  FormLabel, Input } from '@chakra-ui/react';
import axios from 'axios';


const Signup = () => {

  const nameInput = useRef(null);
  const emailInput = useRef(null);
  const userNameInput = useRef(null);
  const passwordInput = useRef(null);
  const confirmPasswordInput = useRef(null);
  const mobileInput = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(passwordInput.current.value === confirmPasswordInput.current.value){
      const userObject = {
        name : nameInput.current.value,
        username : userNameInput.current.value,
        email : emailInput.current.value,
        phone : mobileInput.current.value,
        password : passwordInput.current.value,
      };
      let ans = await axios.post("http://localhost:1010/user/signup" , userObject);
      console.log(ans);
    }else{
      alert("Enter the password properly...");
    }

  }


  return (
    <Box m={"20px auto auto auto"} w={"30%"}>
      <form onSubmit={(e) => handleSubmit(e)}>
        <FormLabel>Name</FormLabel>
        <Input type='text' placeholder='Enter Your Full Name...' border={"1px"} ref={nameInput}/>
        <FormLabel>Email address</FormLabel>
        <Input type='email' placeholder='Enter Your Email...' border={"1px"} ref={emailInput}/>
        <FormLabel>User Name</FormLabel>
        <Input type='text' placeholder='Create New User Name...' border={"1px"} ref={userNameInput}/>
        <FormLabel>Mobile Number</FormLabel>
        <Input type='number' placeholder='Enter Your Mobile Number...' border={"1px"} ref={mobileInput}/>
        <FormLabel>Password</FormLabel>
        <Input type='password' placeholder='Create A Strong Password...' border={"1px"} ref={passwordInput}/>
        <FormLabel>Confirm Password</FormLabel>
        <Input type='password' placeholder='Enter The Same Password Again... ' border={"1px"} ref={confirmPasswordInput}/>
        <Input m={"20px auto auto auto"} type="submit" border={"2px solid orange"} fontSize={"20px"} color={"orange.400"} fontWeight={"bold"}  />
      </form>
    </Box>
  )
}

export default Signup;