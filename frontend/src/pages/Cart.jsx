import React, { useEffect, useState } from 'react';
import { Box, Button, Flex, Grid, Heading, HStack, Text, VStack } from '@chakra-ui/react';
import axios from 'axios';
import image from "../bagImage.jpg";
import { useNavigate } from 'react-router-dom';

const getCartList = async (token) => {
  let cartItems = await axios.get("http://localhost:1010/cart/get", {
    headers: {
      Authorization: token
    }
  });
  return cartItems.data;
};

const updateCartList = async (id,val) => {
  let updatedCart = await axios.patch(`http://localhost:1010/cart/update/${id}`,{val});
  return updatedCart.data;
}

const deleteCartItem = async (id,token) => {
  let deletedItem = await axios.delete(`http://localhost:1010/cart/delete/${id}`,{
    headers : {
      Authorization : token,
    }
  });
  return deletedItem.data;
}

const addToWishList = async (id , token) => {
  let wishListItem = await axios.post(`http://localhost:1010/wishlist/add/${id}`,{},{
    headers : {
      Authorization : token
    }
  });
  return wishListItem.data;
}


const Cart = () => {

  const [cartList, setCartList] = useState([]);
  const [amount , setAmount] = useState(0);

  const navigate = useNavigate();


  useEffect(() => {
    let token = localStorage.getItem("token");
    getCartList(token).then((res) => {
      setCartList(res);
    });
  }, []);

  
  useEffect(() => {
    let total = cartList.reduce((acc , elem) => {
      return acc + elem.price * elem.quantity;
    }, 0);
    setAmount(total);
  },[cartList]);
  
  const handleQuantity = (id , val) => {
    updateCartList(id , val).then((res) => {
      alert(res.message);
      getCartList(localStorage.getItem("token")).then((res) => {
        setCartList(res);
      });
    });
  }
  
  const handleAddToWishList = (id) => {
    let token = localStorage.getItem("token");
    addToWishList(id , token).then((res) => {
      alert(res.message);
    });
  }
  
  const handleDelete = (id) => {
    let token = localStorage.getItem("token");
    deleteCartItem(id , token).then((res) => {
      alert(res.message);
      getCartList(localStorage.getItem("token")).then((res) => {
        setCartList(res);
      });
    });
    
  }

  const handleCheckout = () => {
    navigate(`/checkout`);
  }


  return (
    <Box m={"10px 30px"}>
      <Heading textAlign={"left"} m={"auto auto 30px auto"}>Cart List</Heading>
      <Flex>
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
                    <Button w={"50%"} border={"2px"} fontSize={"20px"} fontWeight={"bold"} colorScheme="orange" variant='outline' onClick={() => handleAddToWishList(elem.productId)}>Add to WishList</Button>
                    <Button w={"50%"} border={"2px"} fontSize={"20px"} fontWeight={"bold"} colorScheme="orange" variant='outline' onClick={() => handleDelete(elem._id)}>Delete</Button>
                    <HStack justifyContent={"center"} w={"40%"}>
                      <Button w={"30%"} border={"2px"} fontSize={"20px"} fontWeight={"bold"} colorScheme="orange" variant='outline' onClick={() => handleQuantity(elem._id , -1)} disabled={elem.quantity === 1}>-</Button>
                      <Text w={"20%"} fontSize={"25px"} fontWeight={"bold"}>{elem.quantity}</Text>
                      <Button w={"30%"} border={"2px"} fontSize={"20px"} fontWeight={"bold"} colorScheme="orange" variant='outline' onClick={() => handleQuantity(elem._id , 1)}>+</Button>
                    </HStack>
                  </HStack>
                </Box>
              )
            })
          }
        </Grid>
        <Box boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px" w={"40%"} h={"300px"} paddingTop={"30px"}>
          <VStack w={"100%"} h={"100%"}>
            <Heading borderBottom={"1px solid gray"} paddingBottom={"10px"} marginBottom={"10px"}>Cart Summary :-</Heading>
            <Text fontSize={"2xl"}>Total Product :- {cartList.length} </Text>
            <Text fontSize={"2xl"}>Total Amount :- {amount}</Text>
            <Button w={"50%"} border={"2px"} fontSize={"20px"} fontWeight={"bold"} colorScheme="orange" variant='outline' onClick={() => handleCheckout()}>Proceed To Checkout</Button>
          </VStack>
        </Box>
      </Flex>
    </Box>
  )
}

export default Cart;