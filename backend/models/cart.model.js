const express = require("express");
const mongoose = require("mongoose");


const cartSchema = mongoose.Schema({
    productId : String,
    main_category : String,
    sub_category : String,
    title : String,
    image1 : String,
    image2 : String,
    price : Number,
    strike : Number,
    stocks : Number,
    discount : String,
    quantity : {
        type : Number,
        default : 1,
    },
    time : Number,
});

const CartModel = mongoose.model("cartitem" , cartSchema);


module.exports = CartModel;