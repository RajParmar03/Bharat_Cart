const express = require("express"); // importing express from the packages.
const ProductModel = require("../models/product.model");

const productRouter = express.Router(); // creating the router for the product.


// this is the get request for the product.
productRouter.get("/" , async (req , res) => {
    if(req.query.search){
        try{
            let data = await ProductModel.find();
            let filtered_data = data.filter((elem) => {
                return elem.main_category.includes(req.query.search) || elem.sub_category.includes(req.query.search) || elem.title.includes(req.query.search)
            });
            res.status(200).send(filtered_data);
        }catch(error){
            res.send(400).send({error:error});
        }
    }else{
        if(req.query.sort){
            console.log("in the backend and in the sorting part" );
            let realQuery = {};
            for(let i in req.query){
                if(i === "sort"){
                    continue;
                }
                realQuery[i] = req.query[i];
            }
            try {
                let data = await ProductModel.find(realQuery).sort({price: req.query.sort === "LTH"? 1 : -1});
                res.status(200).send(data);
            } catch (error) {
                res.status(400).send({error : error});
            }
        }else{
            try {
                let data = await ProductModel.find(req.query);
                res.status(200).send(data);
            } catch (error) {
                res.status(400).send({error : error});
            }
        }
    }   
});


// exporting the productRouter.
module.exports = productRouter;