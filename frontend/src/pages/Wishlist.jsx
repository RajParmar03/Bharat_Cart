import React, { useEffect } from 'react';
import { Box, Button, Grid, Heading, Text, VStack } from '@chakra-ui/react';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import image from "../bagImage.jpg";



const getWishList = async (token) => {
  let wishlist = await axios.get("http://localhost:1010/wishlist/get", {
    headers: {
      Authorization: token
    }
  });
  return wishlist.data;
}

const removeItem = async (id, token) => {
  let wishlist = await axios.delete(`http://localhost:1010/wishlist/delete/${id}`, {
    headers: {
      Authorization: token
    }
  });
  return wishlist.data;
}


const Wishlist = () => {

  const [wishList, setWishList] = useState([]);
  const navigate = useNavigate();


  useEffect(() => {
    let token = localStorage.getItem("token");
    getWishList(token).then((res) => {
      setWishList(res);
    });
  }, []);

  const handleSingleProduct = (id) => {
    navigate(`/singleproduct/${id}`);
  }

  const handleRemove = (id) => {
    let token = localStorage.getItem("token");
    removeItem(id, token).then((res) => {
      alert(res.message);
      getWishList(token).then((res) => {
        setWishList(res);
      });
    })
  }




  return (
    <Box marginTop={10}>
      <Grid templateColumns='repeat(4, 1fr)' gap={6} m={10} >
        {
          wishList.map((elem) => {
            return (
              <VStack justifyContent={"center"} h={"500px"} key={elem.title + elem.price} boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px" p={3}>
                <VStack onClick={() => handleSingleProduct(elem._id)} h={"80%"}>
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
                <Button w={"50%"} paddingBottom={"3px"} border={"2px"} fontSize={"22px"} fontWeight={"bold"} colorScheme="orange" variant='outline' onClick={() => handleRemove(elem._id)}>Remove</Button>
              </VStack>
            )
          })
        }
      </Grid>
    </Box>
  )
}

export default Wishlist;