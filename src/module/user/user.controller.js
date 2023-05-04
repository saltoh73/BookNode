import { userModel } from "../../../Database/model/user.model.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { errorCatch } from "../../middleware/errorHandling.js";
import { appError } from "../../utlis/appError.js";
import { nanoid } from 'nanoid'
import { sendEmail2 } from "../../utlis/Code/sendCode.js";
import { sendEmail } from "../../utlis/Email/sendEmail.js";



export const signUp=errorCatch(async(req,res,next)=>{
    const {email,password,age,name}=req.body
    let user = await userModel.findOne({email})
    if(user){
        // res.json({mesaage:'Failed Email or Paaword'})
        return next(new appError('Failed Email or Paaword to SignUp'))
    }else{
        const hash = bcrypt.hashSync(password, 8);
        const user=await userModel.insertMany({email,age,name,password:hash})
        sendEmail2({email})
        sendEmail({email})

        res.json({mesaage: 'Success',user})
    }
}

)



export const signIn =errorCatch(async (req,res,next)=>{
    const {email,password}=req.body
    const user= await userModel.findOne({email})
    if(!user || !await bcrypt.compare(password, user.password)){
        return next(new appError('Failed Email or Paaword'))
    }

    user.password=undefined

    const token = jwt.sign({ user}, 'kareemhany123');

    res.json({message:"Success",token})

}
)
















export const verify=errorCatch(async (req,res,next)=>{
    const {token}=req.params

    jwt.verify(token,'kareemhanys',async (err,decoded)=>{
        if(err){
            return next(new appError(err))

        }else{
              await userModel.findOneAndUpdate({email:decoded.email},{confirmedEmail: true})
    res.json({message:'success'})
        }
    })
  
    
})


export const resetPass=errorCatch(async (req,res,next)=>{
    const {token}=req.params
    const {newPass,code}=req.body


    jwt.verify(token,'kareemhany011',async (err,decoded)=>{
        if(err){
            return next(new appError(err))

        }else{
           const user=   await userModel.findById(decoded.id)
              if(user){
const match=await bcrypt.compare( user.password,newPass)
if(match){
    next(new appError('Failed Code'))
}else{
    const hash = bcrypt.hashSync(newPass, 8)
    const user= await userModel.updateOne({code},{password:hash},{new:true})
res.json({message:'Success'})
}

              }else{
                next(new appError('Failed Code'))
              }
    // res.json({message:'success'})
        }
    })
  
    
})






export const forgetPass=errorCatch(async (req,res,next)=>{
    const {email}=req.body
    const user = await userModel.find({email})
if(user){
    let code =nanoid(7)

 let user =  await userModel.findOneAndUpdate({email},{code},{new:true})
    res.json({message:'success',code, email})
        
}else{

    next(new appError('Failed Code'))
}

    
})

export const logOut=errorCatch(async(req,res,next)=>{

    const {email}=req.body
    const user = await userModel.findOne({email})
    if(user){
        next(new appError('Failed '))

    }else{
        const user =await userModel.findOneAndUpdate({email,loggedIn:true,online:true},{loggedIn:false, online:false})
        res.json({message:'Success'})
    }
})



export const getall=async(req,res)=>{
  let user=  await userModel.find()
    res.json({message:"success",user})
}