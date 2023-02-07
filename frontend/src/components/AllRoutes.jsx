import React from 'react'
import {Routes , Route} from 'react-router-dom';
import User from "../pages/User";
import About from "../pages/About";
import Cart from "../pages/Cart";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Products from "../pages/Products";
import Signup from "../pages/Signup";
import Wishlist from "../pages/Wishlist";
import { Box } from '@chakra-ui/react';
import SelectProducts from '../pages/SelectProducts';


const AllRoutes = () => {
  return (
    <Box m={"30px auto 30px auto"}>
        <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/signup" element={<Signup />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/selectproducts" element={<SelectProducts />}></Route>
            <Route path="/products/:category" element={<Products />}></Route>
            <Route path="/cart" element={<Cart />}></Route>
            <Route path="/wishlist" element={<Wishlist />}></Route>
            <Route path="/user" element={<User />}></Route>
            <Route path="/about" element={<About />}></Route>
        </Routes>
    </Box>
  )
}

export default AllRoutes;