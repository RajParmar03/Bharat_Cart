import { Box, Button, Flex, Grid, Heading, HStack, Select, Text, VStack } from '@chakra-ui/react';
import React from 'react'
import axios from "axios";
import { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import image from "../bagImage.jpg";
import { BsHeart } from "react-icons/bs";
import {BsFillHeartFill} from "react-icons/bs";

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

const addToWishList = async (id , token) => {
  let wishListItem = await axios.post(`${baseUrl}/wishlist/add/${id}`,{},{
    headers : {
      Authorization : token
    }
  });
  return wishListItem.data;
}

const getWishList = async (token) => {
  let wishList = await axios.get(`${baseUrl}/wishlist/getwishlist` , {
    headers : {
      Authorization : token,
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
  const [wishList , setWishList] = useState([]);

  const navigate = useNavigate();


  useEffect(() => {
    getData(params.category).then((res) => {
      setData(res);
      setLength(res.length);
    });
  }, [params]);
  
  useEffect(() => {
    data.map((elem) => {
      setSubCategories((subCategories) => {
        return (subCategories.length > 0 && subCategories.includes(elem.sub_category)) ? subCategories : [...subCategories, elem.sub_category];
      })
    });
  }, []);

  useEffect(() => {
    let token = localStorage.getItem("token");
    getWishList(token).then((res) => {
      setWishList(res);
    });
  },[]);
  console.log("this is wishlist" , wishList);

  const handleSort = (value) => {
    setCurrentSort(value);
    getSortData(params.category, currentSubCategory, value).then((res) => {
      setData(res);
    });
  }

  const handleFilter = (value) => {
    setCurrentSubCategory(value);
    getFilterData(params.category, value, currentSort).then((res) => {
      setData(res);
    });
  }

  const handleSingleProduct = (id) => {
    navigate(`/singleproduct/${id}`);
  }

  const handleAddToWishList = (id) => {
    let token = localStorage.getItem("token");
    addToWishList(id , token).then((res) => {
      alert(res.message);
      getWishList(token).then((res) => {
        setWishList(res);
      });
    });
  }

  const handleRemoveWishlist = (id) => {
    console.log("in the handle remove wishlist function.");
    let token = localStorage.getItem("token");
    removeItem(id, token).then((res) => {
      alert(res.message);
      getWishList(token).then((res) => {
        setWishList(res);
      });
    });
  }

  return (
    <Box m={"130px auto 30px auto"}>
      <Flex m={10} justifyContent={"space-between"}>
        <Flex justifyContent={"space-between"} w={"30%"}>
          <Select onChange={(e) => handleSort(e.target.value)} placeholder='Price Sort' border={"2px solid orange"} w={"45%"}>
            <option value="LTH">Low to High</option>
            <option value="HTL">High to Low</option>
            <option value="">Clear</option>
          </Select>
          <Select onChange={(e) => handleFilter(e.target.value)} placeholder='Category Filter' border={"2px solid orange"} w={"45%"}>
            {
              subCategories.map((elem, i) => {
                return <option key={elem + i} value={elem}>{elem}</option>
              })
            }
            <option value=''>Clear</option>
          </Select>
        </Flex>
        <Box>
          <Heading as={"h3"} size={"md"}>Total <span style={{ color: 'orange' }}>{length}</span> Products are found.</Heading>
        </Box>
      </Flex>
      <Grid templateColumns='repeat(4, 1fr)' gap={6} m={10} >
        {
          data.map((elem) => {
            let isAdded = wishList.includes(elem._id);
            return (
              <VStack h={"500px"} key={elem.title + elem.price} boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px" p={3}>
                <Box marginLeft={"220px"} onClick={() => {
                  return isAdded?handleRemoveWishlist(elem._id):handleAddToWishList(elem._id)
                }
                }>
                  {
                    isAdded?<BsFillHeartFill size={"30px"} color={"orange"} />:<BsHeart size={"30px"} color={"orange"}/>
                  }
                  </Box>
                <VStack onClick={() => handleSingleProduct(elem._id)} h={"95%"}>
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
    </Box>
  )
}

export default Products;