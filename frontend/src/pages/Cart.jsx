import React, { useEffect, useState } from 'react';
import { Box, Button, Flex, Grid, Heading, HStack, Spinner, Text, VStack } from '@chakra-ui/react';
import axios from 'axios';
import image from "../bagImage.jpg";
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { startError, startLoading, stopLoading } from '../Redux/stateManager/stateManager.action';


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


const Cart = () => {

  const [cartList, setCartList] = useState([]);
  const [amount, setAmount] = useState(0);
  const [wishListLoading, setWishListLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [currentItemId, setCurrentItemId] = useState("");
  const [totalProducts, setTotalProducts] = useState(0);

  const navigate = useNavigate();

  const store = useSelector(store => store);
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

  const handleQuantity = (id, val) => {
    setCurrentItemId(id);
    setUpdateLoading(true);
    updateCartList(id, val).then((res) => {
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

  const handleDelete = (id) => {
    setCurrentItemId(id);
    setDeleteLoading(true);
    let token = localStorage.getItem("token");
    deleteCartItem(id, token).then((res) => {
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

  }

  const handleCheckout = () => {
    navigate(`/checkout`);
  }


  return (
    <Box m={"130px auto 30px auto"}>
      <Heading textAlign={"left"} m={"auto auto 30px auto"}>Cart List</Heading>
      <Flex>
        {
          store.isLoading ?
            <Box w={"60%"}>
              <Spinner
                thickness='5px'
                speed='0.5s'
                emptyColor='gray.200'
                color='blue.500'
                size='xl'
              />
            </Box>
            :
            <Grid templateColumns='repeat(1, 1fr)' gap={6} m={"auto 30px"} w={"60%"}>
              {
                cartList.map((elem) => {
                  return (
                    <Box key={elem.title + elem.price + Math.random()} boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px" p={5}>
                      <HStack justifyContent={"space-around"} paddingBottom={"10px"} marginBottom={"20px"} borderBottom={"1px solid gray"}>
                        <Box w={"25%"}>
                          <img src={image} alt={elem.title} style={{ width: "100%" }} />
                        </Box>
                        <Box textAlign={"left"} w={"60%"}>
                          <Heading as="h3" size='lg'>Title :- {elem.title}</Heading>
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
                            <Button w={"50%"} border={"2px"} fontSize={"20px"} fontWeight={"bold"} colorScheme="orange" variant='outline' isLoading={wishListLoading} loadingText={"Adding"} spinnerPlacement={"end"} onClick={() => handleAddToWishList(elem.productId)}>Add to WishList</Button>
                            :
                            <Button w={"50%"} border={"2px"} fontSize={"20px"} fontWeight={"bold"} colorScheme="orange" variant='outline' onClick={() => handleAddToWishList(elem.productId)}>Add to WishList</Button>
                        }
                        {
                          currentItemId === elem._id ?
                            <Button w={"50%"} border={"2px"} fontSize={"20px"} fontWeight={"bold"} colorScheme="orange" variant='outline' isLoading={deleteLoading} loadingText={"Deleting"} spinnerPlacement={"end"} onClick={() => handleDelete(elem._id)}>Delete</Button>
                            :
                            <Button w={"50%"} border={"2px"} fontSize={"20px"} fontWeight={"bold"} colorScheme="orange" variant='outline' onClick={() => handleDelete(elem._id)}>Delete</Button>
                        }
                        <HStack justifyContent={"center"} w={"40%"}>
                          <button style={{
                            padding: "5px 20px",
                            border: "2px solid black",
                            fontSize: "20px",
                            fontWeight: "bold"
                          }} onClick={() => handleQuantity(elem._id, -1)} disabled={elem.quantity === 1}>-</button>
                          {
                            currentItemId === elem._id ?
                              <>
                                {
                                  updateLoading ?
                                    <Box w={"20%"}>
                                      <Spinner size='sm' />
                                    </Box>
                                    :
                                    <Text w={"20%"} fontSize={"25px"} fontWeight={"bold"}>{elem.quantity}</Text>
                                }
                              </>
                              :
                              <Text w={"20%"} fontSize={"25px"} fontWeight={"bold"}>{elem.quantity}</Text>
                          }
                          <button style={{
                            padding: "5px 20px",
                            border: "2px solid black",
                            fontSize: "20px",
                            fontWeight: "bold"
                          }} onClick={() => handleQuantity(elem._id, 1)}>+</button>
                        </HStack>
                      </HStack>
                    </Box>
                  )
                })
              }
            </Grid>
        }
        <Box boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px" w={"40%"} h={"300px"} paddingTop={"30px"}>
          <VStack w={"100%"} h={"100%"}>
            <Heading borderBottom={"1px solid gray"} paddingBottom={"10px"} marginBottom={"10px"}>Cart Summary :-</Heading>
            <Text fontSize={"2xl"}>Total Product :- {totalProducts} </Text>
            <Text fontSize={"2xl"}>Total Amount :- {amount}</Text>
            <Button w={"50%"} border={"2px"} fontSize={"20px"} fontWeight={"bold"} colorScheme="orange" variant='outline' onClick={() => handleCheckout()}>Proceed To Checkout</Button>
          </VStack>
        </Box>
      </Flex>
    </Box>
  )
}

export default Cart;