const express = require('express');
const jwt = require("jsonwebtoken");
const UserModel = require("../models/user.model");
const ProductModel = require("../models/product.model");
require('dotenv').config();
const cors = require('cors');


const key = process.env.KEY;


const orderlistRouter = express.Router();

orderlistRouter.use(cors());


orderlistRouter.patch("/add", async (req, res) => {
    let token = req.headers.authorization;
    let decoded = jwt.verify(token, key);
    let email = decoded.email;
    try {
        let users = await UserModel.find({ email });
        let user = users[0];
        let newOrderList = user.cartList;
        await UserModel.findByIdAndUpdate({_id : user._id} , {cartList : [] , orderList : newOrderList});
        res.send({ message: "added item to your orderlist successfully" });
    } catch (error) {
        res.send({ message: "error occured during removing item from your wishlist" });
    }
});






module.exports = orderlistRouter;