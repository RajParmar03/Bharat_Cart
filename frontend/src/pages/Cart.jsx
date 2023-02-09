import React, { useEffect, useState } from 'react';
import { Box, Button, Flex, Grid, Heading, HStack, Text, VStack } from '@chakra-ui/react';
import axios from 'axios';
import image from "../bagImage.jpg";

const getCartList = async (token) => {
  let cartItems = await axios.get("http://localhost:1010/cart/get", {
    headers: {
      Authorization: token
    }
  });
  return cartItems.data;
}


const Cart = () => {

  const [cartList, setCartList] = useState([]);

  useEffect(() => {
    let token = localStorage.getItem("token");
    getCartList(token).then((res) => {
      setCartList(res);
    });
  }, []);

  // useEffect(() => {
  //   cartList.reduce((elem) => {
  //     return elem.price
  //   }, 0);
  // },[cartList]);



  return (
    <Box m={"10px 30px"}>
      <Heading textAlign={"left"} m={"auto auto 30px auto"}>Cart List</Heading>
      <Flex>
        <Grid templateColumns='repeat(1, 1fr)' gap={6} m={"auto 30px"} w={"60%"}>
          {
            cartList.map((elem) => {
              return (
                <Box key={elem.title + elem.price + Math.random()} boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px" p={5}>
                  <HStack justifyContent={"space-around"} paddingBottom={"10px"} marginBottom={"20px"} borderBottom={"1px solid gray"}>
                    <Box w={"25%"}>
                      <img src={image} alt={elem.title} style={{ width: "100%" }} />
                    </Box>
                    <Box textAlign={"left"} w={"60%"}>
                      <Heading as="h3" size='lg'>Title :- {elem.title}</Heading>
                      <Text textDecoration="line-through" fontSize={"md"}>Value :- {elem.strike}</Text>
                      <Text fontSize={"md"}>Discount :- {elem.discount}</Text>
                      <Text fontSize={"lg"}>Price :- {elem.price}</Text>
                      <Text fontSize={"md"}>Main-Category :- {elem.main_category}</Text>
                      <Text fontSize={"md"}>Sub-Category :- {elem.sub_category}</Text>
                    </Box>
                  </HStack>
                  <HStack m={"10px auto auto auto"} justifyContent={"space-between"}>
                    <Button w={"50%"} border={"2px"} fontSize={"20px"} fontWeight={"bold"} colorScheme="orange" variant='outline'>Add to WishList</Button>
                    <HStack justifyContent={"center"} w={"40%"}>
                      <Button w={"30%"} border={"2px"} fontSize={"20px"} fontWeight={"bold"} colorScheme="orange" variant='outline'>-</Button>
                      <Text w={"10%"} fontSize={"25px"} fontWeight={"bold"}>0</Text>
                      <Button w={"30%"} border={"2px"} fontSize={"20px"} fontWeight={"bold"} colorScheme="orange" variant='outline' >+</Button>
                    </HStack>
                  </HStack>
                </Box>
              )
            })
          }
        </Grid>
        <Box boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px" w={"40%"} h={"400px"} paddingTop={"30px"}>
          <VStack w={"100%"} h={"70%"}>
            <Heading borderBottom={"1px solid gray"} paddingBottom={"10px"} marginBottom={"10px"}>Cart Summary :-</Heading>
            <Text fontSize={"2xl"}>Total Product :- {cartList.length} </Text>
            <Text fontSize={"2xl"}>Total Amount :- </Text>
            <Button w={"50%"} border={"2px"} fontSize={"20px"} fontWeight={"bold"} colorScheme="orange" variant='outline'>Proceed To Checkout </Button>
          </VStack>
        </Box>
      </Flex>
    </Box>
  )
}

export default Cart;