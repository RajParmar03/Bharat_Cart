import { Box, Flex, Heading, HStack, Spacer } from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';

const SellerNavbar = () => {
  return (
    <Box>
        <Flex h={"50px"} alignItems="center" backgroundColor={"orange.100"} justifyContent={"space-around"}>
        <Box>SELLER DASH-BOARD</Box>
        <Spacer />
        <Link to="/selectproducts"><HStack w={"120px"}><Heading as='h3' size='md'>All Products</Heading></HStack></Link>
        <Spacer />
        <Link to="/products/clothing"><HStack w={"100px"}><Heading as='h3' size='md'>Clothing</Heading></HStack></Link>
        <Spacer />
        <Link to="/products/Educational"><HStack w={"100px"}><Heading as='h3' size='md'>Educational</Heading></HStack></Link>
        <Spacer />
        <Link to="/products/Footwear"><HStack w={"100px"}><Heading as='h3' size='md'>Footwear</Heading></HStack></Link>
        <Spacer />
        <Link to="/products/Gadgets"><HStack w={"100px"}><Heading as='h3' size='md'>Gadgets</Heading></HStack></Link>
        <Spacer />
        <Link to="/products/Electronics"><HStack w={"100px"}><Heading as='h3' size='md'>Electronics</Heading></HStack></Link>
        <Spacer />
        <Link to="/about"><HStack w={"100px"}><Heading as='h3' size='md'>About Us</Heading></HStack></Link>
        <Spacer />
      </Flex>
    </Box>
  )
}

export default SellerNavbar;