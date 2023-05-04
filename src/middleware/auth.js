import  jwt from "jsonwebtoken";


const authUser=async(req,res,next)=>{
const token=req.header('token')

jwt.verify(token,"kareemhany123",(err,decoded)=>{
        if(err){
            res.ejson(err)
        }else{
            req.userId=decoded.user._id
            next()
        }
    })
}