import { Box, Button, Flex, Grid, Heading, HStack, Select, Spinner, Text, VStack } from '@chakra-ui/react';
import React from 'react'
import axios from "axios";
import { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import image from "../bagImage.jpg";
import { BsHeart } from "react-icons/bs";
import { BsFillHeartFill } from "react-icons/bs";
import { startError, startLoading, stopLoading } from '../Redux/stateManager/stateManager.action';

let baseUrl = process.env.REACT_APP_BASEURL;



const getData = async (category) => {
  let data = await axios.get(`${baseUrl}/product?main_category=${category}`);
  // console.log(data);
  return data.data;
}

const getFilterData = async (main_category, sub_category, sorting) => {
  let data = [];
  if (sorting) {
    if (sub_category) {
      data = await axios.get(`${baseUrl}/product?main_category=${main_category}&sub_category=${sub_category}&sort=${sorting}`);
    } else {
      data = await axios.get(`${baseUrl}/product?main_category=${main_category}&sort=${sorting}`);
    }
  } else {
    if (sub_category) {
      data = await axios.get(`${baseUrl}/product?main_category=${main_category}&sub_category=${sub_category}`);
    } else {
      data = await axios.get(`${baseUrl}/product?main_category=${main_category}`);
    }
  }
  return data.data;
}

const getSortData = async (main_category, sub_category, sorting) => {

  let data = [];
  if (sorting) {
    if (sub_category) {
      data = await axios.get(`${baseUrl}/product?main_category=${main_category}&sub_category=${sub_category}&sort=${sorting}`);
    } else {
      data = await axios.get(`${baseUrl}/product?main_category=${main_category}&sort=${sorting}`);
    }
  } else {
    if (sub_category) {
      data = await axios.get(`${baseUrl}/product?main_category=${main_category}&sub_category=${sub_category}`);
    } else {
      data = await axios.get(`${baseUrl}/product?main_category=${main_category}`);
    }
  }
  return data.data;
}

const addToWishList = async (id, token) => {
  let wishListItem = await axios.post(`${baseUrl}/wishlist/add/${id}`, {}, {
    headers: {
      Authorization: token
    }
  });
  return wishListItem.data;
}

const getWishList = async (token) => {
  let wishList = await axios.get(`${baseUrl}/wishlist/getwishlist`, {
    headers: {
      Authorization: token,
    }
  });
  return wishList.data;
}

const removeItem = async (id, token) => {
  let wishlist = await axios.delete(`${baseUrl}/wishlist/delete/${id}`, {
    headers: {
      Authorization: token
    }
  });
  return wishlist.data;
}

const Products = () => {

  const params = useParams();
  const [data, setData] = useState([]);
  const [length, setLength] = useState(0);
  const [subCategories, setSubCategories] = useState([]);
  const [currentSubCategory, setCurrentSubCategory] = useState("");
  const [currentSort, setCurrentSort] = useState("");
  const [wishList, setWishList] = useState([]);
  const [currentItem, setCurrentItem] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const loadingManager = useSelector(store => store.loadingManager);
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(startLoading());
    getData(params.category).then((res) => {
      setData(res.data);
      setLength(res.data.length);
      setSubCategories(res.sub);
      dispatch(stopLoading());
    }).catch((error) => {
      dispatch(startError());
    });
  }, [params.category]);

  useEffect(() => {
    dispatch(startLoading());
    let token = localStorage.getItem("token");
    getWishList(token).then((res) => {
      setWishList(res);
      dispatch(stopLoading());
    }).catch((error) => {
      dispatch(startError());
    });
  }, []);

  const handleSort = (value) => {
    dispatch(startLoading());
    setCurrentSort(value);
    getSortData(params.category, currentSubCategory, value).then((res) => {
      setData(res.data);
      setLength(res.data.length);
      dispatch(stopLoading());
    }).catch((error) => {
      dispatch(startError());
    });
  }

  const handleFilter = (value) => {
    dispatch(startLoading());
    setCurrentSubCategory(value);
    getFilterData(params.category, value, currentSort).then((res) => {
      setData(res.data);
      setLength(res.data.length);
      dispatch(stopLoading());
    }).catch((error) => {
      dispatch(startError());
    });
  }

  const handleSingleProduct = (id) => {
    navigate(`/singleproduct/${id}`);
  }

  const handleAddToWishList = (id) => {
    setCurrentItem(id);
    setLoading(true);
    let token = localStorage.getItem("token");
    addToWishList(id, token).then((res) => {
      alert(res.message);
      getWishList(token).then((res) => {
        setWishList(res);
        setLoading(false);
      }).catch((error) => {
        setLoading(false);
      });
    }).catch((error) => {
      setLoading(false);
    });
  }

  const handleRemoveWishlist = (id) => {
    setCurrentItem(id);
    setLoading(true);
    let token = localStorage.getItem("token");
    removeItem(id, token).then((res) => {
      alert(res.message);
      getWishList(token).then((res) => {
        setWishList(res);
        setLoading(false);
      }).catch((error) => {
        setLoading(false);
      });
    }).catch((error) => {
      setLoading(false);
    });
  }

  return (
    <Box m={"130px auto 30px auto"}>
      <Flex m={10} justifyContent={"space-between"}>
        <Flex justifyContent={"space-between"} w={"30%"}>
          <Select onChange={(e) => handleSort(e.target.value)} _hover={{ cursor: "pointer" }} placeholder='Price Sort' border={"2px solid orange"} w={"45%"}>
            <option value="LTH">Low to High</option>
            <option value="HTL">High to Low</option>
            <option value="">Clear</option>
          </Select>
          <Select onChange={(e) => handleFilter(e.target.value)} _hover={{ cursor: "pointer" }} placeholder='Category Filter' border={"2px solid orange"} w={"45%"}>
            {
              subCategories.map((elem, i) => {
                return <option key={elem + i} value={elem}>{elem}</option>
              })
            }
            <option value=''>Clear</option>
          </Select>
        </Flex>
        <Box>
          <Heading _hover={{ cursor: "pointer" }} as={"h3"} size={"md"}>Total <span style={{ color: 'orange' }}>{length}</span> Products are found.</Heading>
        </Box>
      </Flex>
      {
        loadingManager.isLoading ?
          <Spinner
            thickness='5px'
            speed='0.5s'
            emptyColor='gray.200'
            color='blue.500'
            size='xl'
          />
          :
          <Grid templateColumns='repeat(4, 1fr)' gap={6} m={10} >
            {
              data.map((elem) => {
                let isAdded = wishList.includes(elem._id);
                return (
                  <VStack h={"500px"} key={elem.title + elem.price} boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px" p={3}>
                    {
                      currentItem == elem._id ?
                        <>
                          {
                            loading ?
                              <Box marginLeft={"220px"} _hover={{ cursor: "pointer" }}>
                                <Spinner size='md' zIndex={1000} />
                              </Box>
                              :
                              <Box marginLeft={"220px"} _hover={{ cursor: "pointer" }} onClick={() => {
                                return isAdded ? handleRemoveWishlist(elem._id) : handleAddToWishList(elem._id)
                              }
                              }>
                                {
                                  isAdded ? <BsFillHeartFill size={"30px"} color={"orange"} /> : <BsHeart size={"30px"} color={"orange"} />
                                }
                              </Box>
                          }
                        </>
                        :
                        <Box marginLeft={"220px"} _hover={{ cursor: "pointer" }} onClick={() => {
                          return isAdded ? handleRemoveWishlist(elem._id) : handleAddToWishList(elem._id)
                        }
                        }>
                          {
                            isAdded ? <BsFillHeartFill size={"30px"} color={"orange"} /> : <BsHeart size={"30px"} color={"orange"} />
                          }
                        </Box>
                    }
                    <VStack _hover={{ cursor: "pointer" }} onClick={() => handleSingleProduct(elem._id)} h={"95%"}>
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
                  </VStack>
                )
              })
            }
          </Grid>
      }
    </Box>
  )
}

export default Products;