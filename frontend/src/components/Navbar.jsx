import { Box, Button, Divider, Flex, Heading, HStack, Image, Input, Select, Spacer } from '@chakra-ui/react';
import React from 'react'
import { Link } from 'react-router-dom';
import { AiFillHome } from "react-icons/ai";
import { GrLogin } from "react-icons/gr";
import { FaRegUserCircle } from "react-icons/fa";
import { BsBookmarkHeart, BsCartCheck } from "react-icons/bs";
import { GoSearch } from "react-icons/go";
import {AiOutlineHeart} from "react-icons/ai";


const Navbar = () => {
  return (
    <Box backgroundColor={"orange.300"} style={{
      position: "fixed",
      top: "0",
      width: "100%",
      overflow: "auto",
    }} zIndex={"1000"}>

      <HStack h={"50px"} alignItems="center" paddingLeft={"30px"} paddingTop={"10px"} paddingRight={"30px"} marginBottom={"10px"} backgroundColor={"orange.300"} justifyContent={"space-around"}>
        <Link to="/">
          <Image src={"/BharatCart2.png"} alt={"BharatCart.png"} h={"50px"} border={"2px solid black"} />
        </Link>
        <Spacer />
        <Select placeholder='All categories' border={"2px solid black"} w={"10%"}>
          <option value="LTH">Low to High</option>
          <option value="HTL">High to Low</option>
          <option value="">Clear</option>
        </Select>
        <Input w={"30%"} backgroundColor={"white"} placeholder={"Search BharatCart.in"} fontWeight={"bold"} border={"2px solid black"} />
        <Button colorScheme={"black"} border={"2px"} variant={"outline"}><GoSearch size={"25px"} /></Button>
        <Spacer />
        <HStack>
          <Link to="/cart"><BsCartCheck size={"30px"} /></Link>
          <Spacer />
          <Link to="/user"><FaRegUserCircle size={"30px"} /></Link>
          <Spacer />
          <Link to="/login"><GrLogin size={"30px"} /></Link>
          <Spacer />
          <Link to="/wishlist"><HStack w={"100px"}><AiOutlineHeart size={"35px"} /></HStack></Link>
        </HStack>
      </HStack>
      <Divider />
      <Flex h={"50px"} alignItems="center" backgroundColor={"orange.100"} justifyContent={"space-around"}>
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

export default Navbar;