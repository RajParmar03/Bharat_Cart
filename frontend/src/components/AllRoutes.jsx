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
import SingleProduct from '../pages/SingleProduct';
import Checkout from '../pages/Checkout';
import Payment from '../pages/Payment';
import Billing from '../pages/Billing';
import { OrderConfirmation } from '../pages/OrderConfirmation';


const AllRoutes = () => {
  return (
    <Box m={"30px auto 30px auto"}>
        <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/signup" element={<Signup />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/selectproducts" element={<SelectProducts />}></Route>
            <Route path="/products/:category" element={<Products />}></Route>
            <Route path="/singleproduct/:id" element={<SingleProduct />}></Route>
            <Route path="/cart" element={<Cart />}></Route>
            <Route path="/wishlist" element={<Wishlist />}></Route>
            <Route path="/user" element={<User />}></Route>
            <Route path="/about" element={<About />}></Route>
            <Route path="/checkout" element={<Checkout />}></Route>
            <Route path="/payment/:id" element={<Payment />}></Route>
            <Route path="/billing" element={<Billing />}></Route>
            <Route path="/orderconfirmation" element={<OrderConfirmation />}></Route>
        </Routes>
    </Box>
  )
}

export default AllRoutes;