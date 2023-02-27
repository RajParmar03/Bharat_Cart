import React, { useEffect, useState } from 'react';
import { Box, Button, Flex, Grid, Heading, HStack, Spinner, Text, VStack } from '@chakra-ui/react';
import axios from 'axios';
import image from "../bagImage.jpg";
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { startError, startLoading, stopLoading } from '../Redux/stateManager/stateManager.action';
import Navbar from '../components/Navbar';
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

const getCartList = async (token) => {
  let cartItems = await axios.get(`${baseUrl}/cart/get`, {
    headers: {
      Authorization: token
    }
  });
  return cartItems.data;
};

const updateCartList = async (id, val) => {
  let updatedCart = await axios.patch(`${baseUrl}/cart/update/${id}`, { val });
  return updatedCart.data;
}

const deleteCartItem = async (id, token) => {
  let deletedItem = await axios.delete(`${baseUrl}/cart/delete/${id}`, {
    headers: {
      Authorization: token,
    }
  });
  return deletedItem.data;
}

const addToWishList = async (id, token) => {
  let wishListItem = await axios.post(`${baseUrl}/wishlist/add/${id}`, {}, {
    headers: {
      Authorization: token
    }
  });
  return wishListItem.data;
}

const updateProductstock = async (productId, amount) => {
  let response = await axios.patch(`${baseUrl}/product/updatestock/${productId}`, { amount });
  return response.data;
}


const Cart = () => {

  const [cartList, setCartList] = useState([]);
  const [amount, setAmount] = useState(0);
  const [wishListLoading, setWishListLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [currentItemId, setCurrentItemId] = useState("");
  const [totalProducts, setTotalProducts] = useState(0);

  const navigate = useNavigate();

  const loadingManager = useSelector(store => store.loadingManager);
  const dispatch = useDispatch();


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

  const handleQuantity = (id, productId, val) => {
    setCurrentItemId(id);
    setUpdateLoading(true);
    updateCartList(id, val).then((res) => {
      alert(res.message);
      updateProductstock(productId, -val).then((res) => {
        alert(res.message);
        getCartList(localStorage.getItem("token")).then((res) => {
          setCartList(res);
          setUpdateLoading(false);
        }).catch((error) => {
          setUpdateLoading(false);
        });
      }).catch((error) => {
        setUpdateLoading(false);
      });
    }).catch((error) => {
      setUpdateLoading(false);
    });
  }

  const handleAddToWishList = (id) => {
    setCurrentItemId(id);
    setWishListLoading(true);
    let token = localStorage.getItem("token");
    addToWishList(id, token).then((res) => {
      alert(res.message);
      setWishListLoading(false);
      navigate("/wishlist");
    }).catch((error) => {
      setWishListLoading(false);
    });
  }

  const handleDelete = (id, productId) => {
    setCurrentItemId(id);
    setDeleteLoading(true);
    let token = localStorage.getItem("token");
    deleteCartItem(id, token).then((res) => {
      alert(res.message);
      updateProductstock(productId, 1).then((res) => {
        alert(res.message);
        getCartList(localStorage.getItem("token")).then((res) => {
          setCartList(res);
          setDeleteLoading(false);
        }).catch((error) => {
          setDeleteLoading(false);
        });
      }).catch((error) => {
        setDeleteLoading(false);
      });
    }).catch((error) => {
      setDeleteLoading(false);
    });

  }

  const handleCheckout = () => {
    navigate(`/checkout`);
  }


  return (
    <>
      <Navbar />
      <Box m={"130px auto 30px auto"}>
        <Text textAlign={"left"} m={"auto auto 30px 30px"} fontSize={"30px"} color={"orange"}>CART LIST</Text>
        <Flex>
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
              <Grid templateColumns='repeat(1, 1fr)' gap={6} m={"auto 30px"} w={"50%"}>
                {
                  cartList.map((elem) => {
                    return (
                      <Box key={elem.title + elem.price + Math.random()} /*boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px"*/ border={"1px solid gray"} p={5}>
                        <HStack justifyContent={"space-around"} paddingBottom={"10px"} marginBottom={"20px"} borderBottom={"1px solid gray"} onClick={() => navigate(`/singleproduct/${elem.productId}`)}>
                          <Box w={"25%"}>
                            <img src={image} alt={elem.title} style={{ width: "100%" }} />
                          </Box>
                          <Box textAlign={"left"} w={"60%"}>
                            <Text fontSize={"25px"}>Title :- {elem.title}</Text>
                            <Text textDecoration="line-through" fontSize={"md"}>Value :- {elem.strike}</Text>
                            <Text fontSize={"md"}>Discount :- {elem.discount}</Text>
                            <Text fontSize={"lg"}>Price :- {elem.price}</Text>
                            <Text fontSize={"md"}>Main-Category :- {elem.main_category}</Text>
                            <Text fontSize={"md"}>Sub-Category :- {elem.sub_category}</Text>
                            <Text fontSize={"md"}>Quantity :- {elem.quantity}</Text>
                          </Box>
                        </HStack>
                        <HStack m={"10px auto auto auto"} justifyContent={"space-between"}>
                          {
                            currentItemId === elem.productId ?
                              <Button w={"50%"} border={"2px"} fontSize={"18px"} colorScheme="orange" variant='outline' isLoading={wishListLoading} loadingText={"Adding"} spinnerPlacement={"end"} onClick={() => handleAddToWishList(elem.productId)}>Add to WishList</Button>
                              :
                              <Button w={"50%"} border={"2px"} fontSize={"18px"} colorScheme="orange" variant='outline' onClick={() => handleAddToWishList(elem.productId)}>Add to WishList</Button>
                          }
                          {
                            currentItemId === elem._id ?
                              <Button w={"50%"} border={"2px"} fontSize={"18px"} colorScheme="orange" variant='outline' isLoading={deleteLoading} loadingText={"Deleting"} spinnerPlacement={"end"} onClick={() => handleDelete(elem._id, elem.productId)}>Delete</Button>
                              :
                              <Button w={"50%"} border={"2px"} fontSize={"18px"} colorScheme="orange" variant='outline' onClick={() => handleDelete(elem._id, elem.productId)}>Delete</Button>
                          }
                          <HStack justifyContent={"center"} w={"40%"}>
                            <button style={{
                              padding: "5px 20px",
                              border: "2px solid black",
                              fontSize: "20px",
                              fontWeight: "bold"
                            }} onClick={() => handleQuantity(elem._id, elem.productId, -1)} disabled={elem.quantity === 1}>-</button>
                            {
                              currentItemId === elem._id ?
                                <>
                                  {
                                    updateLoading ?
                                      <Box w={"20%"} textAlign={"center"}>
                                        <Spinner size='sm' />
                                      </Box>
                                      :
                                      <Text w={"20%"} fontSize={"25px"} fontWeight={"bold"} textAlign={"center"}>{elem.quantity}</Text>
                                  }
                                </>
                                :
                                <Text w={"20%"} textAlign={"center"} fontSize={"30px"}>{elem.quantity}</Text>
                            }
                            <button style={{
                              padding: "5px 20px",
                              border: "2px solid black",
                              fontSize: "20px",
                              fontWeight: "bold"
                            }} onClick={() => handleQuantity(elem._id, elem.productId, 1)}>+</button>
                          </HStack>
                        </HStack>
                      </Box>
                    )
                  })
                }
              </Grid>
          }
          <Box boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px" border={"1px solid gray"} w={"40%"} h={"300px"} paddingTop={"10px"}>
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
              <Button w={"50%"} border={"2px"} fontSize={"18px"} colorScheme="orange" variant='outline' onClick={() => handleCheckout()}>Proceed To Checkout</Button>
            </VStack>
          </Box>
        </Flex>
      </Box>
    </>
  )
}

export default Cart;