import { Box, Button, Divider, Flex, Heading, Image, Text, VStack } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import image from "../bagImage.jpg";

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

const SingleProduct = () => {

    const params = useParams();

    const [product, setProduct] = useState({});

    useEffect(() => {
        getProduct(params.id).then((res) => {
            setProduct(res);
        });
    }, []);

    const handleAddToCart = (product) => {
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
        addProductToCart(cartItem , token).then((res) => {
            alert(res.message);
        });
    }

    return (
        <Flex boxShadow="rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px" alignItems={"center"} w={"80%"} h={"600px"} m={"130px auto 30px auto"} p={"20px"}>

            <Box justifyContent={""} borderRight={"1px solid gray"} w={"50%"} h={"100%"}>
                <Image src={image} alt={product.image1} w={"80%"} m={"auto auto 20px auto"} />
                <Heading as={"h3"} size={"md"} m={"auto auto 20px auto"} fontWeight={"bold"}>Main Category : {product.main_category}</Heading>
                <Heading as={"h3"} size={"md"} m={"auto auto 20px auto"} fontWeight={"bold"}>Sub Category : {product.sub_category}</Heading>

            </Box>
            <VStack justifyContent={"space-around"} h={"80%"} w={"50%"} p={"10px"}>
                <Heading as={"h1"} size={"xl"}>Title : {product.title}</Heading>
                <Heading as={"h3"} size={"md"} fontWeight={"bold"}>Real Price : {product.strike}</Heading>
                <Heading as={"h3"} size={"md"} fontWeight={"bold"}>Discount : {product.discount}</Heading>
                <Heading as={"h3"} size={"md"} fontWeight={"bold"}>Current Price : {product.price}</Heading>
                <Button onClick={() => handleAddToCart(product)} fontSize={"20px"} fontWeight={"bold"} color={"orange"} p={"20px"} variant='outline' border={"5px solid orange"}>Add to Cart</Button>
            </VStack>

        </Flex>
    )
}

export default SingleProduct;