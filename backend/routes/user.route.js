const mongoose = require("mongoose"); //importing the mongoose from package.
const express = require("express"); //importing the express from package.
const bcrypt = require("bcrypt"); // importing the bcrypt from package.
require('dotenv').config(); // importing the dotenv from package.
const jwt = require("jsonwebtoken"); // importing jwt from jsonwebtoken


const UserModel = require("../models/user.model"); // importing UserModel from models folder.



const userRouter = express.Router(); // creating the saperate router for the user routes.
const salt = process.env.SALT; // imporing the salt value from .env
const key = process.env.KEY; // importing the key value from .env



// this is the post API for the signup of new user.
userRouter.post("/signup" , async (req , res) => {
    let {image,name,username,email,phone,password,role} = req.body;
    try {
        let userByEmail = await UserModel.find({email});
        let userByPhone = await UserModel.find({phone});
        let userByUsername = await UserModel.find({username});
        if(userByEmail.length === 0 && userByPhone.length === 0 && userByUsername.length === 0){
            try {
                bcrypt.hash(password, +salt , async (err, hash) => {
                    try {
                        if(err){
                            res.status(400).send("error in the bcrypt try part and error is :- " , err);
                            
                        }else{
                            let user = new UserModel({image,name,username,email,phone,password : hash,role});
                            await user.save();
                            res.status(200).send({message : "signup successfully.."});
                        }
                    } catch (error) {
                        
                        res.status(400).send({message : "error in the bcrypt catch part"});   
                    }
                });
            
            } catch (error) {
                
                res.status(400).send({message : "error in the main catch part"}); 
            }
        }else{
            
            res.send({message : "accout with same username/email/mobile-number is already there..."});
        }
    } catch (error) {
            
            res.send({message : "accout with same username/email/mobile-number is already there..."})
    }
});

// this is post API for the login of the user.
userRouter.post("/login" , async (req , res) => {
    const {email , password} = req.body;
    
    try {
        const user = await UserModel.find({email});
        
        const token = jwt.sign({ email : email}, key);
        bcrypt.compare(password, user[0].password , (err, result) => {
            if(err){
                res.status(400).send("error in the bcrypt try part and error is :- " , err);
            }else if(result){
                res.status(200).send({message : "You have successfully logged in...",token : token});
            }else{
                res.status(400).send("wrong credentials, please try again with right one...");
            }
        });
    } catch (error) {
        res.status(400).send("error in the bcrypt catch part and error is :- " , error);
    }
    
});


userRouter.get("/getuser" , async(req,res) => {
    let token = req.headers.authorization;
    const decoded = jwt.verify(token, key);
    try {
        const user = await UserModel.find({email : decoded.email});
        res.status(200).send(user[0]);
    } catch (error) {
        res.status(400).send({msg : error});
    }
    
});




// exporting the userRouter.
module.exports = userRouter;








// Data for the signup API check in the thunder client. :-
// {
    //     "name" : "raj parmar" , 
    //     "email" : "rajparmar@gmail.com" , 
    //     "phone" : 9033920621 , 
    //     "password" : "rajparmar123" , 
    //     "type" : "buyer"
// }
    
    
// Data for the login API check in the thunder client. :-
// {
//     "name" : "parth parmar" , 
//     "password" : "parthparmar123" 
// }