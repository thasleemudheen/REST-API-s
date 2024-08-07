const express=require('express')
const mongoose=require('mongoose')
const app=express()
const userRouter=require('./Routes/route')
const adminRoute=require('./Routes/adminRout')
const bodyparser=require('body-parser')
const cookieparser=require('cookie-parser')
const {swaggerui,swaggerSpec}=require('./swaggerConfig')
app.use('/api-doc',swaggerui.serve,swaggerui.setup(swaggerSpec))
app.use(cookieparser())
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:true}))
app.use(express.json())
app.use('/',userRouter)
app.use('/',adminRoute)

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
app.listen(3004,()=>{
    console.log('port running at http://localhost:3004/ ')
})