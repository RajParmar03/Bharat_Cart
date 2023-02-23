import { Box, Button, Divider, Flex, Heading, HStack, Image, Spinner, Text, VStack } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import image from "../bagImage.jpg";
import { startError, startLoading, stopLoading } from '../Redux/stateManager/stateManager.action';

import { FaRegUserCircle } from "react-icons/fa";
import Star from './Star';
import Navbar from '../components/Navbar';

let baseUrl = process.env.REACT_APP_BASEURL;



const getProduct = async (id) => {
    let product = await axios.get(`${baseUrl}/product/${id}`);
    return product.data;
}

const addProductToCart = async (cartItem, token) => {
    let ans = await axios.post(`${baseUrl}/cart/add`, cartItem, {
        headers: {
            Authorization: token,
        }
    });
    return ans.data;
}

const updateProductstock = async(productId , amount) => {
    let response = await axios.patch(`${baseUrl}/product/updatestock/${productId}` , {amount});
    return response.data;
  }
  

const SingleProduct = () => {

    const params = useParams();

    const [product, setProduct] = useState({});
    const [loading, setLoading] = useState(false);
    const [rating , setRating] = useState(2.5);

    const loadingManager = useSelector(store => store.loadingManager);
    const dispatch = useDispatch();

    const navigate = useNavigate();

    useEffect(() => {
        dispatch(startLoading());
        getProduct(params.id).then((res) => {
            setProduct(res);
            dispatch(stopLoading());
        }).catch((error) => {
            dispatch(startError());
        });
    }, [params.id]);

    useEffect(() => {
        if(product.review){
            let numberOfReviews = product.review.length;
            if(numberOfReviews > 0){
                let newRating = product.review.reduce((acc , elem) => {
                    return acc + Number(elem.rating);
                } , 0);
                setRating(newRating/numberOfReviews);
            }
        }
    }, [product]);
   

    const handleAddToCart = (product) => {
        setLoading(true);
        let cartItem = {};
        for (let i in product) {
            if (i === "_id") {
                cartItem["productId"] = product["_id"];
                continue;
            }
            cartItem[i] = product[i];
        }
        cartItem.time = Number(new Date().getTime());
        let token = localStorage.getItem("token");
        addProductToCart(cartItem, token).then((res) => {
            alert(res.message);
            updateProductstock(cartItem.productId , -1).then((res) => {
                alert(res.message);
                setLoading(false);
                navigate("/cart");
            }).catch((error) => {
                setLoading(false);
            });
        }).catch((error) => {
            setLoading(false);
        });
    }

    return (
        <>
            <Navbar />
            {
                loadingManager.isLoading ?
                    <Box m={"130px auto 30px auto"}>
                        <Spinner
                            thickness='5px'
                            speed='0.5s'
                            emptyColor='gray.200'
                            color='blue.500'
                            size='xl'
                        />
                    </Box>
                    :
                    <>
                        <Flex boxShadow="rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px" alignItems={"center"} w={"80%"} h={"600px"} m={"130px auto 30px auto"} p={"20px"}>

                            <Box justifyContent={""} borderRight={"1px solid gray"} w={"50%"} h={"100%"}>
                                <Image src={image} alt={product.image1} w={"80%"} m={"auto auto 20px auto"} />
                                {/* <Heading as={"h3"} size={"md"} m={"auto auto 20px auto"} fontWeight={"bold"}>Main Category : {product.main_category}</Heading> */}
                                {/* <Heading as={"h3"} size={"md"} m={"auto auto 20px auto"} fontWeight={"bold"}>Sub Category : {product.sub_category}</Heading> */}

                            </Box>
                            <VStack justifyContent={"space-around"} h={"80%"} w={"50%"} p={"10px"}>
                                <Heading as={"h1"} size={"xl"}>Title : {product.title}</Heading>
                                <HStack>
                                <Star stars={rating} size="30px"/>
                                <Text>( {product.review?product.review.length:0} customer reviews)</Text>
                                </HStack>
                                <Heading as={"h3"} size={"md"} fontWeight={"bold"}>Real Price : {product.strike}</Heading>
                                <Heading as={"h3"} size={"md"} fontWeight={"bold"}>Discount : {product.discount}</Heading>
                                <Heading as={"h3"} size={"md"} fontWeight={"bold"}>Current Price : {product.price}</Heading>
                                <Text fontSize={"20px"}>Stock : {product.stocks}</Text>
                                <Button onClick={() => handleAddToCart(product)} isLoading={loading} loadingText='Adding' spinnerPlacement='end' fontSize={"20px"} fontWeight={"bold"} color={"orange"} p={"20px"} variant='outline' border={"5px solid orange"}>Add to Cart</Button>
                            </VStack>

                        </Flex>
                        <Heading textAlign={"left"} marginBottom={"20px"} marginLeft={"20px"}>Reviews of this product.</Heading>
                        <Box textAlign={"left"}>
                            {
                                product.review ?
                                    <>
                                        {
                                            product.review.map((elem,i) => {
                                                return (
                                                        <Box key={elem.userId+elem.headline+i} border={"1px solid gray"} borderRadius={"5px"} width={"50%"} marginBottom={"10px"} marginLeft={"20px"} padding={"5px"}>
                                                            <HStack h={"30px"}>
                                                                {
                                                                    elem.userImage?
                                                                    <Image src={elem.userImage} alt={elem.userName} h={"100%"} border={"1px solid gray"} borderRadius={"100px"}/>
                                                                    :
                                                                    <FaRegUserCircle size={"22px"}/>
                                                                }
                                                                <Text fontSize={"18px"}>{elem.userName}</Text>
                                                            </HStack>
                                                            <HStack>
                                                                <Star stars={elem.rating} size="18px" />
                                                                <Text fontWeight={"bold"}>{elem.headline}</Text>
                                                            </HStack>
                                                            <Text>{elem.review}</Text>
                                                        </Box>
                                                )
                                            })
                                        }
                                    </>
                                    :
                                    <>
                                    </>
                            }
                        </Box>
                    </>
            }
        </>
    )
}

export default SingleProduct;