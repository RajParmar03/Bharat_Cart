import React from "react";
import { Box, Flex, Image } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";


export const OrderConfirmation = () => {
  const navigate = useNavigate();
  setTimeout(() => {
    navigate("/");
  }, 1500)

  return (
    <>
      <Navbar />
      <Box m={"130px auto 30px auto"}>
        <Flex
          flexDirection={"column"}
          justifyContent="center"
          alignItems={"center"}
          fontWeight="700"
          fontSize={30}
          marginBottom="50"
        >
          <Box w={400}>
            <Image src="https://static.vecteezy.com/system/resources/previews/006/900/704/original/green-tick-checkbox-illustration-isolated-on-white-background-free-vector.jpg" />
          </Box>
          <h1>Your order has been placed successfully</h1>
        </Flex>
      </Box>
    </>
  );
};