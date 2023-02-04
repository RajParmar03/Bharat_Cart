const express = require("express"); // importing express from the packages.
const ProductModel = require("../models/product.model");

const productRouter = express.Router(); // creating the router for the product.


// this is the get request for the product.
productRouter.get("/" , async (req , res) => {
    try {
        let data = await ProductModel.find(req.query);
        res.status(200).send(data);
    } catch (error) {
        res.status(400).send({error : error});
    }
});


// exporting the productRouter.
module.exports = productRouter;