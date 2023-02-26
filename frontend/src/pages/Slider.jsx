import React from 'react';
import { Box, Image, useBreakpointValue , Text } from "@chakra-ui/react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from "swiper";
import 'swiper/css';
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";


const Slider = ({sliderList , handleCardClick}) => {

  const slideCount = useBreakpointValue({ sm:2,base: 1,md:3,lg: 4 })
  const isDesktop = useBreakpointValue({ base: true,md:true, lg: true })

  return (
    <Box m={"20px auto 20px auto"}>
      <Swiper
        slidesPerView={slideCount}
        spaceBetween={50}
        autoplay={{
          delay: 1000,
        }}
        modules={[Navigation, Autoplay]}
        navigation={isDesktop}
        className="mySwiper"
        loop={true}
        
      >
        {sliderList.map((elem) => (
          <SwiperSlide key={elem._id} onClick={() => handleCardClick(elem._id)} style={{padding:"10px 10px",border:"1px solid gray",boxShadow:"rgba(0, 0, 0, 0.24) 0px 3px 8px"}}>
            <Image width={"70%"} m={"auto"} src={"/bagImage.jpg"} alt={elem.name}  _hover={{cursor : "pointer"}} />
            <Text _hover={{cursor : "pointer"}} textAlign={"center"} overflow={"hidden"}>{elem.title}</Text>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  )
}

export default Slider;