const express = require("express");
const AddressModel = require("../models/address.model");
const UserModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
require('dotenv').config();

const key = process.env.KEY;

const addressRouter = express.Router();


addressRouter.get("/getAddress" , async (req , res) => {
    let token = req.headers.authorization;
    const decoded = jwt.verify(token, key);
    let email = decoded.email;
    try {
        const users = await UserModel.find({email : email});
        let user = users[0];
        let addressList = [];
        user.addressList.map(async (elem) => {
            let address = await AddressModel.findById({_id : elem});
            addressList = [...addressList , address];
        });
        setTimeout(() => {
            res.send(addressList);
        },200)
    } catch (error) {
        res.status(400).send({msg : error});
    }  
});

addressRouter.post("/add" , async (req , res) => {
    let token = req.headers.authorization;
    const decoded = jwt.verify(token, key);
    const email = decoded.email;
    try {
        const newAddress = new AddressModel(req.body);
        await newAddress.save();
        const users = await UserModel.find({email : email});
        let user = users[0];
        let addressList = user.addressList;
        addressList = [...addressList , newAddress._id];
        await UserModel.findByIdAndUpdate({_id:user._id} , {addressList:addressList});
        res.send({message : "saved the address successfully."});
    } catch (error) {
        res.send({message : "error occured during saving the address"});
    } 
});


module.exports = addressRouter;