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

const getSoldList = async (token) => {
    let soldList = await axios.get(`${baseUrl}/admin/getsoldlist`, {
        headers: {
            Authorization: token
        }
    });
    return soldList.data;
} 


const SellerSoldProducts = () => {

    let [user, setUser] = useState({});
    let [productsList, setProductsList] = useState([]);
    let [soldList , setSoldList] = useState([]);
    let [revenue , setRevenue] = useState(0);



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

    useEffect(() => {
        let token = localStorage.getItem("token");
        if (token) {
            getSoldList(token).then((res) => {
                setSoldList(res);
                let revenue = res.reduce((acc , elem) => {
                    return acc + elem.productPrice*elem.quantity;
                } , 0);
                setRevenue(revenue);
            }).catch((error) => {
                console.log(error);
            });
        }
    } , []);



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
                                <Th>Selling Price</Th>
                                <Th>Sold quantity</Th>
                                <Th>Revenue Generated</Th>
                                <Th>sold time</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {
                                soldList.length > 0 ?
                                    soldList.map((elem, i) => {
                                        return (
                                            <Tr key={elem.product.title + elem.product.main_category + i}>
                                                <Td>{i + 1}</Td>
                                                <Td>{elem.product.title}</Td>
                                                <Td>{elem.product.main_category}</Td>
                                                <Td>{elem.product.sub_category}</Td>
                                                <Td>{elem.product.price}</Td>
                                                <Td>{elem.quantity}</Td>
                                                <Td>{elem.quantity*elem.product.price}</Td>
                                                <Td>{new Date(elem.time).toUTCString()}</Td>
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
                                <Th fontSize={"18px"}>{revenue}</Th>
                                <Th></Th>
                            </Tr>
                        </Tfoot>
                    </Table>
                </TableContainer>
            </Box>
        </>
    )
}

export default SellerSoldProducts;