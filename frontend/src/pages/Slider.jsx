import React from 'react';
import { Box, Image, useBreakpointValue } from "@chakra-ui/react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from "swiper";
import 'swiper/css';
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";


const Slider = ({sliderList , handleCardClick}) => {

  const slideCount = useBreakpointValue({ sm:2,base: 1,md:3,lg: 4 })
  const isDesktop = useBreakpointValue({ base: false,md:true, lg: true })

  return (
    <Box>
      <Swiper
        slidesPerView={slideCount}
        spaceBetween={20}
        autoplay={{
          delay: 1000,
        }}
        modules={[Navigation, Autoplay]}
        navigation={isDesktop}
        className="mySwiper"
        loop={true}
      >
        {sliderList.map((elem) => (
          <SwiperSlide key={elem._id} onClick={() => handleCardClick(elem._id)}>
            <Image width={"100%"} src={"/bagImage.jpg"} alt={elem.name} />
            <p>{elem.title}</p>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  )
}

export default Slider;