import mongoose from "mongoose";

const bookSchema=mongoose.Schema({
title: String,
createdBy:{
    type: mongoose.Types.ObjectId,
    ref:'user'
},
path: String,

},{
    timestamps:true
})

export const bookModel=mongoose.model('book', bookSchema)