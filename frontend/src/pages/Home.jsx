import { Box, Heading } from '@chakra-ui/react';
import React from 'react';



let baseUrl = process.env.REACT_APP_BASEURL;

const Home = () => {
  return (
    <Box m={"130px auto 30px auto"}>
      <Heading as='h1' size='4xl' noOfLines={1}>
        Welcome to the Home Page.
      </Heading>

    </Box>
  )
}

export default Home;