import { Box, Button, Flex, Grid, Heading, Select, Text, VStack } from '@chakra-ui/react';
import React from 'react'
import axios from "axios";
import { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import image from "../bagImage.jpg";


const getData = async (category) => {
  let data = await axios.get(`http://localhost:1010/product?main_category=${category}`);
  // console.log(data);
  return data.data;
}

const getFilterData = async (main_category, sub_category, sorting) => {
  let data = [];
  if (sorting) {
    if (sub_category) {
      data = await axios.get(`http://localhost:1010/product?main_category=${main_category}&sub_category=${sub_category}&sort=${sorting}`);
    } else {
      data = await axios.get(`http://localhost:1010/product?main_category=${main_category}&sort=${sorting}`);
    }
  } else {
    if (sub_category) {
      data = await axios.get(`http://localhost:1010/product?main_category=${main_category}&sub_category=${sub_category}`);
    } else {
      data = await axios.get(`http://localhost:1010/product?main_category=${main_category}`);
    }
  }
  return data.data;
}

const getSortData = async (main_category, sub_category, sorting) => {

  let data = [];
  if (sorting) {
    if (sub_category) {
      data = await axios.get(`http://localhost:1010/product?main_category=${main_category}&sub_category=${sub_category}&sort=${sorting}`);
    } else {
      data = await axios.get(`http://localhost:1010/product?main_category=${main_category}&sort=${sorting}`);
    }
  } else {
    if (sub_category) {
      data = await axios.get(`http://localhost:1010/product?main_category=${main_category}&sub_category=${sub_category}`);
    } else {
      data = await axios.get(`http://localhost:1010/product?main_category=${main_category}`);
    }
  }
  return data.data;
}

const Products = () => {

  const params = useParams();
  const [data, setData] = useState([]);
  const [length, setLength] = useState(0);
  const [subCategories, setSubCategories] = useState([]);
  const [currentSubCategory, setCurrentSubCategory] = useState("");
  const [currentSort, setCurrentSort] = useState("");

  const navigate = useNavigate();


  useEffect(() => {
    getData(params.category).then((res) => {
      setData(res);
    });
  }, []);

  useEffect(() => {
    data.map((elem) => {
      setSubCategories((subCategories) => {
        return (subCategories.length > 0 && subCategories.includes(elem.sub_category)) ? subCategories : [...subCategories, elem.sub_category];
      })
    });

    setLength(data.length);
  }, [data]);

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


  return (
    <>
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
            return (
              <VStack h={"500px"} key={elem.title + elem.price} boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px" p={3} onClick={() => handleSingleProduct(elem._id)}>
                <Box h={"60%"}>
                  <img src={image} alt={elem.title} style={{ height: "100%" }} />
                </Box>
                <Heading as="h3" size='md'>Title :- {elem.title}</Heading>
                <Text textDecoration="line-through">Value :- {elem.strike}</Text>
                <Text>Price :- {elem.price}</Text>
                {/* <Text>Discount :- {elem.discount}</Text> */}
                <Text>Main-Category :- {elem.main_category}</Text>
                <Text>Sub-Category :- {elem.sub_category}</Text>
              </VStack>
            )
          })
        }
      </Grid>
    </>
  )
}

export default Products;