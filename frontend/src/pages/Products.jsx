import { Box, Button, Grid, Heading, Text, VStack } from '@chakra-ui/react';
import React from 'react'
import axios from "axios";
import { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const getData = async (category) => {
  let data = await axios.get(`http://localhost:1010/product?main_category=${category}`);
  // console.log(data);
  return data.data;
}

const Products = () => {

  const params = useParams();
  const [data, setData] = useState([]);


  useEffect(() => {
    getData(params.category).then((res) => {
      setData(res);
    });
  }, []);
  // console.log("this is params"  , params);

  return (
    <Grid templateColumns='repeat(5, 1fr)' gap={6} m={10} >
      {
        data.map((elem) => {
          return (
            <VStack key={elem.title + elem.price} boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px" p={5}>
              <Box h={"50px"}>
                <img src={elem.image1} alt={elem.title} style={{height:"100%"}} />
              </Box>
              <Heading as="h3" size='md'>Title :- {elem.title}</Heading>
              <Text textDecoration="line-through">Value :- {elem.strike}</Text>
              <Text>Price :- {elem.price}</Text>
              <Text>Discount :- {elem.discount}</Text>
              <Text>Main-Category :- {elem.main_category}</Text>
              <Button>Add to Cart</Button>
            </VStack>
          )
        })
      }
    </Grid>
  )
}

export default Products;