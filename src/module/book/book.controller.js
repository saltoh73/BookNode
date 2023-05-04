import { bookModel } from "../../../Database/model/book.model.js";
import { errorCatch } from "../../middleware/errorHandling.js";

export const addPhoto=async (req,res)=>{
        const{createdBy}=req.body
        if(!req.file){
            return res.json({message:'Image Only'})
        }
        await bookModel.insertMany({path: req.file.filename, createdBy})
        res.json({message:'success'})
    }



export const addBook=async(req,res)=>{
    const{title,createdBy}=req.body
    await bookModel.insertMany({title,createdBy})
    res.json({message:"success"})
}

export const getbook=async(req,res)=>{
 let book=  await bookModel.find({})
    res.json({message:'success',book})
}