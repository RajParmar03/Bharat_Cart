import { Box, Flex, Heading, Spacer } from '@chakra-ui/react';
import React from 'react'
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <Flex h={"50px"} alignItems="center">
        <Spacer />
        <Heading as='h3' size='md'><Link to="/">Home</Link></Heading>
        <Spacer />
        <Heading as='h3' size='md'><Link to="/products">Products</Link></Heading>
        <Spacer />
        <Heading as='h3' size='md'><Link to="/cart">Cart</Link></Heading>
        <Spacer />
        <Heading as='h3' size='md'><Link to="/user">User</Link></Heading>
        <Spacer />
        <Heading as='h3' size='md'><Link to="/wishlist">Wishlist</Link></Heading>
        <Spacer />
        <Heading as='h3' size='md'><Link to="/signup">Sign-up</Link></Heading>
        <Spacer />
        <Heading as='h3' size='md'><Link to="/login">Login</Link></Heading>
        <Spacer />
        <Heading as='h3' size='md'><Link to="/about">About</Link></Heading>
        <Spacer />
    </Flex>
  )
}

export default Navbar;