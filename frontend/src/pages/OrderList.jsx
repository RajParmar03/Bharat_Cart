import { Box, Button, Flex, Grid, Heading, HStack, Spinner, Text, VStack } from '@chakra-ui/react';
import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { startError, startLoading, stopLoading } from '../Redux/stateManager/stateManager.action';

let baseUrl = process.env.REACT_APP_BASEURL;

const getUserOrderList = async (token) => {
    let orderlist = await axios.get(`${baseUrl}/orderlist/get`, {
        headers: {
            Authorization: token
        }
    });
    return orderlist.data;
}

const OrderList = () => {

    const [orderList, setOrderList] = useState([]);

    const store = useSelector(store => store);
    const dispatch = useDispatch();

    useEffect(() => {
        let token = localStorage.getItem("token");
        getUserOrderList(token).then((res) => {
            setOrderList(res);
        }).catch((error) => {
            console.log(error);
        });
    }, []);
    console.log(orderList);



    return (
        <Box m={"130px auto 30px auto"}>
            <Heading textAlign={"left"} m={"auto auto 30px 30px"}>Order List</Heading>
            {
                store.isLoading ?
                    <Box w={"60%"}>
                        <Spinner
                            thickness='5px'
                            speed='0.5s'
                            emptyColor='gray.200'
                            color='blue.500'
                            size='xl'
                        />
                    </Box>
                    :
                    <Grid templateColumns='repeat(1, 1fr)' gap={6} m={"auto 30px"} w={"60%"}>
                        {
                            orderList.map((elem) => {
                                return (
                                    <Box key={elem.title + elem.price + Math.random()} boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px" p={5}>
                                        <HStack justifyContent={"space-around"} paddingBottom={"10px"} marginBottom={"20px"} borderBottom={"1px solid gray"}>
                                            <Box w={"25%"}>
                                                <img src={"/bagImage.jpg"} alt={elem.title} style={{ width: "100%" }} />
                                            </Box>
                                            <Box textAlign={"left"} w={"60%"}>
                                                <Heading as="h3" size='lg'>Title :- {elem.title}</Heading>
                                                <Text textDecoration="line-through" fontSize={"md"}>Value :- {elem.strike}</Text>
                                                <Text fontSize={"md"}>Discount :- {elem.discount}</Text>
                                                <Text fontSize={"lg"}>Price :- {elem.price}</Text>
                                                <Text fontSize={"md"}>Main-Category :- {elem.main_category}</Text>
                                                <Text fontSize={"md"}>Sub-Category :- {elem.sub_category}</Text>
                                                <Text fontSize={"md"}>Quantity :- {elem.quantity}</Text>
                                            </Box>
                                        </HStack>
                                    </Box>
                                )
                            })
                        }
                    </Grid>
            }
        </Box>
    )
}

export default OrderList;