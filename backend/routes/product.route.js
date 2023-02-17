const express = require("express"); // importing express from the packages.
const ProductModel = require("../models/product.model");
const UserModel = require("../models/user.model");
require('dotenv').config();
const jwt = require("jsonwebtoken");
const cors = require('cors');

const key = process.env.KEY;


const productRouter = express.Router(); // creating the router for the product.

productRouter.use(cors()); 


// this is the get request for the product.
productRouter.get("/" , async (req , res) => {
    let sub_category = [];
    if(req.query.main_category){
        try {
            let data = await ProductModel.find({main_category : req.query.main_category});
            data.forEach((elem) => {
                if(!sub_category.includes(elem.sub_category)){
                    sub_category = [...sub_category , elem.sub_category];
                }
            });
        } catch (error) {
            console.log("error occured during making sub_category list and error is : " , error);
        }
    }
    if(req.query.search){
        if(req.query.main_category){
            try {
                let data = await ProductModel.find({main_category : req.query.main_category});
                let filtered_data = data.filter((elem) => {
                    return elem.sub_category.includes(req.query.search) || elem.title.includes(req.query.search)
                });
                res.status(200).send(filtered_data);
            } catch (error) {
                res.send(400).send({error:error});
            }
        }else{
            try{
                let data = await ProductModel.find();
                let filtered_data = data.filter((elem) => {
                    return elem.main_category.includes(req.query.search) || elem.sub_category.includes(req.query.search) || elem.title.includes(req.query.search)
                });
                res.status(200).send(filtered_data);
            }catch(error){
                res.send(400).send({error:error});
            }
        }
        
    }else{
        if(req.query.sort){
            let realQuery = {};
            for(let i in req.query){
                if(i === "sort"){
                    continue; 
                }
                realQuery[i] = req.query[i];
            }
            try {
                let data = await ProductModel.find(realQuery).sort({price: req.query.sort === "LTH"? 1 : -1});
                res.status(200).send({data : data , sub : sub_category});
            } catch (error) {
                res.status(400).send({error : error});
            }
        }else{
            try {
                let data = await ProductModel.find(req.query);
                res.status(200).send({data : data , sub : sub_category});
            } catch (error) {
                res.status(400).send({error : error});
            }
        }
    }   
});

productRouter.get("/:id", async (req,res) => {
    let id = req.params.id;
    try {
        let product = await ProductModel.find({_id : id});
        res.status(200).send(product[0]);
    } catch (error) {
        res.send(error);
    }
});




// exporting the productRouter.
module.exports = productRouter;