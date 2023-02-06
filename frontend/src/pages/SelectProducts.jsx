import { Box, Button, Flex, Grid, Heading, Input, Text, VStack } from '@chakra-ui/react';
import axios from 'axios';
import React, { useRef, useState } from 'react'
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";

const getData = async (search) => {
    let data = await axios.get(`http://localhost:1010/product?search=${search}`);
    // console.log(data);
    return data.data;
}

const SelectProducts = () => {
    const navigate = useNavigate();
    const [val, setVal] = useState("");
    const [data, setData] = useState([]);
    const ID = useRef(null);

    const handleCategory = (category) => {
        navigate(`/products/${category}`);
    }

    useEffect(() => {
        if (ID.current) {
            clearTimeout(ID.current);
        }
        if (val) {
            ID.current = setTimeout(() => {
                getData(val).then((res) => {
                    setData(res);
                });
            }, 1500);
        }
    }, [val]);
    console.log(data);

    const handleChange = (value) => {
        setVal(value);
    };


    return (
        <>
            <Flex justifyContent={"space-around"} alignItems={"center"} m={"60px auto auto auto"} w={"60%"}>
                <Input onChange={(e) => handleChange(e.target.value)} w={"80%"} variant='filled' size='lg' placeholder='Search product here...'></Input>
                <Button fontSize={"20px"} colorScheme="red" variant='outline' border={"3px solid"}>
                    Search
                </Button>
            </Flex>
            {
                data.length ? <Grid templateColumns='repeat(5, 1fr)' gap={6} m={10} >
                    {
                        data.map((elem) => {
                            return (
                                <VStack key={elem.title + elem.price} boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px" p={5}>
                                    <Box h={"50px"}>
                                        <img src={elem.image1} alt={elem.title} style={{ height: "100%" }} />
                                    </Box>
                                    <Heading as="h3" size='md'>Title :- {elem.title}</Heading>
                                    <Text textDecoration="line-through">Value :- {elem.strike}</Text>
                                    <Text>Price :- {elem.price}</Text>
                                    <Text>Discount :- {elem.discount}</Text>
                                    <Text>Main-Category :- {elem.main_category}</Text>
                                    <Button>Add to Cart</Button>
                                </VStack>
                            )
                        })
                    }
                </Grid>
                    :
                    <Box m={"60px auto auto auto"} w={"70%"} h={"85%"}>
                        <Grid templateColumns='repeat(3, 1fr)' m={"auto"} p={"10px"} w={"70%"} gap={"50px"} h={"100%"}>
                            <Flex onClick={() => handleCategory("clothing")} borderRadius={"100px"} border={"10px solid orange"} fontSize={"25px"} fontWeight={"bold"} textAlign={"centre"} justifyContent={"center"} alignItems={"center"} h={"100%"} boxShadow="rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset">Clothing</Flex>
                            <Flex onClick={() => handleCategory("Educational")} borderRadius={"100px"} border={"10px solid orange"} fontSize={"25px"} fontWeight={"bold"} textAlign={"centre"} justifyContent={"center"} alignItems={"center"} h={"100%"} boxShadow="rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset"> Educational
                            </Flex>
                            <Flex onClick={() => handleCategory("Footwear")} borderRadius={"100px"} border={"10px solid orange"} fontSize={"25px"} fontWeight={"bold"} textAlign={"centre"} justifyContent={"center"} alignItems={"center"} h={"100%"} boxShadow="rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset">Footwear
                            </Flex>
                            <Flex onClick={() => handleCategory("Gadgets")} borderRadius={"100px"} border={"10px solid orange"} fontSize={"25px"} fontWeight={"bold"} textAlign={"centre"} justifyContent={"center"} alignItems={"center"} h={"100%"} boxShadow="rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset">Gadgets
                            </Flex>
                            <Flex onClick={() => handleCategory("Electronics")} borderRadius={"100px"} border={"10px solid orange"} fontSize={"25px"} fontWeight={"bold"} textAlign={"centre"} justifyContent={"center"} alignItems={"center"} h={"100%"} boxShadow="rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset">Electronics</Flex>
                        </Grid>
                    </Box>
            }
        </>
    )
}

export default SelectProducts;