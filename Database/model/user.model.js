import mongoose from "mongoose";

const userSchema=mongoose.Schema({
name:String,
age:Number,
password:String,
email:{
    type:String,
    unique:true
},
loggedIn:{
    type:Boolean,
    default:false
},
online:{
    type:Boolean,
    default:false
},
deleted:{
    type:Boolean,
    default:false
},
confirmEmail:{
    type:Boolean,
    default:false
},
lastSeen:Date,
profileImage: String,
code:{
    type:String,
    default:''
}

},{
    timestamps:true
})

export const userModel=mongoose.model('user', userSchema)