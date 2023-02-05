import { Box, Heading } from '@chakra-ui/react';
import React from 'react'

const Home = () => {
  return (
    <Box marginTop={10}>
      <Heading as='h1' size='4xl' noOfLines={1}>
        Welcome to the Home Page.
      </Heading>

    </Box>
  )
}

export default Home;