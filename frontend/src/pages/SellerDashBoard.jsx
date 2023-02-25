import { Box, Button, FormControl, FormLabel, Grid, Input, Text, useDisclosure, VStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react';
import axios from 'axios';
import SellerNavbar from "../components/SellerNavbar";
import { useNavigate } from 'react-router-dom';


let baseUrl = process.env.REACT_APP_BASEURL;


const addProduct = async (token, productObj) => {
    let response = await axios.post(`${baseUrl}/product/add`, productObj, {
        headers: {
            Authorization: token,
        }
    });

    return response.data;
}

const getUser = async (token) => {
    let user = await axios.get(`${baseUrl}/user/getuser`, {
        headers: {
            Authorization: token
        }
    });
    return user.data;
}

const getRevenue = async (token) => {
    let Revenue = await axios.get(`${baseUrl}/admin/getrevenue`, {
        headers: {
            Authorization: token
        }
    });
    // console.log("this is revenue" , Revenue);
    return Revenue.data;
}





const SellerDashBoard = () => {



    const navigate = useNavigate();

    let [user, setUser] = useState({});
    let [productsLength , setProductsLength] = useState(0);
    let [soldProuctLength , setSoldProductLength] = useState(0);
    let [revenue , setRevenue] = useState(0);
    
    const { isOpen, onOpen, onClose } = useDisclosure();

    const mainCategoryRef = React.useRef(null);
    const addCategoryDivRef = React.useRef(null);
    const subCategoryRef = React.useRef(null);
    const productTitleRef = React.useRef(null);
    const firstImageRef = React.useRef(null);
    const secondImageRef = React.useRef(null);
    const actualValueRef = React.useRef(null);
    const sellingPriceRef = React.useRef(null);
    const availableStokeRef = React.useRef(null);

    useEffect(() => {
        let token = localStorage.getItem("token");
        if (token) {
            getUser(localStorage.getItem("token")).then((res) => {
                setUser(res);
                setProductsLength(res.products.length);
                setSoldProductLength(res.sold.length);
            }).catch((error) => {
                console.log(error);
            });
        }
    }, []);

    useEffect(() => {
        let token = localStorage.getItem("token");
        if (token) {
            getRevenue(token).then((res) => {
                setRevenue(res.ans);
            }).catch((error) => {
                console.log(error);
            });
        }
    } , [])



 

    const handleAddProduct = () => {
        if (mainCategoryRef.current.value && subCategoryRef.current.value && productTitleRef.current.value && firstImageRef.current.value && secondImageRef.current.value && actualValueRef.current.value && sellingPriceRef.current.value && availableStokeRef.current.value) {

            let actualDiscount = (actualValueRef.current.value - sellingPriceRef.current.value);
            let percent = (actualDiscount * 100) / actualValueRef.current.value;
            let discount = `${Math.round(percent)}% , (-${actualDiscount})`;
            const token = localStorage.getItem("token");

            const productObj = {
                main_category: mainCategoryRef.current.value,
                sub_category: subCategoryRef.current.value,
                title: productTitleRef.current.value,
                image1: firstImageRef.current.value,
                image2: secondImageRef.current.value,
                price: sellingPriceRef.current.value,
                strike: actualValueRef.current.value,
                stocks: availableStokeRef.current.value,
                discount: discount,
                Product_add_time : Number(new Date().getTime())
            };
            addProduct(token, productObj).then((res) => {
                alert(res.message);
                getUser(localStorage.getItem("token")).then((res) => {
                    setProductsLength(res.products.length);
                }).catch((error) => {
                    console.log(error);
                });
                onClose();
            }).catch((error) => {
                console.log(error);
            });
        } else {
            alert("please provide all the details...");
        }
    }

    const handleGetProducts = () => {
        navigate("/sellerproducts");
    }

    return (

        <>
            <SellerNavbar />
            <Box m={"100px auto 30px auto"}>
                <Grid templateColumns='repeat(2, 1fr)' gap={6} m={10} h={"400px"} w={"60%"}>
                    <VStack border={"1px solid orange"} borderRadius={"5px"} _hover={{ cursor: "pointer" }} justifyContent={"center"}>
                        <Text fontSize={"20px"} borderBottom={"1px"}>Total Sold Product</Text>
                        <Text fontSize={"60px"}>{soldProuctLength}</Text>
                    </VStack>

                    <VStack border={"1px solid orange"} borderRadius={"5px"} onClick={() => handleGetProducts()} _hover={{ cursor: "pointer" }} justifyContent={"center"}>
                        <Text fontSize={"20px"} borderBottom={"1px"}>Number of products</Text>
                        <Text fontSize={"60px"}>{productsLength}</Text>
                    </VStack>

                    <VStack border={"1px solid orange"} borderRadius={"5px"} _hover={{ cursor: "pointer" }} justifyContent={"center"}>
                        <Text fontSize={"20px"} borderBottom={"1px"}>Total Revenue Generated</Text>
                        <Text fontSize={"60px"}>{revenue}</Text>
                    </VStack>
                    <VStack border={"1px solid orange"} borderRadius={"5px"} justifyContent={"center"} _hover={{ cursor: "pointer" }} ref={addCategoryDivRef} onClick={() => onOpen()}>
                        <Box fontSize={"60px"} p={0} m={0}>+</Box>
                        <Text fontSize={"20px"}>Want to Add new Product.</Text>
                    </VStack>
                    <Modal
                        initialFocusRef={mainCategoryRef}
                        finalFocusRef={addCategoryDivRef}
                        isOpen={isOpen}
                        onClose={onClose}
                        scrollBehavior={"inside"}
                    >
                        <ModalOverlay />
                        <ModalContent>
                            <ModalHeader>Enter Product Details</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody pb={6}>
                                <FormControl>
                                    <FormLabel>Main Category</FormLabel>
                                    <Input type={"text"} ref={mainCategoryRef} placeholder='Main Category' />
                                </FormControl>

                                <FormControl mt={4}>
                                    <FormLabel>Sub Category</FormLabel>
                                    <Input type={"text"} ref={subCategoryRef} placeholder='Sub Category' />
                                </FormControl>

                                <FormControl mt={4}>
                                    <FormLabel>Product Title</FormLabel>
                                    <Input type={"text"} ref={productTitleRef} placeholder='Product Title' />
                                </FormControl>

                                <FormControl mt={4}>
                                    <FormLabel>First Image Of Product</FormLabel>
                                    <Input type={"text"} ref={firstImageRef} placeholder='First Image Of Product' />
                                </FormControl>

                                <FormControl mt={4}>
                                    <FormLabel>Second Image Of Product</FormLabel>
                                    <Input type={"text"} ref={secondImageRef} placeholder='Second Image Of Product' />
                                </FormControl>

                                <FormControl mt={4}>
                                    <FormLabel>Actual Value Of Product</FormLabel>
                                    <Input type={"number"} ref={actualValueRef} placeholder='Actual Value Of Product' />
                                </FormControl>

                                <FormControl mt={4}>
                                    <FormLabel>Selling Price Of Product</FormLabel>
                                    <Input type={"number"} ref={sellingPriceRef} placeholder='Selling Price Of Product' />
                                </FormControl>

                                <FormControl mt={4}>
                                    <FormLabel>Available Stoke Of this Product</FormLabel>
                                    <Input type={"number"} ref={availableStokeRef} placeholder='Available Stoke Of this Product' />
                                </FormControl>


                            </ModalBody>

                            <ModalFooter>
                                <Button colorScheme='blue' mr={3} onClick={() => handleAddProduct()}>
                                    Save
                                </Button>
                                <Button onClick={onClose}>Cancel</Button>
                            </ModalFooter>
                        </ModalContent>
                    </Modal>
                </Grid>
            </Box>
        </>

    )
}

export default SellerDashBoard;