const express = require("express"); // importing the express from packages
require('dotenv').config(); //importing the dotenv.
const cors = require('cors') // importing cors from packages.

const connection = require("./config/db"); // importing the connection from the db file.
const userRouter = require("./routes/user.route"); // importing userRouter from the user.router file.
const productRouter = require("./routes/product.route"); // importing productRouter from the product.route file.
const cartRouter = require("./routes/cart.route");
const wishlistRouter = require("./routes/wishlist.route");
const addressRouter = require("./routes/address.route");

const app = express(); // creating the application using express
const port = process.env.PORT; // importing the value of the port from the .env




app.use(cors()); // appling cors middleware.
app.use(express.json()); // applying the json middleware

// this is the get request [just for the demo purpose] (http://localhost:1010/);
app.get("/" , (req,res) => {
    res.send("You are on the home page of raj parmar's first own website...");
});

app.use("/user" , userRouter); // applying the user router with use of middleware

app.use("/product" , productRouter); // applying the product router with use of middleware

app.use("/cart" , cartRouter);

app.use("/wishlist" , wishlistRouter);

app.use("/addresslist" , addressRouter);


// this is for creating the server.
app.listen(port , async () => {
    try {
        await connection;
        console.log("successfully connected to the DataBase");
    } catch (error) {
        console.log("failed to connect the DataBase due to :- " , error);
    }
    console.log("server is started successfully...");
});
