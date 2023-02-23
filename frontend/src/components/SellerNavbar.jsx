import { Box, Flex, Image, Spacer, Text } from '@chakra-ui/react';
import React from 'react';

const SellerNavbar = () => {
  return (
      <Flex h={"50px"} w={"100%"} style={{position:"fixed",top:"0"}}  alignItems="center" backgroundColor={"orange.100"} justifyContent={"space-around"} paddingLeft={"20px"} paddingRight={"20px"}>
        <Box>
          <Text fontSize={"20px"} _hover={{cursor:"pointer"}}>
            SELLER DASH-BOARD
          </Text>
        </Box>
        <Spacer />
        <Flex h={"100%"} w={"7%"} justifyContent={"space-around"} alignItems={"center"} _hover={{cursor:"pointer"}}>
          <Image h={"80%"} src={"/userImage.png"} alt={"seller image"} />
          <Text fontSize={"20px"}>User</Text>
        </Flex>
      </Flex>
  )
}

export default SellerNavbar;