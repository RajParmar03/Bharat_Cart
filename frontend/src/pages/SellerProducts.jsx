import React, { useEffect, useState } from 'react';
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
    Box,
    Image,
    useDisclosure,
    FormControl,
    FormLabel,
    Input,
} from '@chakra-ui/react'
import axios from 'axios';
import SellerNavbar from '../components/SellerNavbar';
import { MdOutlineModeEditOutline } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button
} from '@chakra-ui/react';

let baseUrl = process.env.REACT_APP_BASEURL;


const getProductsList = async (token) => {
    let productsList = await axios.get(`${baseUrl}/admin/getproducts`, {
        headers: {
            Authorization: token
        }
    });
    return productsList.data;
};

const getUser = async (token) => {
    let user = await axios.get(`${baseUrl}/user/getuser`, {
        headers: {
            Authorization: token
        }
    });
    return user.data;
}

const deleteProduct = async (id, token) => {
    let response = await axios.delete(`${baseUrl}/admin/delete/${id}`, {
        headers: {
            Authorization: token,
        }
    });

    return response.data;
}

const updateProduct = async (id, newProduct) => {
    let response = await axios.patch(`${baseUrl}/admin/update/${id}`, newProduct);

    return response.data;
}


const SellerProducts = () => {

    let [user, setUser] = useState({});
    let [productsList, setProductsList] = useState([]);

    const { isOpen, onOpen, onClose } = useDisclosure()

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
        getProductsList(token).then((res) => {
            setProductsList(res);
        }).catch((error) => {
            console.log(error);
        });
    }, []);
    useEffect(() => {
        let token = localStorage.getItem("token");
        if (token) {
            getUser(localStorage.getItem("token")).then((res) => {
                setUser(res);
            }).catch((error) => {
                console.log(error);
            });
        }
    }, []);

    const handleDelete = (id) => {
        let token = localStorage.getItem("token");
        deleteProduct(id, token).then((res) => {
            alert(res.message);
            getProductsList(token).then((res) => {
                setProductsList(res);
            }).catch((error) => {
                console.log(error);
            });
        }).catch((error) => {
            console.log(error);
        });
    };

    const handleEdit = (id) => {
        let updateObj = {};
        let inputArr = [mainCategoryRef.current.value, subCategoryRef.current.value, productTitleRef.current.value, firstImageRef.current.value, secondImageRef.current.value, actualValueRef.current.value, sellingPriceRef.current.value, availableStokeRef.current.value]
        for (let i = 0; i < inputArr.length; i++) {
            if (i === 0) {
                if (inputArr[i] !== null && inputArr[i] !== "" && inputArr[i] !== undefined) {
                    updateObj["main_category"] = inputArr[i];
                }
            }
            if (i === 1) {
                if (inputArr[i] !== null && inputArr[i] !== "" && inputArr[i] !== undefined) {
                    updateObj["sub_category"] = inputArr[i];
                }
            }
            if (i === 2) {
                if (inputArr[i] !== null && inputArr[i] !== "" && inputArr[i] !== undefined) {
                    updateObj["title"] = inputArr[i];
                }
            }
            if (i === 3) {
                if (inputArr[i] !== null && inputArr[i] !== "" && inputArr[i] !== undefined) {
                    updateObj["image1"] = inputArr[i];
                }
            }
            if (i === 4) {
                if (inputArr[i] !== null && inputArr[i] !== "" && inputArr[i] !== undefined) {
                    updateObj["image2"] = inputArr[i];
                }
            }
            if (i === 5) {
                if (inputArr[i] !== null && inputArr[i] !== "" && inputArr[i] !== undefined) {
                    updateObj["strike"] = inputArr[i];
                }
            }
            if (i === 6) {
                if (inputArr[i] !== null && inputArr[i] !== "" && inputArr[i] !== undefined) {
                    updateObj["price"] = inputArr[i];
                }
            }
            if (i === 7) {
                if (inputArr[i] !== null && inputArr[i] !== "" && inputArr[i] !== undefined) {
                    updateObj["stocks"] = inputArr[i];
                }
            }
        }
        let token = localStorage.getItem("token");
        updateProduct(id, updateObj).then((res) => {
            alert(res.message);
            getProductsList(token).then((res) => {
                setProductsList(res);
                onClose();
            }).catch((error) => {
                console.log(error);
            });
        }).catch((error) => {
            console.log(error);
        });
    };

    return (
        <>
            <SellerNavbar />
            <Box m={"100px auto 30px auto"}>
                <TableContainer>
                    <Table variant='simple'>
                        <TableCaption>Imperial to metric conversion factors</TableCaption>
                        <Thead>
                            <Tr>
                                <Th>Sr. NO</Th>
                                <Th>Product Title</Th>
                                <Th>Main Category</Th>
                                <Th>Sub Category</Th>
                                <Th>Actual Value</Th>
                                <Th>Selling Price</Th>
                                <Th>Discount</Th>
                                <Th>Stoke</Th>
                                <Th>image1</Th>
                                <Th>image2</Th>
                                <Th>Edit</Th>
                                <Th>Delete</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {
                                productsList.length > 0 ?
                                    productsList.map((elem, i) => {
                                        return (
                                            <Tr key={elem.title + elem.main_category + i}>
                                                <Td>{i + 1}</Td>
                                                <Td>{elem.title}</Td>
                                                <Td>{elem.main_category}</Td>
                                                <Td>{elem.sub_category}</Td>
                                                <Td>{elem.strike}</Td>
                                                <Td>{elem.price}</Td>
                                                <Td>{elem.discount}</Td>
                                                <Td>{elem.stocks}</Td>
                                                <Td><Image src={elem.image1} /></Td>
                                                <Td><Image src={elem.image2} /></Td>
                                                <Td _hover={{ cursor: "pointer", fontSize: "20px", color: "blue" }} onClick={() => onOpen()}><MdOutlineModeEditOutline /></Td>
                                                <Td _hover={{ cursor: "pointer", fontSize: "20px", color: "red" }} onClick={() => handleDelete(elem._id)}><RiDeleteBin6Line /></Td>
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
                                                            <Button colorScheme='blue' mr={3} onClick={() => handleEdit(elem._id)}>
                                                                Update
                                                            </Button>
                                                            <Button onClick={onClose}>Cancel</Button>
                                                        </ModalFooter>
                                                    </ModalContent>
                                                </Modal>
                                            </Tr>
                                        )
                                    })
                                    :
                                    <></>
                            }

                        </Tbody>
                        <Tfoot>
                            <Tr>
                                <Th>Total</Th>
                                <Th></Th>
                                <Th></Th>
                                <Th></Th>
                                <Th></Th>
                                <Th></Th>
                                <Th></Th>
                                <Th></Th>
                                <Th></Th>
                                <Th></Th>
                            </Tr>
                        </Tfoot>
                    </Table>
                </TableContainer>
            </Box>
        </>
    )
}

export default SellerProducts;