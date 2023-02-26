import { Box, Button, Flex, Image, Spacer, Text, useDisclosure } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from '@chakra-ui/react';

let baseUrl = process.env.REACT_APP_BASEURL;


const getUser = async (token) => {
  let user = await axios.get(`${baseUrl}/user/getuser`, {
    headers: {
      Authorization: token
    }
  });
  return user.data;
}

const SellerNavbar = () => {

  let [user, setUser] = useState({});
  const { isOpen, onOpen, onClose } = useDisclosure()

  const navigate = useNavigate();

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token) {
      getUser(localStorage.getItem("token")).then((res) => {
        setUser(res);
      }).catch((error) => {
        console.log(error);
      });
    }
  }, []);

  return (
    <Flex h={"50px"} w={"100%"} style={{ position: "fixed", top: "0" }} alignItems="center" backgroundColor={"orange.100"} justifyContent={"space-around"} paddingLeft={"20px"} paddingRight={"20px"}>
      <Box>
        <Text fontSize={"20px"} _hover={{ cursor: "pointer" }} onClick={() => navigate("/sellerdashboard")}>
          SELLER DASH-BOARD
        </Text>
      </Box>
      <Spacer />
      {
        user.role === "seller" ?
          <>
            <Flex h={"100%"} w={"7%"} justifyContent={"space-around"} alignItems={"center"} _hover={{ cursor: "pointer" }} onClick={() => onOpen()}>
              <Image h={"80%"} src={user.image} alt={"seller image"} />
              <Text fontSize={"20px"}>{user.name}</Text>
            </Flex>
            <Modal isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Seller Name : {user.name}</ModalHeader>
                <ModalCloseButton />
                <ModalBody textAlign={"center"}>
                  <Image h={"100px"} w={"100px"} m={"auto auto 30px auto"} src={user.image} alt={user.name} />
                  <TableContainer>
                    <Table variant='simple'>
                      {/* <TableCaption>Imperial to metric conversion factors</TableCaption> */}
                      <Tbody>
                        <Tr>
                          <Td color={"orange.400"}>Seler userName</Td>
                          <Td>{user.username}</Td>
                          
                        </Tr>
                        <Tr>
                          <Td color={"orange.400"}>Email</Td>
                          <Td>{user.email}</Td>
                          
                        </Tr>
                        <Tr>
                          <Td color={"orange.400"}>Mobile</Td>
                          <Td>{user.phone}</Td>
                          
                        </Tr>
                      </Tbody>
                    </Table>
                  </TableContainer>
                </ModalBody>
                <ModalFooter>
                  <Button colorScheme='blue' mr={3} onClick={onClose}>
                    Close
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </>
          :
          <Button onClick={() => navigate("/seller-login")}>Login</Button>
      }
    </Flex>
  )
}

export default SellerNavbar;