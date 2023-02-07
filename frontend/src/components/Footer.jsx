import { Box, Heading } from '@chakra-ui/react';
import React from 'react'

const Footer = () => {
    return (
        <Box h={"50px"} alignItems="center" m={"30px auto auto auto"}>
            <Heading as='h3' size='lg'>
                Footer
            </Heading>
        </Box>
    )
}

export default Footer;