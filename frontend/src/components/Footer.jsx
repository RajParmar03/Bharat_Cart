import { Box, Heading, HStack, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import { BsSuitHeartFill } from "react-icons/bs";

const Footer = () => {
    return (
        <Box paddingTop={"50px"} paddingBottom={"50px"} backgroundColor={"orange.100"}>
            <HStack margin={"auto"} w={"25%"} marginBottom={"50px"}><Heading size={"lg"}>Made with </Heading><BsSuitHeartFill size={"25px"} color='red' /> <Heading size={"lg"}>in India</Heading></HStack>
            <HStack margin={"auto"} w={"80%"} justifyContent={"space-around"}>
                <VStack>
                    <Text fontSize={"30px"} color={"gray"}>About Us</Text>
                    <Text fontSize={"30px"} color={"gray"}>Create An Account</Text>
                    <Text fontSize={"30px"} color={"gray"}>Home</Text>
                    <Text fontSize={"30px"} color={"gray"}>User</Text>
                </VStack>
                <VStack>
                    <Text fontSize={"30px"} color={"gray"}>Products</Text>
                    <Text fontSize={"30px"} color={"gray"}>Services</Text>
                    <Text fontSize={"30px"} color={"gray"}>Sell Your Products</Text>
                    <Text fontSize={"30px"} color={"gray"}>Motive</Text>
                </VStack>
                <VStack paddingTop={"50px"}>
                    <Text fontSize={"30px"} color={"gray"}>Contact Us</Text>
                    <Text fontSize={"30px"} color={"gray"}>Email</Text>
                    <Text fontSize={"30px"} color={"gray"}>Twitter</Text>
                    <Text fontSize={"30px"} color={"gray"}>Instagram</Text>
                    <Text fontSize={"30px"} color={"gray"}>Facebook</Text>
                </VStack>
                <VStack>
                    <Text fontSize={"30px"} color={"gray"}>Your Account</Text>
                    <Text fontSize={"30px"} color={"gray"}>FAQs</Text>
                    <Text fontSize={"30px"} color={"gray"}>Blog</Text>
                    <Text fontSize={"30px"} color={"gray"}>Our Investors</Text>
                </VStack>
            </HStack>
        </Box>
    )
}

export default Footer;