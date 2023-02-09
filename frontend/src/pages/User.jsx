import React from 'react';
import { Box, Heading, Image, Text } from '@chakra-ui/react';
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';

const getUser = async (token) => {
  let user = await axios.get("http://localhost:1010/user/getuser",{
    headers :{
      Authorization : token
    }
  });
  return user.data;
}


const User = () => {

  const [user , setUser] = useState({});

  useEffect(()=>{
    getUser(localStorage.getItem("token")).then((res) => {
      setUser(res);
    });
  },[]);

  return (
    <Box m={"30px auto auto auto"} p={"30px"} w={"35%"} boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px">
      <Image src={user.image} alt="user" border={"5px solid orange"} borderRadius={"100px"} w={"50%"} m={"auto auto 30px auto"} boxShadow="rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset, rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px"/>
      <Text fontSize={"22px"} fontWeight={"bold"}><span style={{color:"orange",fontSize:"25px"}}>Name</span> : {user.name}</Text>
      <Text fontSize={"22px"} fontWeight={"bold"}><span style={{color:"orange",fontSize:"25px"}}>User Name</span> : {user.username}</Text>
      <Text fontSize={"22px"} fontWeight={"bold"}><span style={{color:"orange",fontSize:"25px"}}>Email</span> : {user.email}</Text>
      <Text fontSize={"22px"} fontWeight={"bold"}><span style={{color:"orange",fontSize:"25px"}}>Mobile Number</span> : {user.phone}</Text>
      <Text fontSize={"22px"} fontWeight={"bold"}><span style={{color:"orange",fontSize:"25px"}}>Role</span> : {user.role}</Text>
    </Box>
  )
}

export default User;