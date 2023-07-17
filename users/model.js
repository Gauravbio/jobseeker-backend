const mongoose=require('mongoose');
const bcrypt=require("bcrypt");
const {Schema}=mongoose;

const userSchema=new Schema({
    name: {
        type: String,
        required: [true,"Field required"]
    },
    password:{
        type: String,
        select: false,
    },
    email:{
        type: String,
        required: [true,"Field required"],
        unique: true,
    },
    username:{
        type: String,
        unique: true,
    },
    avatar:{
        type: String,
    },
    posts:[
        {
            type: mongoose.Types.ObjectId,
            // ref:"post"
        }
    ],
})


const User=mongoose.model("User",userSchema);
module.exports=User;