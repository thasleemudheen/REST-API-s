const express =require('express')
const app=express()
const User=require('../model/userModel')
const bodyparser=require('body-parser')
const Movie=require('../model/movieModel')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
require('dotenv').config()
app.use(bodyparser.json())

const home=async(req,res)=>{
    try {
        const moviesList=await Movie.find()
        // console.log(moviesList)
        res.status(200).json(moviesList)
    } catch (error) {
        console.log('something went wrong with showing movies')
        res.status(500).json({message:'internal server error'})
    }
    
}
const signUpPostPage=async(req,res)=>{
       const {name,email,password}=req.body
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
    const {email,password}=req.body;
    try {
        const user=await User.findOne({email})
    // console.log(user)
    if(!user){
        return res.status(400).json({message:'user does not exist with this email'})
    }
    const validPassword=await bcrypt.compare(password,user.password)
    // console.log(validPassword)
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
    return res.status(200).json({message:'user login successfully',token})
    } catch (error) {
        // console.log(error)
        res.status(500).json({message:'something went wrong while uesr login'})
    }
    
}
const changeProfile=async(req,res)=>{
   const token=req.cookies.token
   const {...profile}=req.body
  try {
    // console.log(token)
    if(!token){
     return res.status(404).json({message:'token not found'})
    }
    const decoded=jwt.verify(token,process.env.JWT_SECRET)
    const userId=decoded.id
    console.log(userId)
    const user=await User.findOneAndUpdate({_id:userId},profile,{new:true})
    if(!user){
        return res.status(404).json({message:'user not updated'})
    }
    res.status(200).json({message:'profile updated successfully'})
    console.log(user)
    console.log(profile)
  } catch (error) {
      console.log('user profile is not updated')
      res.status(500).json({message:'somthing went wrong with updating user details'})
  }
  
}
const logOutUser=async(req,res)=>{
    try {
        const token=req.user
        console.log(token)
        res.clearCookie('token')
        res.status(200).json({message:'token founded and logout'})
    } catch (error) {
         res.status(500).json({message:'internal server error'})
    }
}
 
module.exports={
    home,
   signUpPostPage,
   loginPostPage,
   changeProfile,
   logOutUser
    
}