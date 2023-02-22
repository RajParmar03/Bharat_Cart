import { Radio, Stack, Box, Divider, Heading, RadioGroup, Button, VStack, Text, HStack, Spinner } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { startError, startLoading, stopLoading } from '../Redux/stateManager/stateManager.action';


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
    <Box>
      <Heading m={"130px auto 30px auto"}>Select payment method</Heading>
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
        {
          loadingManager.isLoading ?
          <>
           <Box m={"130px auto 30px auto"} h={"400px"} w={"600px"} p={"5px 10px"}  >
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
          <Box h={"400px"} w={"600px"} p={"5px 10px"} boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px" m={"130px auto 30px auto"}>
          <VStack alignItems={"left"} marginBottom={"10px"}>
            <Heading borderBottom={"1px solid gray"} paddingBottom={"10px"} marginBottom={"10px"}>Delivery Address :-</Heading>
            <Text>Name : {user.name}</Text>
            <Text>address : {address.houseNo}{", "}{address.street}{", "}{address.city}</Text>
            <Text>{address.state}{", "}{address.country}{", "}{address.pincode}</Text>
            <Text>phone no : {user.phone}</Text>
          </VStack>
          <hr />
          <Box marginTop={"10px"}>
            <VStack w={"100%"} h={"100%"}>
              <Heading borderBottom={"1px solid gray"} paddingBottom={"10px"} marginBottom={"10px"}>Cart Summary :-</Heading>
              <Text fontSize={"2xl"}>Total Product :- {cartList.length} </Text>
              <Text fontSize={"2xl"}>Total Amount :- {amount}</Text>
            </VStack>
          </Box>
        </Box>
        }
      </HStack>
    </Box>
  )
}

export default Billing;