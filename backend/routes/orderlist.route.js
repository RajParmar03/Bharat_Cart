const express = require('express');
const jwt = require("jsonwebtoken");
const UserModel = require("../models/user.model");
const ProductModel = require("../models/product.model");
const CartModel = require("../models/cart.model");
require('dotenv').config();
const cors = require('cors');


const key = process.env.KEY;


const orderlistRouter = express.Router();

orderlistRouter.use(cors());

orderlistRouter.get("/get", async (req, res) => {
    let token = req.headers.authorization;
    let decoded = jwt.verify(token, key);
    let email = decoded.email;
    try {
        let users = await UserModel.find({ email });
        let user = users[0];
        let OrderList = [];
        await user.orderList.map(async (elem) => {
            try {
                let OrderItem = await ProductModel.findById({ _id: elem.productId });
                OrderList = [...OrderList, OrderItem];
            } catch (error) {
                res.send({ message: "error occured during the getting Order array" });
            }
        });
        setTimeout(() => {
            res.send(OrderList);
        }, 200)
    } catch (error) {
        res.send({ message: "error occured during removing item from your wishlist" });
    }
});

orderlistRouter.patch("/add", async (req, res) => {
    console.log("in the /orderlist/add");
    let token = req.headers.authorization;
    let decoded = jwt.verify(token, key);
    let email = decoded.email;
    try {
        let users = await UserModel.find({ email });
        let user = users[0];
        console.log("this is user" , user);
        let userCart = user.cartList;
        console.log("this is usercart" , userCart);
        userCart.forEach(async (elem) => {
            let currentProduct = await CartModel.findById({ _id: elem.cartId });
            console.log("this is curent cart product" , currentProduct);
            let sellerId = currentProduct.sellerId;
            let seller = await UserModel.findById({ _id: sellerId });
            console.log("this is seller" , seller);
            let newProducts = [...seller.sold, { productId: elem.productId, time: Number(new Date().getTime()),quantity: currentProduct.quantity }];
            await UserModel.findByIdAndUpdate({_id : sellerId} , {sold : newProducts});
        });
        let newOrderList = [...user.orderList , ...user.cartList];
        await UserModel.findByIdAndUpdate({ _id: user._id }, { cartList: [], orderList: newOrderList });
        setTimeout(() => {
            res.send({ message: "added item to your orderlist successfully" });
        },1000)
    } catch (error) {
        res.send({ message: "error occured during removing item from your wishlist" });
    }
});







module.exports = orderlistRouter;