import express from 'express'
import { dbConnection } from './Database/dbConnection.js'
import bookRouter from './src/module/book/book.router.js'
import { userRouter } from './src/module/user/user.router.js'
import { appError } from './src/utlis/appError.js'


const app = express()
const port = 3000

app.use(express.json())

app.use(express.static('uploads'))
dbConnection()

app.use('/book', bookRouter)

app.use('/user',userRouter)

app.all('*',(req,res,next)=>{
    next(new appError('Invalid Url'+req.originalUrl),404)
})

app.use((err,req,res,next)=>{
    let code = err.statusCode||500
    res.status(code).json({message:err.message, statusCode:code,stack: err.stack})
})



app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))