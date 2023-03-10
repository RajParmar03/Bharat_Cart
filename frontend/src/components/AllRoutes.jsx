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
import OrderList from '../pages/OrderList';
import PrivateRoute from '../pages/PrivateRoute';
import SellerLogin from '../pages/SellerLogin';
import SellerDashBoard from '../pages/SellerDashBoard';
import PrivateRouteSeller from "../pages/PrivateRouterSeller";
import SellerProducts from '../pages/SellerProducts';
import SellerSoldProducts from '../pages/SellerSoldProducts';
import NotFound from '../pages/NotFound';
import SellerHome from '../pages/SellerHome';


const AllRoutes = () => {
  return (
    <Box m={"30px auto 30px auto"}>
        <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/signup" element={<Signup />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/sellerhome" element={<SellerHome />}></Route>
            <Route path="/seller-login" element={<SellerLogin />}></Route>
            <Route path="/sellerdashboard" element={<PrivateRouteSeller><SellerDashBoard /></PrivateRouteSeller>}></Route>
            <Route path="/sellerproducts" element={<PrivateRouteSeller><SellerProducts /></PrivateRouteSeller>}></Route>
            <Route path="/sellersoldproducts" element={<PrivateRouteSeller><SellerSoldProducts /></PrivateRouteSeller>}></Route>
            <Route path="/selectproducts" element={<PrivateRoute><SelectProducts /></PrivateRoute>}></Route>
            <Route path="/products/:category" element={<PrivateRoute><Products /></PrivateRoute>}></Route>
            <Route path="/singleproduct/:id" element={<PrivateRoute><SingleProduct /></PrivateRoute>}></Route>
            <Route path="/cart" element={<PrivateRoute><Cart /></PrivateRoute>}></Route>
            <Route path="/wishlist" element={<PrivateRoute><Wishlist /></PrivateRoute>}></Route>
            <Route path="/user" element={<PrivateRoute><User /></PrivateRoute>}></Route>
            <Route path="/about" element={<About />}></Route>
            <Route path="/checkout" element={<PrivateRoute><Checkout /></PrivateRoute>}></Route>
            <Route path="/payment/:id" element={<PrivateRoute><Payment /></PrivateRoute>}></Route>
            <Route path="/billing" element={<PrivateRoute><Billing /></PrivateRoute>}></Route>
            <Route path="/orderlist" element={<PrivateRoute><OrderList /></PrivateRoute>}></Route>
            <Route path="/orderconfirmation" element={<PrivateRoute><OrderConfirmation /></PrivateRoute>}></Route>
            <Route path='*' element={<NotFound />}/>
        </Routes>
    </Box>
  )
}

export default AllRoutes;