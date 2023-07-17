const express=require("express");
const connectDatabase = require("./config/database");
const app=express();
require("dotenv").config();
connectDatabase();

//middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get('/',(req,res)=> {
    res.send('<h1>Hello World</h1>');
})

// user routes
const userRoutes = require("./users/route");
const { emailChecker } = require("./users/helpers");
const { TokenExpiredError } = require("jsonwebtoken");
app.use('/user',userRoutes);

// emailChecker();

app.listen(process.env.PORT,()=> {
    console.log("server is listening");
});