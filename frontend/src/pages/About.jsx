import { Box, Heading } from '@chakra-ui/react';
import React from 'react'

const About = () => {
  return (
    <Box m={"130px auto 30px auto"}>
      <Heading as='h1' size='md' noOfLines={1}>
        About
      </Heading>
    </Box>
  )
}

export default About;