import React, { useRef } from 'react';
import { Box, Divider, Flex, FormLabel, Heading, Input, Select } from '@chakra-ui/react';
import axios from 'axios';
import image from "../userImage.png";

let baseUrl = process.env.REACT_APP_BASEURL;



const Signup = () => {

  const roleInput = useRef(null);
  const nameInput = useRef(null);
  const emailInput = useRef(null);
  const userNameInput = useRef(null);
  const passwordInput = useRef(null);
  const confirmPasswordInput = useRef(null);
  const mobileInput = useRef(null);
  const imageInput = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (passwordInput.current.value === confirmPasswordInput.current.value) {
      if(nameInput.current.value && userNameInput.current.value && emailInput.current.value && mobileInput.current.value && passwordInput.current.value){
        const userObject = {
          image : imageInput.current.value || image,
          name: nameInput.current.value,
          username: userNameInput.current.value,
          email: emailInput.current.value,
          phone: mobileInput.current.value,
          password: passwordInput.current.value,
          role : roleInput.current.value || "buyer"
        };
        let ans = await axios.post(`${baseUrl}/user/signup`, userObject);
        alert(ans.data.message);
      }else{
        alert("please enter all the filled...");
      }
    } else {
      alert("Enter the password properly...");
    }

  }


  return (
    <Box m={"130px auto 30px auto"}>
      <Heading as={"h1"} size={"2xl"} color="orange" m={"auto auto 30px auto"}>Create A New Account</Heading>
      <Divider />
      <Box m={"30px auto auto auto"} w={"30%"}>
        <form onSubmit={(e) => handleSubmit(e)}>
          <Flex justifyContent={"flex-end"}>
            <Box w={"40%"}>
              <FormLabel color={"orange"}>Select Role</FormLabel>
              <Select placeholder='Select role' ref={roleInput} border={"2px solid orange"}>
                <option value='seller'>Want to Start Selling My Products</option>
                <option value='buyer'>Want to Buy Some Products</option>
              </Select>
            </Box>
          </Flex>
          <FormLabel>Name</FormLabel>
          <Input type='text' placeholder='Enter Your Full Name...' border={"1px"} ref={nameInput} />
          <FormLabel>Email address</FormLabel>
          <Input type='email' placeholder='Enter Your Email...' border={"1px"} ref={emailInput} />
          <FormLabel>User Name</FormLabel>
          <Input type='text' placeholder='Create New User Name...' border={"1px"} ref={userNameInput} />
          <FormLabel>Mobile Number</FormLabel>
          <Input type='number' placeholder='Enter Your Mobile Number...' border={"1px"} ref={mobileInput} />
          <FormLabel>Image Url</FormLabel>
          <Input type='text' placeholder='Enter Your Image Url...' border={"1px"} ref={imageInput} />
          <FormLabel>Password</FormLabel>
          <Input type='password' placeholder='Create A Strong Password...' border={"1px"} ref={passwordInput} />
          <FormLabel>Confirm Password</FormLabel>
          <Input type='password' placeholder='Enter The Same Password Again... ' border={"1px"} ref={confirmPasswordInput} />
          <Input m={"20px auto auto auto"} type="submit" value="Sign-Up" border={"2px solid orange"} fontSize={"20px"} color={"orange.400"} fontWeight={"bold"} />
        </form>
      </Box>
    </Box>
  )
}

export default Signup;