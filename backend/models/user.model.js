const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name : String , 
    email : String , 
    phone : Number , 
    password : String , 
    type : String
});