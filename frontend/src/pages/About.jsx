import React from 'react';
import { Box, Divider, Heading, Text } from '@chakra-ui/react';

import Navbar from "../components/Navbar";



const About = () => {

  return (
    <>
      <Navbar />
      <Box m={"140px auto 30px auto"}>
        <Heading marginBottom={"30px"} textAlign={"center"}>About Us</Heading>
        <Divider />
        <Text w={"50%"} m={"30px auto"} textAlign={"center"} fontSize={"20px"}>
          Bharat Cart is the website on which users can purchase the product like clothing, footwear , electronic-items, and also some stationary products. And this website also gives accessibility to sell your own products. For that user have to create one seller account and then from that he/she able to upload his/her products on website and sell them.
        </Text>
        <Text w={"50%"} m={"30px auto"} textAlign={"center"} fontSize={"20px"}>
          Buyer can give the reviews and rating after purchasing the product. Which will help seller to improve his/her Product quality. And it is also benificiall for other user. Because by seeing reviews about the products he can easily decide either buy that product or not.
        </Text>
        <Text w={"50%"} m={"30px auto"} textAlign={"center"} fontSize={"20px"}>
          User can also save that product for buy it later. Just by clicking the small heart on that Product card. And he/she can able to all that product in wishlist.
        </Text>
      </Box>
    </>
  )
}

export default About;