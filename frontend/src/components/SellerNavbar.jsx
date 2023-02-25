import { Box, Flex, Image, Spacer, Text } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

let baseUrl = process.env.REACT_APP_BASEURL;


const getUser = async (token) => {
  let user = await axios.get(`${baseUrl}/user/getuser`, {
      headers: {
          Authorization: token
      }
  });
  return user.data;
}

const SellerNavbar = () => {

  let [user, setUser] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token) {
      getUser(localStorage.getItem("token")).then((res) => {
        setUser(res);
      }).catch((error) => {
        console.log(error);
      });
    }
  }, []);

  return (
    <Flex h={"50px"} w={"100%"} style={{ position: "fixed", top: "0" }} alignItems="center" backgroundColor={"orange.100"} justifyContent={"space-around"} paddingLeft={"20px"} paddingRight={"20px"}>
      <Box>
        <Text fontSize={"20px"} _hover={{ cursor: "pointer" }} onClick={() => navigate("/sellerdashboard")}>
          SELLER DASH-BOARD
        </Text>
      </Box>
      <Spacer />
      <Flex h={"100%"} w={"7%"} justifyContent={"space-around"} alignItems={"center"} _hover={{ cursor: "pointer" }}>
        <Image h={"80%"} src={user.image} alt={"seller image"} />
        <Text fontSize={"20px"}>{user.name}</Text>
      </Flex>
    </Flex>
  )
}

export default SellerNavbar;