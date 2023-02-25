import React from 'react';
import { Box, Button, Heading, Image, Spinner, Text, VStack } from '@chakra-ui/react';
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { startLoading, stopLoading, startError } from "../Redux/stateManager/stateManager.action";
import {useNavigate} from "react-router"
import { logoutState } from '../Redux/authManager/authManager.action';
import { removeUserState } from '../Redux/userManager/userManager.action';
import Navbar from '../components/Navbar';

let baseUrl = process.env.REACT_APP_BASEURL;


const getUser = async (token) => {
  let user = await axios.get(`${baseUrl}/user/getuser`, {
    headers: {
      Authorization: token
    }
  });
  return user.data;
}


const User = () => {

  const [user, setUser] = useState({});

  const loadingManager = useSelector(store => store.loadingManager);
  const authManager = useSelector(store => store.authManager);
  const dispatch = useDispatch();
  console.log(authManager);

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(startLoading());
    getUser(localStorage.getItem("token")).then((res) => {
      setUser(res);
      dispatch(stopLoading());
    }).catch((error) => {
      dispatch(startError());
    });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(logoutState());
    dispatch(removeUserState());
    alert("logout successfully..");
    navigate("/login");
  }

  return (
    <>
      <Navbar />
      {
        loadingManager.isLoading ?
          <Box m={"130px auto 30px auto"} w={"35%"} >
            <Spinner
              thickness='5px'
              speed='0.5s'
              emptyColor='gray.200'
              color='blue.500'
              size='xl'
            />
          </Box>

          :
        <>
          <VStack m={"130px auto auto auto"} alignItems={"right"} w={"90%"}>
            <Button w={"10%"} onClick={() => handleLogout()}>Log-out</Button>
            <Button w={"10%"} onClick={() => navigate("/orderlist")}>Order-List</Button>
          </VStack>
          <Box m={"auto auto 30px auto"} p={"30px"} w={"35%"} boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px">
            <Image src={user.image} alt="user" border={"5px solid orange"} borderRadius={"100px"} w={"50%"} m={"auto auto 30px auto"} boxShadow="rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset, rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px" />
            <Text fontSize={"22px"} fontWeight={"bold"}><span style={{ color: "orange", fontSize: "25px" }}>Name</span> : {user.name}</Text>
            <Text fontSize={"22px"} fontWeight={"bold"}><span style={{ color: "orange", fontSize: "25px" }}>User Name</span> : {user.username}</Text>
            <Text fontSize={"22px"} fontWeight={"bold"}><span style={{ color: "orange", fontSize: "25px" }}>Email</span> : {user.email}</Text>
            <Text fontSize={"22px"} fontWeight={"bold"}><span style={{ color: "orange", fontSize: "25px" }}>Mobile Number</span> : {user.phone}</Text>
            <Text fontSize={"22px"} fontWeight={"bold"}><span style={{ color: "orange", fontSize: "25px" }}>Role</span> : {user.role}</Text>
          </Box>
        </>
      }
    </>
  )
}

export default User;