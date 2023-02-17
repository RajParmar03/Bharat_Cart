import { Box, Button, Divider, Flex, Heading, HStack, Image, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Spacer, Text, useDisclosure, VStack } from '@chakra-ui/react';
import React, { useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { AiFillHome } from "react-icons/ai";
import { GrLogin } from "react-icons/gr";
import { FaRegUserCircle } from "react-icons/fa";
import { BsBookmarkHeart, BsCartCheck } from "react-icons/bs";
import { GoSearch } from "react-icons/go";
import { GrClose } from "react-icons/gr";
import { AiOutlineHeart } from "react-icons/ai";
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';

let baseUrl = process.env.REACT_APP_BASEURL;


const getData = async (mainCategory, search) => {
  let data = await axios.get(`${baseUrl}/product?main_category=${mainCategory}&search=${search}`);
  // console.log(data);
  return data.data;
}


const Navbar = () => {
  const [placeHolder, setPlaceHolder] = useState("Search BharatCart.in");
  const [mainCategory, setMainCategory] = useState("");
  const [val, setVal] = useState("");
  const [data, setData] = useState([]);
  const ID = useRef(null);

  const navigate = useNavigate();

  const handleFilter = (value) => {
    setPlaceHolder(`Search for ${value || "BharatCart.in"}`);
    setMainCategory(value);
    // getFilterData(value,).then((res) => {
    //   setData(res.data);
    //   setLength(res.data.length);
    // });
  }


  useEffect(() => {
    if (ID.current) {
      clearTimeout(ID.current);
    }
    if (val !== "") {
      ID.current = setTimeout(() => {
        getData(mainCategory, val).then((res) => {
          setData(res);
        });
      }, 1500);
    } else {
      setData([]);
    }
  }, [val]);


  const handleChange = (value) => {
    setVal(value);
  };


  const handleCancel = () => {
    setVal("");
    setData([]);
  }

  const handleSingleProduct = (id) => {
    setVal("");
    setData([]);
    navigate(`/singleproduct/${id}`);
  }

 


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
        <Select placeholder='All categories' border={"2px solid black"} w={"10%"} onChange={(e) => handleFilter(e.target.value)}>
          {
            ["clothing", "Educational", "Footwear", "Gadgets", "Electronics"].map((elem, i) => {
              return <option key={elem + i} value={elem}>{elem}</option>
            })
          }
          <option value=''>Clear</option>
        </Select>
        <VStack w={"40%"}>
          <HStack w={"100%"}>
            <Input value={val} onChange={(e) => handleChange(e.target.value)} w={"100%"} backgroundColor={"white"} placeholder={placeHolder} fontWeight={"bold"} border={"2px solid black"} marginTop={data.length ? "10px" : "0px"} />
            {
              data.length ?
                <Button style={{
                  position: "relative",
                  right: "45px",
                  top: "5px"
                }} variant={"unstyled"} zIndex={"1000"}><GrClose size={"20px"} onClick={() => handleCancel()} /></Button> :
                <Button style={{
                  position: "relative",
                  right: "45px",
                }} variant={"unstyled"} zIndex={"1000"}><GoSearch size={"20px"} /></Button>
            }
          </HStack>
          {
            data.length ?
              <Box style={{
                position: "fixed",
                top: "50px",
              }} zIndex={"1000"} h={"300px"} w={"39%"} p={"10px"} backgroundColor={"white"} border={"1px solid black"} overflow={"auto"}>
                {
                  data.map((elem) => {
                    return <Box m={"5px"} onClick={() => handleSingleProduct(elem._id)} borderRadius={"5px"} p={"10px"} h={"100px"} boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px">
                      <HStack h={"100%"}>
                        <Image h={"70%"} src={"/bagImage.jpg"} marginRight={"15px"}></Image>
                        <VStack alignItems={"flex-start"} >
                          <Text overflow={"auto"} textAlign={"left"}>Title :- {elem.title}</Text>
                          <Text>Category :- {elem.sub_category}</Text>
                        </VStack>
                      </HStack>
                    </Box>
                  })
                }
              </Box> : ""
          }
        </VStack>
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