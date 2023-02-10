const mongoose = require("mongoose"); // importing mongoose from packages.

// creating the user schema.
const userSchema = mongoose.Schema({
    image : String,
    name : String ,
    username : { type: String, unique: true },
    email : { type: String, unique: true }, 
    phone : { type: Number, unique: true } , 
    password : String ,
    role: { type: String, default: 'buyer' },
    cartList : {type : Array, default : []},
    wishList : {type : Array, default : []},
    orderList : {type : Array, default : []},
    addressList : {type : Array, default : []}
});

// creating the user model.
const UserModel = mongoose.model("user" , userSchema);


//exporting the user model.
module.exports = UserModel;


