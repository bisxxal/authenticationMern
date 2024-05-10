const express = require('express')
const dotenv = require('dotenv')
const userRouter = require('./routes/user')
const mongoose = require('mongoose')
const userModel = require('./models/user')
const cors = require ('cors')
const app = express();
const path = require('path')
dotenv.config()
app.use(express.json())
app.use(cors({
    origin:["http://localhost:5173"],
    credentials:true
}))
const cookieParser = require('cookie-parser')

app.use(cookieParser())
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,'public')))

app.use('/auth',userRouter)
mongoose.connect('mongodb://127.0.0.1:27017/mernauth')


 
app.listen(process.env.PORT , ()=>{
    console.log('server running');
})