const express = require("express");
require('dotenv').config();

const connection = require("./config/db");


const app = express();
const port = process.env.PORT;


app.use(express.json());

app.get("/" , (req,res) => {
    res.send("You are on the home page of raj parmar's first own website...");
});

app.listen(port , async () => {
    try {
        await connection;
        console.log("successfully connected to the DataBase");
    } catch (error) {
        console.log("failed to connect the DataBase due to :- " , error);
    }
    console.log("server is started successfully...");
});
