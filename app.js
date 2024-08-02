const express=require('express')
const mongoose=require('mongoose')
const app=express()
const userRouter=require('./Routes/route')
const adminRoute=require('./Routes/adminRout')
const bodyparser=require('body-parser')
app.use(bodyparser.json())
app.use('/',userRouter)
app.use('/',adminRoute)
app.use(express.json())
 const mongoDB=async ()=>{
    try {
        await mongoose.connect('mongodb://localhost:27017/restapi')
        console.log('mongoDb is connected to server')
    } catch (error) {
         console.error(error)
         console.log('something went wrong with connecting to mongodb')
    }
    
 }
 mongoDB()
app.listen(3001,()=>{
    console.log('port running at http://localhost:3001/ ')
})