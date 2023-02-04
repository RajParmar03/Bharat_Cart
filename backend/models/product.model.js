const mongoose = require("mongoose"); // importing the mongoose from the packages.

// creating the product schema.
const productSchema = mongoose.Schema({
    main_category : String,
    sub_category : String,
    title : String,
    image1 : String,
    image2 : String,
    price : Number,
    strike : Number,
    stocks : Number,
    discount : String
});

// creating the product model using product schema.
const ProductModel = mongoose.model("product" , productSchema);

// exporting the productmodel.
module.exports = ProductModel;