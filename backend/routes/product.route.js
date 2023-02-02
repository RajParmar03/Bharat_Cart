const express = require("express"); // importing express from the packages.

const productRouter = express.Router(); // creating the router for the product.


// this is the get request for the product.
productRouter.get("/" , (req , res) => {
    res.status(400).send("You are on the product router and get request of the raj parmar website..");
});


// exporting the productRouter.
module.exports = productRouter;