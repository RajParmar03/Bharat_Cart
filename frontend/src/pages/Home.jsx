import { Image } from '@chakra-ui/image';
import { Box, Flex, Text } from '@chakra-ui/layout';
import React, { useEffect, useState } from 'react';
import Slider from './Slider';
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';
import { startError, startLoading, stopLoading } from '../Redux/stateManager/stateManager.action';
import { Spinner } from '@chakra-ui/react';
import {useNavigate} from "react-router-dom";



let baseUrl = process.env.REACT_APP_BASEURL;

const shopCategories = [
  {
    id: 1,
    url: "https://images.dailyobjects.com/marche/assets/images/other/cases-ups.jpg?tr=cm-pad_crop,v-2,w-874,dpr-1",
    title: "Cases"
  },
  {
    id: 2,
    url: "https://images.dailyobjects.com/marche/assets/images/other/laptop-sleeve-ups.jpg?tr=cm-pad_crop,v-2,w-874,dpr-1",
    title: "Laptop Sleeves"
  },
  {
    id: 3,
    url: "https://images.dailyobjects.com/marche/assets/images/other/charging-solution-ups.jpg?tr=cm-pad_crop,v-2,w-874,dpr-1",
    title: "Charging Solution"
  },
  {
    id: 4,
    url: "https://images.dailyobjects.com/marche/assets/images/other/tote-ups.jpg?tr=cm-pad_crop,v-2,w-874,dpr-1",
    title: "Tote Bags"
  },
  {
    id: 5,
    url: "https://images.dailyobjects.com/marche/assets/images/other/crossbody-ups.jpg?tr=cm-pad_crop,v-2,w-874,dpr-1",
    title: "Crossbody Bags"
  },
  {
    id: 6,
    url: "https://images.dailyobjects.com/marche/assets/images/other/backpack-ups.jpg?tr=cm-pad_crop,v-2,w-874,dpr-1",
    title: "Backpack"
  },
  {
    id: 7,
    url: "https://images.dailyobjects.com/marche/assets/images/other/deskmat-ups.jpg?tr=cm-pad_crop,v-2,w-874,dpr-1",
    title: "Desk Mat"
  },
  {
    id: 8,
    url: "https://images.dailyobjects.com/marche/assets/images/other/watchbands-ups.jpg?tr=cm-pad_crop,v-2,w-874,dpr-1",
    title: "Watchbands"
  }
]

const getData = async (category) => {
  let data = await axios.get(`${baseUrl}/product?main_category=${category}`);
  // console.log(data);
  return data.data;
}


const Home = () => {

  const [clothingArr, setClothingArr] = useState([]);
  const [electronicsArr, setElectronicsArr] = useState([]);
  const [gadgetArr, setGadgetArr] = useState([]);
  const [educationalArr, setEducationalArr] = useState([]);
  const [footwearArr, setFootwearArr] = useState([]);

  const loadingManager = useSelector(store => store.loadingManager);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(startLoading());
    getData("clothing").then((res) => {
      setClothingArr(res.data);
      dispatch(stopLoading());
    }).catch((error) => {
      dispatch(startError());
    });
  }, []);

  useEffect(() => {
    dispatch(startLoading());
    getData("Educational").then((res) => {
      setEducationalArr(res.data);
      dispatch(stopLoading());
    }).catch((error) => {
      dispatch(startError());
    });
  }, []);

  useEffect(() => {
    dispatch(startLoading());
    getData("Electronics").then((res) => {
      setElectronicsArr(res.data);
      dispatch(stopLoading());
    }).catch((error) => {
      dispatch(startError());
    });
  }, []);

  useEffect(() => {
    dispatch(startLoading());
    getData("Footwear").then((res) => {
      setFootwearArr(res.data);
      dispatch(stopLoading());
    }).catch((error) => {
      dispatch(startError());
    });
  }, []);

  useEffect(() => {
    dispatch(startLoading());
    getData("Gadgets").then((res) => {
      setGadgetArr(res.data);
      dispatch(stopLoading());
    }).catch((error) => {
      dispatch(startError());
    });
  }, []);

  const handleCardClick = (id) => {
    navigate(`/singleproduct/${id}`)
  }


  return (
    <>
      {
        loadingManager.isLoading ?
          <Box m={"150px auto 400px auto"}>
            <Spinner
              thickness='5px'
              speed='0.5s'
              emptyColor='gray.200'
              color='blue.500'
              size='xl'
            />
          </Box>
          :
          <Box m={"130px auto 30px auto"}>
            <Box h={"500px"} w={"100%"} m={"20px auto"}>
              <Image src={"https://images.dailyobjects.com/marche/assets/images/other/backpack-desktops.jpg?tr=cm-pad_crop,v-2,w-1349,dpr-1"} alt={"bag"} h={"100%"} w={"100%"} m={"auto"} />
            </Box>
            <Text fontSize={"30px"} textAlign={"left"}>Shop Through category.</Text>
            <Box p={"20px"}>
              <Slider sliderList={clothingArr} handleCardClick={handleCardClick} />
            </Box>
            <Flex h={"500px"} w={"100%"} m={"20px auto"}>
              <Image src={"/watchPoster.jpg"} alt={"bag"} h={"100%"} w={"70%"} m={"auto"} />
              <Image src={"/watchPoster2.jpg"} alt={"bag"} h={"100%"} w={"30%"} m={"auto"} />
            </Flex>
            <Text fontSize={"30px"} textAlign={"left"}>Shop Through category.</Text>
            <Slider sliderList={educationalArr} handleCardClick={handleCardClick}/>
            <Flex h={"500px"} w={"100%"} m={"20px auto"}>
              <Image src={"/shoesPoster.jpg"} alt={"bag"} h={"100%"} w={"40%"} m={"auto"} />
              <Image src={"/shoesPoster2.jpg"} alt={"bag"} h={"100%"} w={"60%"} m={"auto"} />
            </Flex>
            <Text fontSize={"30px"} textAlign={"left"}>Shop Through category.</Text>
            <Slider sliderList={electronicsArr} handleCardClick={handleCardClick}/>
            <Flex h={"500px"} w={"100%"} m={"20px auto"}>
              <Image src={"/laptopPoster4.jpg"} alt={"bag"} h={"100%"} w={"70%"} m={"auto"} />
              <Image src={"/laptopPoster.jpg"} alt={"bag"} h={"100%"} w={"30%"} m={"auto"} />
            </Flex>
            <Text fontSize={"30px"} textAlign={"left"}>Shop Through category.</Text>
            <Slider sliderList={footwearArr} handleCardClick={handleCardClick}/>
            <Flex h={"500px"} w={"100%"} m={"20px auto"}>
              <Image src={"/jeansPoster.jpg"} alt={"bag"} h={"100%"} w={"60%"} m={"auto"} />
              <Image src={"/jeansPoster4.jpg"} alt={"bag"} h={"100%"} w={"40%"} m={"auto"} />
            </Flex>
            <Text fontSize={"30px"} textAlign={"left"}>Shop Through category.</Text>
            <Slider sliderList={gadgetArr} handleCardClick={handleCardClick}/>
          </Box>
      }
    </>
  )
}

export default Home;