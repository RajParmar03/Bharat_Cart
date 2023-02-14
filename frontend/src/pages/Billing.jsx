import { Radio, Stack, Box, Divider, Heading, RadioGroup, Button, VStack, Text, HStack } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const getCartList = async (token) => {
  let cartItems = await axios.get("http://localhost:1010/cart/get", {
    headers: {
      Authorization: token
    }
  });
  return cartItems.data;
};

const Billing = () => {


  const [cartList, setCartList] = useState([]);
  const [amount, setAmount] = useState(0);
  const [ptype, setPtype] = useState("credit");

  const navigate = useNavigate();



  useEffect(() => {
    let token = localStorage.getItem("token");
    getCartList(token).then((res) => {
      setCartList(res);
    });
  }, []);


  useEffect(() => {
    let total = cartList.reduce((acc, elem) => {
      return acc + elem.price * elem.quantity;
    }, 0);
    setAmount(total);
  }, [cartList]);

  const handlePayment = () => {
    if(ptype === "cash"){
      navigate("/orderconfirmation");
    }else if(ptype === "credit"){
      navigate("/payment/12");
    }
  }




  return (
    <Box>
      <Heading m={"auto auto 30px auto"}>Select payment method</Heading>
      <Divider />
      <HStack justifyContent={"space-around"} m={" 30px auto 20px auto"}>
        <VStack w={"50%"} h={"300px"} boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px">

          <Box m={" 30px auto 20px auto"} >

            <Stack justifyContent={"space-around"} h={"150px"}>
              <HStack>
                <label>
                   <input type={"radio"} name="payment" value={"credit"} onChange={(e) => setPtype(e.target.value)} />
                  Pay with Debit/Credit/ATM Cards</label>
              </HStack>
              <HStack>
                <label>
                  <input type={"radio"} name="payment" value={"cash"} onChange={(e) => setPtype(e.target.value)} />
                  Cash On Delivery/Pay On Delivery</label>
              </HStack>
            </Stack>

          </Box>
          <Button mr={3} border={"2px solid orange"} fontSize={"18px"} color={"orange.400"} fontWeight={"bold"} onClick={() => handlePayment()}>Use this payment method</Button>
        </VStack>
        <Box boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px" w={"40%"} h={"300px"} paddingTop={"30px"} >
          <VStack w={"100%"} h={"100%"}>
            <Heading borderBottom={"1px solid gray"} paddingBottom={"10px"} marginBottom={"10px"}>Cart Summary :-</Heading>
            <Text fontSize={"2xl"}>Total Product :- {cartList.length} </Text>
            <Text fontSize={"2xl"}>Total Amount :- {amount}</Text>
          </VStack>
        </Box>
      </HStack>
    </Box>
  )
}

export default Billing;