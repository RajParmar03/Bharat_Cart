const express = require('express');
const jwt = require("jsonwebtoken");
const UserModel = require("../models/user.model");
const ProductModel = require("../models/product.model");
require('dotenv').config();


const key = process.env.KEY;


const wishlistRouter = express.Router();


wishlistRouter.get("/get" , async (req , res) => {
    let token = req.headers.authorization;
    let decoded = jwt.verify(token, key);
    let email = decoded.email;
    try {
        let users = await UserModel.find({email});
        let user = users[0];
        let wishList = [];
        await user.wishList.map(async (elem) => {
            let item = await ProductModel.findById({_id:elem});
            wishList = [...wishList , item];
        });
        setTimeout(() => {
            res.send(wishList);
        },200)
    } catch (error) {
        res.send({message : "error occured during adding item to your wishlist"});
    }
});

wishlistRouter.get("/getwishlist" , async (req , res) => {
    let token = req.headers.authorization;
    let decoded = jwt.verify(token, key);
    let email = decoded.email;
    try {
        let users = await UserModel.find({email});
        let user = users[0];
        res.send(user.wishList);
    } catch (error) {
        res.send({message : "error occured during adding item to your wishlist"});
    }
});


wishlistRouter.post("/add/:id" , async (req , res) => {
    let id = req.params.id;
    let token = req.headers.authorization;
    let decoded = jwt.verify(token, key);
    let email = decoded.email;
    try {
        let users = await UserModel.find({email});
        let user = users[0];
        let wishList = user.wishList;
        if(wishList.includes(id)){
            res.send({message : "This product is already there in your wishlist."})
        }else{
            wishList = [...wishList , id];
            await UserModel.findByIdAndUpdate({_id:user._id} , {wishList : wishList});
            res.send({message : "added item to your wishlist successfully"});
        }
    } catch (error) {
        res.send({message : "error occured during adding item to your wishlist"});
    }
});

wishlistRouter.delete("/delete/:id" , async (req ,res) => { 
    let id = req.params.id;
    let token = req.headers.authorization;
    let decoded = jwt.verify(token, key);
    let email = decoded.email;
    try {
        let users = await UserModel.find({email});
        let user = users[0];
        let updatedWishList = user.wishList.filter((elem) => {
            return elem != id;
        });
        await UserModel.findByIdAndUpdate({_id:user._id} , {wishList : updatedWishList});
        res.send({message : "removed item from your wishlist successfully"});
    } catch (error) {
        res.send({message : "error occured during removing item from your wishlist"});
    }
})

module.exports = wishlistRouter;