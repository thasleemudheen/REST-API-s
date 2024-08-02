const express =require('express')
const app=express()
const User=require('../model/userModel')
const bodyparser=require('body-parser')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
require('dotenv').config()
app.use(bodyparser.json())
const home=((req,res)=>{
    res.send('thasleemudheen')
})
const signUpPostPage=async(req,res)=>{
       const {name,email,password}=req.query
       if(!name || !email || !password){
       return res.status(404).json({message:'not getting the user details '})
       }
       try {
        let user=await User.findOne({email})
       if(user){
         return res.status(404).json({message:'user already exist '})
       } else{
            const hashedPassword=await bcrypt.hash(password,10)
            const newUser=new User({
             name,
             email,
             password:hashedPassword
            })
            await newUser.save()
        }
             return res.status(200).json({message:'user singup successfully'})
       } catch (error) {
        res.status(500).json({message:'internal server error'})
       }
       
}
const loginPostPage=async(req,res)=>{
    const {email,password}=req.query;
    try {
        const user=await User.findOne({email})
    console.log(user)
    if(!user){
        return res.status(400).json({message:'user does not exist with this email'})
    }
    const validPassword=await bcrypt.compare(password,user.password)
    console.log(validPassword)
    if(!validPassword){
        return res.status(400).json({message:'password is not valid'})
    }
    const token=jwt.sign({
        id:user._id,
        name:user.name,
        email:user.email,
    },process.env.JWT_SECRET,{
        expiresIn:'24h'
    })
    res.cookie('token',token,{httpOnly:true,maxAge:86400000})
    return res.status(200).json({message:'user login successfully'})
    } catch (error) {
        console.log(error)
        res.status(500).json({message:'something went wrong while uesr login'})
    }
    
}
module.exports={
    home,
   signUpPostPage,
   loginPostPage,
    
}