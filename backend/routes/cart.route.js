const express = require("express");
const jwt = require("jsonwebtoken");
const CartModel = require("../models/cart.model");
const ProductModel = require("../models/product.model");
require('dotenv').config();


const UserModel = require("../models/user.model");


const key = process.env.KEY;


const cartRouter = express.Router();

cartRouter.get("/get", async (req,res) => {
    let token = req.headers.authorization;
    let decoded = jwt.verify(token, key);
    let email = decoded.email;
    try {
        let users = await UserModel.find({email});
        let user = users[0]; 
        let cartItems = [];
        user.cartList.forEach(async (elem) => {
            let product = await ProductModel.findById({_id:elem});
            let 
            cartItems = [...cartItems , product];
        });
        setTimeout(() => {
            res.status(200).send(cartItems);
        },500);
    } catch (error) {
        res.send(error);
    }
});

cartRouter.post("/add" , async(req ,res) => {
    let token = req.headers.authorization;
    let decoded = jwt.verify(token, key);
    let email = decoded.email;
    try {
        let users = await UserModel.find({email});
        let user = users[0];
        let cartItem = new CartModel(req.body);
        await cartItem.save();
        let cartList = user.cartList;
        if(cartList.includes(req.body.id)){
            res.send({message : "This product is already in your cart."})
        }else{
            cartList = [...cartList , req.body.id];
            let updatedUser = await UserModel.findByIdAndUpdate({_id : user._id},{cartList : cartList});
            res.send({message : "Added to cart Successfully."});
        }
        
        // let signal = false;
        
        // cartList.map((elem) => {
        //     if(elem.productId === req.body.productId){
        //         signal = true;
        //     }
        // });
        // if(!signal){
        //     cartList = [...cartList , req.body];
        //     let updatedUser = await UserModel.findByIdAndUpdate({_id : user._id},{cartList : cartList});
        //     res.send({message : "Added to cart Successfully."});
        // }else{
        //     res.send({message : "This product is already in your cart."});
        // }
        
    } catch (error) {
        res.send({message : "error occured during adding product to cart."});
    }
});

module.exports = cartRouter;