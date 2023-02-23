import React, { useEffect } from 'react';
import { Box, Button, Grid, Heading, HStack, Spinner, Text, VStack } from '@chakra-ui/react';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import image from "../bagImage.jpg";
import { useDispatch, useSelector } from 'react-redux';
import { startError, startLoading, stopLoading } from '../Redux/stateManager/stateManager.action';
import Navbar from '../components/Navbar';


let baseUrl = process.env.REACT_APP_BASEURL;




const getWishList = async (token) => {
  let wishlist = await axios.get(`${baseUrl}/wishlist/get`, {
    headers: {
      Authorization: token
    }
  });
  return wishlist.data;
}

const removeItem = async (id, token) => {
  let wishlist = await axios.delete(`${baseUrl}/wishlist/delete/${id}`, {
    headers: {
      Authorization: token
    }
  });
  return wishlist.data;
}

const addProductToCart = async (cartItem, token) => {
  let ans = await axios.post(`${baseUrl}/cart/add`, cartItem, {
    headers: {
      Authorization: token,
    }
  });
  return ans.data;
}


const Wishlist = () => {

  const [wishList, setWishList] = useState([]);
  const [length, setLength] = useState(0);
  const [currentItemId, setCurrentItemId] = useState("");
  const [cartLoading, setCartLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);




  const navigate = useNavigate();


  const loadingManager = useSelector(store => store.loadingManager);
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(startLoading());
    let token = localStorage.getItem("token");
    getWishList(token).then((res) => {
      setWishList(res);
      setLength(res.length);
      dispatch(stopLoading());
    }).catch((error) => {
      dispatch(startError());
    });
  }, []);

  const handleSingleProduct = (id) => {
    navigate(`/singleproduct/${id}`);
  }

  const handleRemove = (id) => {
    setCurrentItemId(id);
    setDeleteLoading(true);
    let token = localStorage.getItem("token");
    removeItem(id, token).then((res) => {
      alert(res.message);
      getWishList(token).then((res) => {
        setWishList(res);
        setLength(res.length);
        setDeleteLoading(false);
      }).catch((error) => {
        setDeleteLoading(false);
      });
    }).catch((error) => {
      setDeleteLoading(false);
    });
  }

  const handleAddToCart = (product) => {
    setCurrentItemId(product._id);
    setCartLoading(true);
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
      if (res.isAdded) {
        removeItem(product._id, token).then((res) => {
          alert(res.message);
          getWishList(token).then((res) => {
            setWishList(res);
            setLength(res.length);
            setCartLoading(false);
            navigate("/cart");
          }).catch((error) => {
            setCartLoading(false);
          });
        }).catch((error) => {
          setCartLoading(false);
        });
      } else {
        setCartLoading(false);
        navigate("/cart");
      }
    }).catch((error) => {
      setCartLoading(false);
    });
  }



  return (

    <>
      <Navbar />

      <Box m={"130px auto 30px auto"} >
        <Box>
          <Heading textAlign={"right"} _hover={{ cursor: "pointer" }} as={"h3"} size={"md"} w={"97%"}>Total <span style={{ color: 'orange' }}>{length}</span> Products are in your wishlist.</Heading>
        </Box>
        {
          loadingManager.isLoading ?
            <Box m={"30px auto 130px auto"} >
              <Spinner
                thickness='5px'
                speed='0.5s'
                emptyColor='gray.200'
                color='blue.500'
                size='xl'
              />
            </Box>
            :

            <Grid templateColumns='repeat(4, 1fr)' gap={6} m={10} >
              {
                wishList.map((elem) => {
                  return (
                    <VStack justifyContent={"center"} h={"500px"} key={elem.title + elem.price} boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px" p={2}>
                      <VStack _hover={{ cursor: "pointer" }} onClick={() => handleSingleProduct(elem._id)} h={"80%"}>
                        <Box h={"50%"}>
                          <img src={image} alt={elem.title} style={{ height: "100%" }} />
                        </Box>
                        <Heading as="h3" size='md'>Title :- {elem.title}</Heading>
                        <Text textDecoration="line-through">Value :- {elem.strike}</Text>
                        <Text>Price :- {elem.price}</Text>
                        {/* <Text>Discount :- {elem.discount}</Text> */}
                        <Text>Main-Category :- {elem.main_category}</Text>
                        <Text>Sub-Category :- {elem.sub_category}</Text>
                      </VStack>
                      <HStack>
                        {
                          currentItemId === elem._id ?
                            <Button w={"50%"} border={"2px"} fontSize={"18px"} fontWeight={"bold"} colorScheme="orange" variant='outline' isLoading={cartLoading} loadingText={"Adding"} spinnerPlacement={"end"} onClick={() => handleAddToCart(elem)}>Add To Cart</Button>
                            :
                            <Button w={"50%"} border={"2px"} fontSize={"18px"} fontWeight={"bold"} colorScheme="orange" variant='outline' onClick={() => handleAddToCart(elem)}>Add To Cart</Button>
                        }
                        {
                          currentItemId === elem._id ?
                            <Button w={"50%"} border={"2px"} fontSize={"18px"} fontWeight={"bold"} colorScheme="orange" variant='outline' isLoading={deleteLoading} loadingText={"Removing"} spinnerPlacement={"end"} onClick={() => handleRemove(elem._id)}>Remove</Button>
                            :
                            <Button w={"50%"} border={"2px"} fontSize={"18px"} fontWeight={"bold"} colorScheme="orange" variant='outline' onClick={() => handleRemove(elem._id)}>Remove</Button>
                        }
                      </HStack>
                    </VStack>
                  )
                })
              }
            </Grid>
        }
      </Box >

    </>
  )
}

export default Wishlist;