import express, { Router } from 'express'
import {  forgetPass, getall, logOut, resetPass, signIn, signUp, verify } from './user.controller.js'
 
export const userRouter =express.Router()

userRouter.post('/signUp', signUp)
userRouter.post('/signIn',signIn)
userRouter.get('/verify/:token', verify)
userRouter.put('/forgetPass', forgetPass)
userRouter.put('/resetpass/:token', resetPass)
userRouter.put('/logout', logOut)
userRouter.get('/',getall)