const mongoose = require("mongoose");
require('dotenv').config();

const mongoUrl = process.env.URL;

const connection = mongoose.connect(mongoUrl);


module.exports = connection;