const express = require("express"); //importing the express from package.
require('dotenv').config(); // importing the dotenv from package.
const jwt = require("jsonwebtoken"); // importing jwt from jsonwebtoken
const cors = require('cors');
const ProductModel = require("../models/product.model");


const UserModel = require("../models/user.model"); // importing UserModel from models folder.


const key = process.env.KEY; // importing the key value from .env


const adminRouter = express.Router(); // creating the saperate router for the user routes.

adminRouter.use(cors()); 



adminRouter.get("/getproducts", async (req,res) => {
    let token = req.headers.authorization;
    let decoded = jwt.verify(token, key);
    let email = decoded.email;
    try {
        let users = await UserModel.find({email});
        let user = users[0];
        let productsList = [];
        await user.products.map(async (elem) => {
            try {
                let product = await ProductModel.findById({_id:elem});
                productsList = [...productsList, product];
            } catch (error) {
                res.send({message : "error occured during the getting products array"});
            } 
        });
        setTimeout(() => {
            productsList.sort((a,b) => {
                return Number(a.Product_add_time) - Number(b.Product_add_time);
             });
            res.send(productsList);
        },200)
    } catch (error) {
        res.send(error);
    }
});

adminRouter.delete("/delete/:id" , async (req , res) => {
    let productId = req.params.id;
    let token = req.headers.authorization;
    let decoded = jwt.verify(token , key);
    let email = decoded.email;
    try {
        let users = await UserModel.find({email});
        let user = users[0];
        let newProducts = user.products.filter((elem) => {
            return productId != elem;
        });
        await UserModel.findByIdAndUpdate({_id:user._id},{products : newProducts});
        await ProductModel.findByIdAndDelete({_id : productId});
        res.status(200).send({message : "Successfully deleted the product."});
    } catch (error) {
        res.status(400).send({message : "Failed to delete product."});
    }
});

adminRouter.patch("/update/:id" , async (req , res) => {
    let productId = req.params.id;
    try {
        await ProductModel.findByIdAndUpdate({_id : productId} , req.body);
        res.status(200).send({message : "Successfully updated the product."});
    } catch (error) {
        res.status(400).send({message : "Failed to update product."});
    }
});




module.exports = adminRouter;







