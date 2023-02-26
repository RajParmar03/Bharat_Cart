import { Box, Button, Divider, Flex, FormControl, FormLabel, Heading, HStack, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Spinner, Text, useDisclosure, VStack } from '@chakra-ui/react';
import axios from 'axios';
import React, { useRef } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { startError, startLoading, stopLoading } from '../Redux/stateManager/stateManager.action';
import Navbar from "../components/Navbar";
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
  } from '@chakra-ui/react'



let baseUrl = process.env.REACT_APP_BASEURL;


const getAddressOfUser = async (token) => {
    let addressList = await axios.get(`${baseUrl}/addresslist/getAddress`, {
        headers: {
            Authorization: token,
        }
    });
    return addressList.data;
}

const postAddress = async (addressObject, token) => {
    let response = await axios.post(`${baseUrl}/addresslist/add`, addressObject, {
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

const markAsDefaultAddress = async (id, token) => {
    let response = await axios.patch(`${baseUrl}/addresslist/markdefault`, { id }, {
        headers: {
            Authorization: token,
        }
    });
    return response.data;
}

const getCartList = async (token) => {
    let cartItems = await axios.get(`${baseUrl}/cart/get`, {
      headers: {
        Authorization: token
      }
    });
    return cartItems.data;
  };


const Checkout = () => {

    const [addressList, setAddressList] = useState([]);
    const [user, setUser] = useState({});
    const [totalProducts, setTotalProducts] = useState(0);
    const [amount, setAmount] = useState(0);
    const [cartList, setCartList] = useState([]);




    const navigate = useNavigate();

    const loadingManager = useSelector(store => store.loadingManager);
    const dispatch = useDispatch();



    const countryInput = useRef(null);
    const houseNoInput = useRef(null);
    const streetInput = useRef(null);
    const stateInput = useRef(null);
    const isDefaultInput = useRef(null);
    const pincodeInput = useRef(null);
    const cityInput = useRef(null);

    const { isOpen, onOpen, onClose } = useDisclosure()

    const initialRef = React.useRef(null);
    const finalRef = React.useRef(null);


    useEffect(() => {
        dispatch(startLoading());
        let token = localStorage.getItem("token");
        getAddressOfUser(token).then((res) => {
            setAddressList(res);
            dispatch(stopLoading());
        }).catch((error) => {
            dispatch(startError());
        });
    }, []);


    useEffect(() => {
        dispatch(startLoading());
        getUser(localStorage.getItem("token")).then((res) => {
            setUser(res);
            dispatch(stopLoading());
        }).catch((error) => {
            dispatch(startError());
        });
    }, []);

    useEffect(() => {
        dispatch(startLoading());
        let token = localStorage.getItem("token");
        getCartList(token).then((res) => {
          setCartList(res);
          dispatch(stopLoading());
        }).catch((error) => {
          dispatch(startError());
        });
      }, []);

    useEffect(() => {
        let total = cartList.reduce((acc, elem) => {
          return acc + elem.price * elem.quantity;
        }, 0);
        setAmount(total);
        let numberOfProducts = cartList.reduce((acc, elem) => {
          return acc + elem.quantity;
        }, 0);
        setTotalProducts(numberOfProducts);
      }, [cartList]);


    const handleSaveAddress = (e) => {
        e.preventDefault();
        let token = localStorage.getItem("token");
        if (houseNoInput.current.value && houseNoInput.current.value && cityInput.current.value && stateInput.current.value && countryInput.current.value && pincodeInput.current.value) {

            const addressObject = {
                houseNo: houseNoInput.current.value,
                street: streetInput.current.value,
                city: cityInput.current.value,
                state: stateInput.current.value,
                country: countryInput.current.value,
                pincode: pincodeInput.current.value,
                isDefault: isDefaultInput.current.checked
            };
            postAddress(addressObject, token).then((res) => {
                alert(res.message);
                getAddressOfUser(token).then((res) => {
                    setAddressList(res);
                    onClose();
                });
            });
        } else {
            alert("please fill all the field");
        }
    }

    const handleFinalCheckout = (id) => {
        const token = localStorage.getItem("token");
        markAsDefaultAddress(id, token).then((res) => {
            alert(res.message);
            navigate(`/billing`);
        }).catch((error) => {
            console.log(error);
        });
    }


    return (
        <>
            <Navbar />
            <Box m={"130px auto 30px auto"}>
                <Text fontSize={"30px"} textAlign={"left"} w={"95%"} m={"auto auto 20px auto"} color={"orange"}>Choose Your Address</Text>
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
                            <Divider />
                            <Flex>


                                {

                                    !addressList.length ?
                                        <>
                                            <Box>
                                                <Heading m={"30px auto"} as={"h2"} size={"lg"} color={"orange"}>There is no address of yours, please provide one</Heading>
                                                <Button w={"170px"} border={"2px"} fontSize={"16px"} fontWeight={"bold"} colorScheme="blue" variant='outline' onClick={onOpen} >+Add New Address</Button>
                                                <Modal
                                                    initialFocusRef={initialRef}
                                                    finalFocusRef={finalRef}
                                                    isOpen={isOpen}
                                                    onClose={onClose}
                                                    size={"3xl"}
                                                >
                                                    <ModalOverlay bg='blackAlpha.300'
                                                        backdropFilter='blur(10px) hue-rotate(90deg)' />
                                                    <ModalContent>
                                                        <ModalHeader color={"orange"}>Enter Address Details</ModalHeader>
                                                        <ModalCloseButton />
                                                        <ModalBody pb={6}>
                                                            <HStack justifyContent={"space-between"}>
                                                                <VStack>

                                                                    <FormControl mt={4}>
                                                                        <FormLabel>Flat, House no., Building, Company, Apartment</FormLabel>
                                                                        <Input type='text' placeholder='Enter Your House no...' border={"1px"} ref={houseNoInput} />
                                                                    </FormControl>
                                                                    <FormControl mt={4}>
                                                                        <FormLabel>Area, Street, Sector, Village</FormLabel>
                                                                        <Input type='text' placeholder='Enter street name...' border={"1px"} ref={streetInput} />
                                                                    </FormControl>
                                                                    <FormControl mt={4}>
                                                                        <FormLabel>Town/City</FormLabel>
                                                                        <Input type='text' placeholder='Enter Your city name...' border={"1px"} ref={cityInput} />
                                                                    </FormControl>
                                                                </VStack>
                                                                <VStack w={"300px"}>
                                                                    <FormControl mt={4}>
                                                                        <FormLabel>State</FormLabel>
                                                                        <Input type='text' placeholder='Create Your state name...' border={"1px"} ref={stateInput} />
                                                                    </FormControl>
                                                                    <FormControl mt={4}>
                                                                        <FormLabel>Country/Region</FormLabel>
                                                                        <Input type='text' placeholder='Enter Your Country name...' border={"1px"} ref={countryInput} />
                                                                    </FormControl>
                                                                    <FormControl mt={4}>
                                                                        <FormLabel>Pincode</FormLabel>
                                                                        <Input type='number' placeholder='Enter Your pincode...' border={"1px"} ref={pincodeInput} />
                                                                    </FormControl>
                                                                </VStack>
                                                            </HStack>
                                                            <HStack marginTop={"20px"}>
                                                                <input type='checkbox' placeholder='Enter The Same Password Again... ' border={"1px"} ref={isDefaultInput} />
                                                                <FormLabel>Make this my default address</FormLabel>
                                                            </HStack>
                                                        </ModalBody>
                                                        <ModalFooter>
                                                            <Button mr={3} border={"2px solid orange"} fontSize={"18px"} color={"orange.400"} fontWeight={"bold"} onClick={(e) => handleSaveAddress(e)}>
                                                                Save Address
                                                            </Button>
                                                            <Button onClick={onClose}>Cancel</Button>
                                                        </ModalFooter>
                                                    </ModalContent>
                                                </Modal>
                                            </Box>
                                        </>
                                        :
                                        <>
                                            <VStack w={"60%"}  m={"30px auto 30px auto"} textAlign={"start"}>

                                                <Box border={"1px solid gray"} w={"100%"} p={"10px 60px"} marginBottom={"30px"} textAlign={"start"}>
                                                    {
                                                        addressList.map((elem) => {
                                                            return (
                                                                <Box key={elem.street + elem.houseNumber + Math.random()}>
                                                                    <HStack margin={"20px auto"} justifyContent={"space-between"}>
                                                                        <VStack alignItems={"left"}>
                                                                            <Text>Name : {user.name}</Text>
                                                                            <Text>address : {elem.houseNo}{", "}{elem.street}{", "}{elem.city}</Text>
                                                                            <Text>{elem.state}{", "}{elem.country}{", "}{elem.pincode}</Text>
                                                                            <Text>phone no : {user.phone}</Text>
                                                                        </VStack>
                                                                        <Button w={"150px"} border={"2px"} fontSize={"16px"} colorScheme="orange" variant='outline' onClick={() => handleFinalCheckout(elem._id)}>Use this address</Button>
                                                                    </HStack>
                                                                    <Divider />
                                                                </Box>

                                                            )
                                                        })
                                                    }
                                                </Box>
                                                <Button w={"170px"} border={"2px"} fontSize={"16px"} fontWeight={"bold"} colorScheme="blue" variant='outline' onClick={onOpen} >+Add New Address</Button>
                                                <Modal
                                                    initialFocusRef={initialRef}
                                                    finalFocusRef={finalRef}
                                                    isOpen={isOpen}
                                                    onClose={onClose}
                                                    size={"3xl"}
                                                >
                                                    <ModalOverlay bg='blackAlpha.300'
                                                        backdropFilter='blur(10px) hue-rotate(90deg)' />
                                                    <ModalContent>
                                                        <ModalHeader color={"orange"}>Enter Address Details</ModalHeader>
                                                        <ModalCloseButton />
                                                        <ModalBody pb={6}>
                                                            <HStack justifyContent={"space-between"}>
                                                                <VStack>

                                                                    <FormControl mt={4}>
                                                                        <FormLabel>Flat, House no., Building, Company, Apartment</FormLabel>
                                                                        <Input type='text' placeholder='Enter Your House no...' border={"1px"} ref={houseNoInput} />
                                                                    </FormControl>
                                                                    <FormControl mt={4}>
                                                                        <FormLabel>Area, Street, Sector, Village</FormLabel>
                                                                        <Input type='text' placeholder='Enter street name...' border={"1px"} ref={streetInput} />
                                                                    </FormControl>
                                                                    <FormControl mt={4}>
                                                                        <FormLabel>Town/City</FormLabel>
                                                                        <Input type='text' placeholder='Enter Your city name...' border={"1px"} ref={cityInput} />
                                                                    </FormControl>
                                                                </VStack>
                                                                <VStack w={"300px"}>
                                                                    <FormControl mt={4}>
                                                                        <FormLabel>State</FormLabel>
                                                                        <Input type='text' placeholder='Create Your state name...' border={"1px"} ref={stateInput} />
                                                                    </FormControl>
                                                                    <FormControl mt={4}>
                                                                        <FormLabel>Country/Region</FormLabel>
                                                                        <Input type='text' placeholder='Enter Your Country name...' border={"1px"} ref={countryInput} />
                                                                    </FormControl>
                                                                    <FormControl mt={4}>
                                                                        <FormLabel>Pincode</FormLabel>
                                                                        <Input type='number' placeholder='Enter Your pincode...' border={"1px"} ref={pincodeInput} />
                                                                    </FormControl>
                                                                </VStack>
                                                            </HStack>
                                                            <HStack marginTop={"20px"}>
                                                                <input type='checkbox' placeholder='Enter The Same Password Again... ' border={"1px"} ref={isDefaultInput} />
                                                                <FormLabel>Make this my default address</FormLabel>
                                                            </HStack>
                                                        </ModalBody>
                                                        <ModalFooter>
                                                            <Button mr={3} border={"2px solid orange"} fontSize={"18px"} color={"orange.400"} fontWeight={"bold"} onClick={(e) => handleSaveAddress(e)}>
                                                                Save Address
                                                            </Button>

                                                            <Button onClick={onClose}>Cancel</Button>
                                                        </ModalFooter>
                                                    </ModalContent>
                                                </Modal>
                                            </VStack>
                                            <Box  m={"30px auto 30px auto"} border={"1px solid gray"} w={"30%"} h={"300px"} paddingTop={"10px"}>
                                                <VStack w={"100%"} h={"100%"}>
                                                    <Text fontSize={"30px"} borderBottom={"1px solid orange"} paddingBottom={"10px"} marginBottom={"10px"} color={"orange"}>Cart Summary</Text>
                                                    <TableContainer>
                                                        <Table variant='simple'>
                                                            <Tbody>
                                                                <Tr>
                                                                    <Td fontSize={"20px"}>Total Products : </Td>
                                                                    <Td fontSize={"20px"}>{totalProducts}</Td>
                                                                </Tr>
                                                                <Tr>
                                                                    <Td fontSize={"20px"}>Total Amount : </Td>
                                                                    <Td fontSize={"20px"}>{amount}</Td>
                                                                </Tr>
                                                            </Tbody>
                                                        </Table>
                                                    </TableContainer>
                                                </VStack>
                                            </Box>
                                        </>
                                }
                            </Flex>
                        </>
                }
            </Box >
        </>
    )
}

export default Checkout;










// import { Box, Button, Divider, FormControl, FormLabel, Heading, HStack, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure, VStack } from '@chakra-ui/react';
// import axios from 'axios';
// import React, { useRef } from 'react';
// import { useState } from 'react';
// import { useEffect } from 'react';


// const getAddressOfUser = async (token) => {
//     let addressList = await axios.get("http://localhost:1010/addresslist/getAddress", {
//         headers: {
//             Authorization: token,
//         }
//     });
//     return addressList.data;
// }

// const postAddress = async (addressObject, token) => {
//     let response = await axios.post("http://localhost:1010/addresslist/add", addressObject, {
//         headers: {
//             Authorization: token,
//         }
//     });
//     return response.data;
// }


// const Checkout = () => {

//     const [addressList, setAddressList] = useState([]);


//     const countryInput = useRef(null);
//     const houseNoInput = useRef(null);
//     const streetInput = useRef(null);
//     const stateInput = useRef(null);
//     const isDefaultInput = useRef(null);
//     const pincodeInput = useRef(null);
//     const cityInput = useRef(null);



//     useEffect(() => {
//         let token = localStorage.getItem("token");
//         getAddressOfUser(token).then((res) => {
//             setAddressList(res);
//         });
//     }, []);
//     console.log(addressList);

//     const handleSaveAddress = (e) => {
//         e.preventDefault();
//         let token = localStorage.getItem("token");
//         const addressObject = {
//             houseNo: houseNoInput.current.value,
//             street: streetInput.current.value,
//             city: cityInput.current.value,
//             state: stateInput.current.value,
//             country: countryInput.current.value,
//             pincode: pincodeInput.current.value,
//             isDefault: isDefaultInput.current.checked
//         };
//         postAddress(addressObject, token).then((res) => {
//             alert(res.message);
//         });
//     }


//     return (
//         <Box>
//             <Heading marginBottom={"20px"}>Checkout Page</Heading>
//             <Divider />
//             {

//                 !addressList.length ?
//                     <>
//                         <Box m={"30px auto auto auto"} w={"30%"}>
//                             <form onSubmit={(e) => handleSaveAddress(e)}>
//                                 <Heading marginBottom={"10px"} size={"md"} textDecoration={"underline"} color={"orange"} textAlign={"left"}>Add Delivery Address</Heading>
//                                 <FormLabel>Flat, House no., Building, Company, Apartment</FormLabel>
//                                 <Input type='text' placeholder='Enter Your House no...' border={"1px"} ref={houseNoInput} />
//                                 <FormLabel>Area, Street, Sector, Village</FormLabel>
//                                 <Input type='text' placeholder='Enter street name...' border={"1px"} ref={streetInput} />
//                                 <FormLabel>Town/City</FormLabel>
//                                 <Input type='text' placeholder='Enter Your city name...' border={"1px"} ref={cityInput} />
//                                 <FormLabel>State</FormLabel>
//                                 <Input type='text' placeholder='Create Your state name...' border={"1px"} ref={stateInput} />
//                                 <FormLabel>Country/Region</FormLabel>
//                                 <Input type='text' placeholder='Enter Your Country name...' border={"1px"} ref={countryInput} />
//                                 <FormLabel>Pincode</FormLabel>
//                                 <Input type='number' placeholder='Enter Your pincode...' border={"1px"} ref={pincodeInput} />
//                                 <HStack>
//                                     <input type='checkbox' placeholder='Enter The Same Password Again... ' border={"1px"} ref={isDefaultInput} />
//                                     <FormLabel>Make this my default address</FormLabel>
//                                 </HStack>
//                                 <Input m={"20px auto auto auto"} type="submit" value="Save Address" border={"2px solid orange"} fontSize={"20px"} color={"orange.400"} fontWeight={"bold"} />
//                             </form>
//                         </Box>
//                     </>
//                     :
//                     <>
//                         <Box boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px" w={"40%"} m={"auto auto 30px auto"} p={"10px"}>
//                             {
//                                 addressList.map((elem) => {
//                                     return (

//                                         <HStack key={elem.street + elem.houseNumber + Math.random()} justifyContent={"space-around"}>
//                                             <VStack>
//                                                 <Text>{elem.houseNo}{", "}{elem.street}{", "}{elem.city}</Text>
//                                                 <Text>{elem.state}{", "}{elem.country}{", "}{elem.pincode}</Text>
//                                             </VStack>
//                                             <Button w={"150px"} border={"2px"} fontSize={"16px"} fontWeight={"bold"} colorScheme="yellow" variant='outline'>Use this address</Button>
//                                         </HStack>

//                                     )
//                                 })
//                             }
//                         </Box>
//                         <Button w={"170px"} border={"2px"} fontSize={"16px"} fontWeight={"bold"} colorScheme="blue" variant='outline'>+Add New Address</Button>
//                     </>
//             }
//         </Box>
//     )
// }

// export default Checkout;