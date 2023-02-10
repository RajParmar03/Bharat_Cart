import { Box, Heading, Text } from '@chakra-ui/react';
import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';


const getAddressOfUser = async (token) => {
    let addressList = await axios.get("http://localhost:1010/user/getAddress" , {
        headers : {
            Authorization : token,
        }
    });
    return addressList.data;
}


const Checkout = () => {

    const [addressList , setAddressList] = useState([]);

    useEffect(() => {
        let token = localStorage.getItem("token");
        getAddressOfUser(token).then((res) => {
            setAddressList(res);
        });
    } , []);
    console.log(addressList);



  return (
    <Box>
        <Heading>Checkout Page</Heading>
    </Box>
  )
}

export default Checkout;