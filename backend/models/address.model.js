const mongoose = require("mongoose");

const addressSchema = mongoose.Schema({
    houseNo : String,
    street : String,
    city : String,
    state : String,
    country : String,
    pincode : Number,
    isDefault : {
        type : Boolean,
        default : false
    }
});

const AddressModel = mongoose.model("addresse" , addressSchema);

module.exports = AddressModel;