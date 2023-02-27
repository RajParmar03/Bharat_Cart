import { Radio, Stack, Box, Divider, Heading, RadioGroup, Button, VStack, Text, HStack, Spinner, Center } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { startError, startLoading, stopLoading } from '../Redux/stateManager/stateManager.action';
import Navbar from "../components/Navbar";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from '@chakra-ui/react'



let baseUrl = process.env.REACT_APP_BASEURL;

const getCartList = async (token) => {
  let cartItems = await axios.get(`${baseUrl}/cart/get`, {
    headers: {
      Authorization: token
    }
  });
  return cartItems.data;
};

const getUser = async (token) => {
  let user = await axios.get(`${baseUrl}/user/getuser`, {
    headers: {
      Authorization: token
    }
  });
  return user.data;
}

const getAddressOfUser = async (token) => {
  let addressList = await axios.get(`${baseUrl}/addresslist/getAddress`, {
    headers: {
      Authorization: token,
    }
  });
  return addressList.data;
}

const Billing = () => {


  const [cartList, setCartList] = useState([]);
  const [amount, setAmount] = useState(0);
  const [ptype, setPtype] = useState("credit");
  const [address, setAddress] = useState({});
  const [user, setUser] = useState({});

  const navigate = useNavigate();

  const loadingManager = useSelector(store => store.loadingManager);
  const dispatch = useDispatch();



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
    if (ptype === "cash") {
      navigate("/orderconfirmation");
    } else if (ptype === "credit") {
      navigate("/payment/12");
    }
  }

  useEffect(() => {
    dispatch(startLoading());
    getUser(localStorage.getItem("token")).then((res) => {
      setUser(res);
      dispatch(stopLoading());
    }).catch((error) => {
      dispatch(startError());
    });
  }, []);

  useEffect(() => {
    dispatch(startLoading());
    let token = localStorage.getItem("token");
    getAddressOfUser(token).then((res) => {
      res.map((elem) => {
        if (elem.isDefault) {
          setAddress(elem);
        }
      });
      dispatch(stopLoading());
    }).catch((error) => {
      dispatch(startError());
    });
  }, []);





  return (
    <>
      <Navbar />
      <Box m={"130px auto 30px auto"}>
        <Text textAlign={"left"} m={"auto auto 30px 30px"} fontSize={"30px"} color={"orange"}>Select payment method</Text>
        <Divider />
        <HStack justifyContent={"space-around"} alignItems={"start"} m={"30px auto 20px auto"}>
          <VStack w={"50%"} h={"300px"} border={"1px solid gray"} boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px">

            <Box m={"30px auto 20px auto"}>

              <Stack justifyContent={"space-around"} h={"150px"}>
                <TableContainer>
                  <Table variant='simple'>
                    <Tbody>
                      <Tr>
                        <label style={{cursor:"pointer"}}>
                          <Td fontSize={"20px"}><input type={"radio"} name="payment" value={"credit"} onChange={(e) => setPtype(e.target.value)} /></Td>
                          <Td fontSize={"20px"}>Pay with Debit/Credit/ATM Cards</Td>
                        </label>
                      </Tr>
                      <Tr>
                        <label style={{cursor:"pointer"}}>
                          <Td fontSize={"20px"}><input type={"radio"} name="payment" value={"cash"} onChange={(e) => setPtype(e.target.value)} /></Td>
                          <Td fontSize={"20px"}>Cash On Delivery/Pay On Delivery</Td>
                        </label>
                      </Tr>
                    </Tbody>
                  </Table>
                </TableContainer>
              </Stack>

            </Box>
            <Button mr={3} border={"2px solid orange"} fontSize={"18px"} color={"orange.400"} onClick={() => handlePayment()}>Use this payment method</Button>
          </VStack>
          {
            loadingManager.isLoading ?
              <>
                <Box m={"50px auto 40px auto"} w={"30%"} textAlign={"center"}>
                  <Spinner
                    thickness='5px'
                    speed='0.5s'
                    emptyColor='gray.200'
                    color='blue.500'
                    size='xl'
                  />
                </Box>
              </>
              :
              <Box h={"450px"} w={"600px"} p={"10px 10px"} border={"1px solid gray"} boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px" m={"130px auto 30px auto"}>
                <VStack alignItems={"left"} marginBottom={"10px"} textAlign={"center"}>
                  <Text fontSize={"30px"} borderBottom={"1px solid orange"} paddingBottom={"10px"} marginBottom={"10px"} color={"orange"}>Delivery Address</Text>
                  <TableContainer>
                    <Table variant='simple'>
                      <Tbody>
                        <Tr>
                          <Td fontSize={"18px"}>{user.name}</Td>
                        </Tr>
                        <Tr>
                          <Td fontSize={"18px"}>{address.houseNo}{", "}{address.street}{", "}{address.city}{", "}{address.state}{", "}{address.country}{", "}{address.pincode}</Td>
                        </Tr>
                        <Tr>
                          <Td fontSize={"18px"}>{user.phone}</Td>
                        </Tr>
                      </Tbody>
                    </Table>
                  </TableContainer>
                </VStack>
                <Box marginTop={"10px"}>
                  <VStack w={"100%"} h={"100%"}>
                    <Text fontSize={"30px"} borderBottom={"1px solid orange"} paddingBottom={"10px"} marginBottom={"10px"} color={"orange"}>Cart Summary</Text>
                    <Text fontSize={"2xl"}>Total Product :- {cartList.length} </Text>
                    <Text fontSize={"2xl"}>Total Amount :- {amount}</Text>
                  </VStack>
                </Box>
              </Box>
          }
        </HStack>
      </Box>
    </>
  )
}

export default Billing;