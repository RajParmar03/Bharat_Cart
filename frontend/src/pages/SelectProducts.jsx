import { Box, Button, Divider, Flex, Grid, Heading, Input, Spinner, Text, VStack } from '@chakra-ui/react';
import axios from 'axios';
import React, { useRef, useState } from 'react'
import { useEffect } from 'react';
import { GoSearch } from 'react-icons/go';
import { GrClose } from 'react-icons/gr';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { startError, startLoading, stopLoading } from '../Redux/stateManager/stateManager.action';

let baseUrl = process.env.REACT_APP_BASEURL;


const getData = async (search) => {
    let data = await axios.get(`${baseUrl}/product?search=${search}`);
    // console.log(data);
    return data.data;
}

const SelectProducts = () => {
    const navigate = useNavigate();
    const [val, setVal] = useState("");
    const [data, setData] = useState([]);
    const ID = useRef(null);
    const searchRef = useRef(null);

    const loadingManager = useSelector(store => store.loadingManager);
    const dispatch = useDispatch();



    const handleCategory = (category) => {
        navigate(`/products/${category}`);
    }

    useEffect(() => {
        searchRef.current.focus();
      },[]);

    useEffect(() => {
        if (ID.current) {
            clearTimeout(ID.current);
        }
        if (val) {
            dispatch(startLoading());
            ID.current = setTimeout(() => {
                getData(val).then((res) => {
                    setData(res);
                    dispatch(stopLoading());
                }).catch((error) => {
                    dispatch(startError);
                });
            }, 1000);
        } else {
            setData([]);
            dispatch(stopLoading());

        }
    }, [val]);
    // console.log(data);

    const handleChange = (value) => {
        setVal(value);
    };

    const handleCancel = () => {
        setVal("");
        setData([]);
    }


    return (
        <>



            <Flex justifyContent={"space-around"} alignItems={"center"} m={"130px auto 30px auto"} w={"60%"}>
                <Input onChange={(e) => handleChange(e.target.value)} value={val} w={"80%"} variant='filled' size='lg' placeholder='Search product here...' ref={searchRef}></Input>
                {
                    loadingManager.isLoading ?
                        <Spinner size='sm' style={{
                            position: "relative",
                            right: "100px",
                        }} />
                        :
                        <>
                            {
                                data.length ?
                                    <Button style={{
                                        position: "relative",
                                        right: "100px",

                                    }} variant={"unstyled"} zIndex={"1000"}><GrClose size={"20px"} onClick={() => handleCancel()} /></Button> :
                                    <Button style={{
                                        position: "relative",
                                        right: "100px",
                                    }} variant={"unstyled"} zIndex={"1000"}><GoSearch size={"20px"} /></Button>
                            }
                        </>
                    // <Button style={{
                    //     position: "relative",
                    //     right: "100px",
                    // }} variant={"unstyled"}><GoSearch size={"20px"} /></Button>
                }
            </Flex>
            <Divider />
            {
                loadingManager.isLoading ?
                    <Spinner
                        thickness='5px'
                        speed='0.5s'
                        emptyColor='gray.200'
                        color='blue.500'
                        size='xl'
                    />
                    :
                    <Box>

                        {
                            data.length ? <Grid templateColumns='repeat(5, 1fr)' gap={6} m={10} >
                                {
                                    data.map((elem) => {
                                        return (
                                            <VStack key={elem.title + elem.price} boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px" p={5}>
                                                <Box h={"50px"}>
                                                    <img src={"/bagImage.jpg"} alt={elem.title} style={{ height: "100%" }} />
                                                </Box>
                                                <Heading as="h3" size='md'>Title :- {elem.title}</Heading>
                                                <Text textDecoration="line-through">Value :- {elem.strike}</Text>
                                                <Text>Price :- {elem.price}</Text>
                                                <Text>Discount :- {elem.discount}</Text>
                                                <Text>Main-Category :- {elem.main_category}</Text>
                                                <Text>Sub-Category :- {elem.sub_category}</Text>
                                                <Button>Add to Cart</Button>
                                            </VStack>
                                        )
                                    })
                                }
                            </Grid>
                                :
                                <Box m={"60px auto auto auto"} w={"70%"} h={"300px"}>
                                    <Heading as={"h1"} size="xl" textAlign={"left"} m={"auto auto 30px 100px"}>Search Products via Category...</Heading>
                                    <Grid templateColumns='repeat(3, 1fr)' m={"auto"} p={"10px"} w={"70%"} gap={"50px"} h={"80%"}>
                                        <Flex onClick={() => handleCategory("clothing")} borderRadius={"20px"} border={"7px solid orange"} fontSize={"25px"} fontWeight={"bold"} textAlign={"centre"} justifyContent={"center"} alignItems={"center"} h={"100%"} boxShadow="rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset">Clothing</Flex>
                                        <Flex onClick={() => handleCategory("Educational")} borderRadius={"20px"} border={"7px solid orange"} fontSize={"25px"} fontWeight={"bold"} textAlign={"centre"} justifyContent={"center"} alignItems={"center"} h={"100%"} boxShadow="rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset"> Educational
                                        </Flex>
                                        <Flex onClick={() => handleCategory("Footwear")} borderRadius={"20px"} border={"7px solid orange"} fontSize={"25px"} fontWeight={"bold"} textAlign={"centre"} justifyContent={"center"} alignItems={"center"} h={"100%"} boxShadow="rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset">Footwear
                                        </Flex>
                                        <Flex onClick={() => handleCategory("Gadgets")} borderRadius={"20px"} border={"7px solid orange"} fontSize={"25px"} fontWeight={"bold"} textAlign={"centre"} justifyContent={"center"} alignItems={"center"} h={"100%"} boxShadow="rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset">Gadgets
                                        </Flex>
                                        <Flex onClick={() => handleCategory("Electronics")} borderRadius={"20px"} border={"7px solid orange"} fontSize={"25px"} fontWeight={"bold"} textAlign={"centre"} justifyContent={"center"} alignItems={"center"} h={"100%"} boxShadow="rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset">Electronics</Flex>
                                    </Grid>
                                </Box>
                        }
                    </Box>
            }
        </>


    )
}

export default SelectProducts;