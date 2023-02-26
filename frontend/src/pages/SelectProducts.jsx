import { Box, Button, Divider, Flex, Grid, Heading, Input, Spinner, Text, VStack } from '@chakra-ui/react';
import axios from 'axios';
import React, { useRef, useState } from 'react'
import { useEffect } from 'react';
import { GoSearch } from 'react-icons/go';
import { GrClose } from 'react-icons/gr';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { startError, startLoading, stopLoading } from '../Redux/stateManager/stateManager.action';
import Star from './Star';
import Navbar from "../components/Navbar";


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
    }, []);

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


            <Navbar />
            <Flex justifyContent={"space-around"} alignItems={"center"} m={"140px auto 30px auto"} w={"60%"}>
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
                    <Box m={"50px auto 40px auto"} w={"30%"} textAlign={"center"}>
                        <Spinner
                            thickness='5px'
                            speed='0.5s'
                            emptyColor='gray.200'
                            color='blue.500'
                            size='xl'
                        />
                    </Box>
                    :
                    <Box>

                        {
                            data.length ? <Grid templateColumns='repeat(5, 1fr)' gap={6} m={10} >
                                {
                                    data.map((elem) => {
                                        return (
                                            <VStack key={elem.title + elem.price} boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px" p={5} _hover={{ cursor: "pointer" }}>
                                                <Box onClick={() => navigate(`/singleproduct/${elem._id}`)}>

                                                    <Box h={"100px"}>
                                                        <img src={"/bagImage.jpg"} alt={elem.title} style={{ height: "100%" , margin:"auto" }}  />
                                                    </Box>
                                                    <Text fontSize={"20px"} as="h3" size='md'>Title :- {elem.title}</Text>
                                                    <Star stars={elem.review.rating} size="18px" />
                                                    <Text textDecoration="line-through">Value :- {elem.strike}</Text>
                                                    <Text>Price :- {elem.price}</Text>
                                                    <Text>Discount :- {elem.discount}</Text>
                                                    <Text>Main-Category :- {elem.main_category}</Text>
                                                    <Text>Sub-Category :- {elem.sub_category}</Text>
                                                </Box>
                                            </VStack>
                                        )
                                    })
                                }
                            </Grid>
                                :
                                <Box m={"60px auto auto auto"} w={"70%"} h={"300px"}>
                                    <Text fontSize={"30px"} textAlign={"left"} m={"auto auto 30px 100px"}>Search Products via Category...</Text>
                                    <Grid templateColumns='repeat(1, 1fr)' m={"auto"} p={"10px"} w={"70%"} gap={"2px"} h={"80%"}>
                                        <Text onClick={() => handleCategory("clothing")} w={"40%"} borderRadius={"2px"} border={"0px solid orange"} fontSize={"20px"} textAlign={"centre"} justifyContent={"center"} alignItems={"center"} h={"100%"} _hover={{ cursor: "pointer", color: "orange", fontSize: "22px" }} color={"blue.600"}>Search for clothes...</Text>
                                        <Text onClick={() => handleCategory("Educational")} w={"40%"} borderRadius={"2px"} border={"0px solid orange"} fontSize={"20px"} textAlign={"centre"} justifyContent={"center"} alignItems={"center"} h={"100%"} _hover={{ cursor: "pointer", color: "orange", fontSize: "22px" }} color={"blue.600"}>Search for stationary...
                                        </Text>
                                        <Text onClick={() => handleCategory("Footwear")} w={"40%"} borderRadius={"2px"} border={"0px solid orange"} fontSize={"20px"} textAlign={"centre"} justifyContent={"center"} alignItems={"center"} h={"100%"} _hover={{ cursor: "pointer", color: "orange", fontSize: "22px" }} color={"blue.600"}>Search for footwear...
                                        </Text>
                                        <Text onClick={() => handleCategory("Gadgets")} w={"40%"} borderRadius={"2px"} border={"0px solid orange"} fontSize={"20px"} textAlign={"centre"} justifyContent={"center"} alignItems={"center"} h={"100%"} _hover={{ cursor: "pointer", color: "orange", fontSize: "22px" }} color={"blue.600"}>Search for gadgets...
                                        </Text>
                                        <Text onClick={() => handleCategory("Electronics")} w={"40%"} borderRadius={"2px"} border={"0px solid orange"} fontSize={"20px"} textAlign={"centre"} justifyContent={"center"} alignItems={"center"} h={"100%"} _hover={{ cursor: "pointer", color: "orange", fontSize: "22px" }} color={"blue.600"}>Search for electronics...</Text>
                                    </Grid>
                                </Box>
                        }
                    </Box>
            }
        </>


    )
}

export default SelectProducts;