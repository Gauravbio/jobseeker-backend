const { emailChecker, generateToken } = require("./helpers");
const bcrypt=require("bcrypt");
const User = require("./model");

exports.createUser=async (req,res)=>{
    try {
        const {name,email,password,username}=req.body;

        if(!name || !email || !password || !username) {
            return res.status(400).json({message: "invalid request body"});
        }

        const user=await User.find({email});
        // console.log(user);
        if(user.length>0) {
            return res.status(400).json({
                message: "user already exists"
            })
        }

        const hashed_password = await bcrypt.hash(password,10);
        
        const new_user=await User.create({
            name,
            email,
            hashed_password,
            username
        });
        
        const token=generateToken(new_user);
        return res.status(201).json({
            message: "User created",
            user : new_user,
            token
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}

exports.googleLogin=async ()=> {
    try {
        const {name,email,picture: avatar,exp }=req.body;
        let user=await User.find({email});

        if(!user) {
            user=await User.create({
                name,
                email,
                avatar,
            })
        }
        const token=generateToken(user,exp);
        return res.status(200).json({
            message: "User created",
            user,
            token
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}

exports.loginUser=async (req,res)=> {
    try {
        const {email,password}=req.body;

        if(!email || !password) {
            return res.status(400).json({
                message: "Invalid request body"
            })
        }

        const user=await User.find({email});

        if(!user) {
            return res.status(400).json({
                message: "Please Login"
            })
        }

        return res.status(200).json({
            message: "Loggedin Successfully",
            user
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}