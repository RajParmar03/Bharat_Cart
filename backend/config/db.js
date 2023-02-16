const mongoose = require("mongoose");
require('dotenv').config();
mongoose.set('strictQuery', false);

const mongoUrl = process.env.URL;

const connection = mongoose.connect(mongoUrl);


module.exports = connection;