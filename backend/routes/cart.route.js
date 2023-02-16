const express = require("express");
const jwt = require("jsonwebtoken");
const CartModel = require("../models/cart.model");
require('dotenv').config();
const cors = require('cors');


const UserModel = require("../models/user.model");


const key = process.env.KEY;


const cartRouter = express.Router();

cartRouter.use(cors()); 

cartRouter.get("/get", async (req,res) => {
    let token = req.headers.authorization;
    let decoded = jwt.verify(token, key);
    let email = decoded.email;
    try {
        let users = await UserModel.find({email});
        let user = users[0];
        let cartItems = [];
        await user.cartList.map(async (elem) => {
            try {
                let cartItem = await CartModel.findById({_id:elem.cartId});
                cartItems = [...cartItems, cartItem];
            } catch (error) {
                res.send({message : "error occured during the getting cart array"});
            } 
        });
        setTimeout(() => {
            cartItems.sort((a,b) => {
               return Number(b.time) - Number(a.time);
            });
            res.send(cartItems);
        },200)
    } catch (error) {
        res.send(error);
    }
});

cartRouter.post("/add" , async(req ,res) => {
    let token = req.headers.authorization;
    let decoded = jwt.verify(token, key);
    let email = decoded.email;
    console.log(req.body);
    try {
        let users = await UserModel.find({email});
        let user = users[0];
        let cartList = user.cartList;
        let signal = false;
        cartList.map((elem) => {
            if(elem.productId === req.body.productId){
                signal = true;
            }
        });
        if(!signal){
            let cartItem = new CartModel(req.body);
            await cartItem.save();
            cartList = [...cartList , {cartId : cartItem._id , productId : cartItem.productId}];
            await UserModel.findByIdAndUpdate({_id : user._id},{cartList : cartList});
            res.send({message : "Added to cart Successfully." , isAdded:true});
        }else{
            res.send({message : "This product is already in your cart.", isAdded:false});
        }
    } catch (error) {
        res.send({message : "error occured during adding product to cart.", isAdded:false});
    }
});

cartRouter.patch("/update/:id", async (req , res) => {
    let id = req.params.id;
    let val = req.body.val;
    try {
        let cartItem = await CartModel.findById({_id:id});
        await CartModel.findByIdAndUpdate({_id:id},{quantity:cartItem.quantity+val});
        res.send({message : "Updated the amount"});
    } catch (error) {
        res.send({message : "error occured during updating the amount"});
    }
});

cartRouter.delete("/delete/:id" , async (req,res) => {
    let id = req.params.id;
    let token = req.headers.authorization;
    let decoded = jwt.verify(token, key);
    let email = decoded.email;
    try {
        let users = await UserModel.find({email});
        let user = users[0];
        let cartList = user.cartList;
        let updatedCartList = cartList.filter((elem) => {
            return id != elem.cartId;
        });
        await UserModel.findByIdAndUpdate({_id:user._id},{cartList : updatedCartList});
        await CartModel.findByIdAndDelete({_id:id});
        res.send({message : "Deleted the item successfully."});
    } catch (error) {
        res.send({message: "error occured during deleteing the cart item"});
    }
})

module.exports = cartRouter;