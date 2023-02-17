import { Box, Button, Heading } from '@chakra-ui/react';
import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startError, startLoading, stopError, stopLoading } from '../Redux/stateManager/stateManager.action';

const About = () => {

  const store = useSelector(store => store);

  const dispatch = useDispatch();

  console.log(store);
  return (
    <Box m={"130px auto 30px auto"}>
      <Heading as='h1' size='md' noOfLines={1}>
        <Button onClick={() => dispatch(startLoading())}>start loading</Button>
        <Button onClick={() => dispatch(stopLoading())}>stop loading</Button>
        <Button onClick={() => dispatch(startError())}>start error</Button>
        <Button onClick={() => dispatch(stopError())}>stop error</Button>
      </Heading>
    </Box>
  )
}

export default About;