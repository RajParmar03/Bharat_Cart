const mongoose = require("mongoose"); // importing mongoose from packages.

// creating the user schema.
const userSchema = mongoose.Schema({
    name : String , 
    email : String , 
    phone : Number , 
    password : String , 
    type : String
});

// creating the user model.
const UserModel = mongoose.model("user" , userSchema);


//exporting the user model.
module.exports = UserModel;


