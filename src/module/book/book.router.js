import express from 'express'
import { uploadFile } from '../../utlis/UploadFile.js'
import { addBook, addPhoto, getbook } from './book.controller.js'
 
 const bookRouter =express.Router()

bookRouter.post('/',uploadFile('book'),addPhoto)
bookRouter.post('/add',addBook)
bookRouter.get('/', getbook)

export default bookRouter