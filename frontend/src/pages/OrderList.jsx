import {
    Box, Button, Flex, Grid, Heading, HStack, Spinner, Text, VStack, Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    FormControl,
    Input,
    FormLabel,
} from '@chakra-ui/react';
import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { startError, startLoading, stopLoading } from '../Redux/stateManager/stateManager.action';
import { useNavigate } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import Navbar from "../components/Navbar";



let baseUrl = process.env.REACT_APP_BASEURL;

const getUserOrderList = async (token) => {
    let orderlist = await axios.get(`${baseUrl}/orderlist/get`, {
        headers: {
            Authorization: token
        }
    });
    return orderlist.data;
}

const getUser = async (token) => {
    let user = await axios.get(`${baseUrl}/user/getuser`, {
        headers: {
            Authorization: token
        }
    });
    return user.data;
}

const saveReview = async (id, reviewObj) => {
    let response = await axios.patch(`${baseUrl}/product/addreview/${id}`, reviewObj);
    return response.data;
}

const OrderList = () => {

    const [orderList, setOrderList] = useState([]);
    const [user, setUser] = useState({});
    const [rating, setRating] = useState(0);

    const navigate = useNavigate();

    const loadingManager = useSelector(store => store.loadingManager);
    const dispatch = useDispatch();

    const { isOpen, onOpen, onClose } = useDisclosure()

    const ratingRef = React.useRef(null);
    const headLineRef = React.useRef(null);
    const reviewRef = React.useRef(null);
    const buttonRef = React.useRef(null);

    useEffect(() => {
        dispatch(startLoading());
        let token = localStorage.getItem("token");
        getUserOrderList(token).then((res) => {
            setOrderList(res);
            dispatch(stopLoading());
        }).catch((error) => {
            console.log(error);
            dispatch(startError());
        });
    }, []);

    useEffect(() => {
        dispatch(startLoading());
        getUser(localStorage.getItem("token")).then((res) => {
            setUser(res);
            dispatch(stopLoading());
        }).catch((error) => {
            dispatch(startError());
        });
    }, []);

    const handleSubmit = (id) => {
        if (reviewRef.current.value && ratingRef.current.value && headLineRef.current.value) {

            let reviewObj = {
                userId: user._id,
                userName: user.name,
                userImage: user.image,
                rating: ratingRef.current.value,
                headline: headLineRef.current.value,
                review: reviewRef.current.value
            };
            saveReview(id, reviewObj).then((res) => {
                onClose();
                alert(res.message);
                navigate(`/singleproduct/${id}`);
            }).catch((error) => {
                console.log(error);
            });
        } else {
            alert("please fill all the fields..");
        }
    }

    const ratingChanged = (newRating) => {
        ratingRef.current.value = newRating;
    };





    return (
        <>
            <Navbar />
            <Box m={"130px auto 30px auto"}>
                <Heading textAlign={"left"} m={"auto auto 30px 30px"}>Order List</Heading>
                {
                    loadingManager.isLoading ?
                        <Box w={"60%"}>
                            <Spinner
                                thickness='5px'
                                speed='0.5s'
                                emptyColor='gray.200'
                                color='blue.500'
                                size='xl'
                            />
                        </Box>
                        :
                        <Grid templateColumns='repeat(1, 1fr)' gap={6} m={"auto 30px"} w={"60%"}>
                            {
                                orderList.map((elem) => {
                                    return (
                                        <Box key={elem.title + elem.price + Math.random()} boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px" p={5}>
                                            <HStack justifyContent={"space-around"} paddingBottom={"10px"} marginBottom={"20px"} borderBottom={"1px solid gray"}>
                                                <Box w={"25%"}>
                                                    <img src={"/bagImage.jpg"} alt={elem.title} style={{ width: "100%" }} />
                                                </Box>
                                                <Box textAlign={"left"} w={"60%"}>
                                                    <Heading as="h3" size='lg'>Title :- {elem.title}</Heading>
                                                    <Text textDecoration="line-through" fontSize={"md"}>Value :- {elem.strike}</Text>
                                                    <Text fontSize={"md"}>Discount :- {elem.discount}</Text>
                                                    <Text fontSize={"lg"}>Price :- {elem.price}</Text>
                                                    <Text fontSize={"md"}>Main-Category :- {elem.main_category}</Text>
                                                    <Text fontSize={"md"}>Sub-Category :- {elem.sub_category}</Text>
                                                    <Text fontSize={"md"}>Quantity :- {elem.quantity}</Text>
                                                </Box>
                                            </HStack>
                                            <Button onClick={onOpen} ref={buttonRef}>Write a product review</Button>
                                            <>
                                                <Modal
                                                    initialFocusRef={ratingRef}
                                                    finalFocusRef={buttonRef}
                                                    isOpen={isOpen}
                                                    onClose={onClose}
                                                >
                                                    <ModalOverlay />
                                                    <ModalContent>
                                                        <ModalHeader>Create Review</ModalHeader>
                                                        <ModalCloseButton />
                                                        <ModalBody pb={6}>
                                                            <Box>

                                                            </Box>
                                                            <FormControl>
                                                                <FormLabel>Overall rating</FormLabel>
                                                                <Input ref={ratingRef} placeholder="Overall rating" style={{ position: "absolute", top: "-1000%", opacity: 0 }} zIndex={-1} />
                                                            </FormControl>
                                                            <Box>
                                                                <ReactStars
                                                                    count={5}
                                                                    onChange={ratingChanged}
                                                                    size={50}
                                                                    isHalf={true}
                                                                    emptyIcon={<i className="far fa-star"></i>}
                                                                    halfIcon={<i className="fa fa-star-half-alt"></i>}
                                                                    fullIcon={<i className="fa fa-star"></i>}
                                                                    activeColor="#ffd700"
                                                                />
                                                            </Box>

                                                            <FormControl mt={4}>
                                                                <FormLabel>Add a headline</FormLabel>
                                                                <Input ref={headLineRef} placeholder="What is most important to know?" />
                                                            </FormControl>

                                                            <FormControl mt={4}>
                                                                <FormLabel>Add a written review</FormLabel>
                                                                <textarea ref={reviewRef} placeholder={"What did you like or dislike? What did you use this product for?"} style={{ height: "130px", width: "100%", border: "1px solid gray", padding: "5px" }}></textarea>
                                                            </FormControl>
                                                        </ModalBody>

                                                        <ModalFooter>
                                                            <Button colorScheme='blue' mr={3} onClick={() => handleSubmit(elem._id)}>
                                                                Submit
                                                            </Button>
                                                            <Button onClick={onClose}>Cancel</Button>
                                                        </ModalFooter>
                                                    </ModalContent>
                                                </Modal>
                                            </>
                                        </Box>
                                    )
                                })
                            }
                        </Grid>
                }
            </Box>
        </>
    )
}

export default OrderList;