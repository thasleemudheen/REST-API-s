const express=require('express')
const app=express()
const Movie=require('../model/movieModel')
const Admin=require('../model/adminModel')
const jwt=require('jsonwebtoken')
require('dotenv').config()

const adminLogin=async(req,res)=>{
    try {
        const {email,password}=req.body
        const admin=await Admin.findOne({email})
        if(!admin){
            return res.status(404).json({message:'admin not found'})
        }
        if(password !==admin.password){
            return res.status(404).json({message:'password incorrect'})
        }else{
            const token=jwt.sign({
                id:admin._id,
                email:admin.email,
                
            },
            process.env.JWT_SECRET,
            {expiresIn:'24h'}
        )
        console.log(token)
        res.cookie('adminToken',token,{httpOnly:true,maxAge:86400000})
            return res.status(200).json({message:'find the admin token created',token})
        }
        
    } catch (error) {
        console.log('cannot find the admin')
        res.status(404).json({message:'not found the admin'})
    }
    
}

const addProduct=async(req,res)=>{
    
    const {movieName,moviePrice,description,language,movieId}=req.body
    try {
        
        if(!movieName||!moviePrice || !description || !language || !movieId){
            return res.status(400).json({message:'must include all fields something is missing'})
        }else{
            const newMovie=new Movie({movieName,moviePrice,description,language,movieId})
            await newMovie.save()
            res.status(200).json({message:'movie added successfully'})
        }
    } catch (error) {
        console.log('movie did not added')
        res.status(500).json({message:'movies did not added '})
    }
  
}
const listMovies=async(req,res)=>{
    try {
        const movies=await Movie.find()
        // console.log(movies)
        res.status(200).json(movies)
    } catch (error) {
        console.log('something went wrong with shwoing movies')
        res.status(500).json({message:'internal server error'})
    }
   
}
const adminDeleteMovies=async(req,res)=>{
    try {
        const {movieId}=req.query;
        console.log(movieId)
        if(!movieId){
         return res.status(404).json({message:'movie id is not provided'})
        }
        console.log('its not coming')
        const movies=await Movie.deleteOne({movieId:movieId})
        console.log(movies)
        if(!movies){
         return res.status(404).json({message:'movie not found and deleted'})
        }else{
         res.status(200).json({message:'movei successfully deleted'})
        }
    } catch (error) {
        console.log('deleting is not successful')
        res.status(500).json({message:'there is an error with deleting the movie'})
    }
}
const adminEditMovies=async(req,res)=>{
    try {
        const {movieId,...details}=req.query
        console.log(movieId)
        console.log(details)
        if(!movieId){
            return res.status(404).json({message:'movieId is not getting'})
        }
        console.log('its here')
        const movies = await Movie.findOneAndUpdate({movieId}, details, { new: true });
        console.log(movies)
        if(!movies){
            return res.status(400).json({message:'movies not found'})
        }
        res.status(200).json({message:'movie details updated successfully'})
    } catch (error) {
        console.log('something went wrong with the editing')
        res.status(404).json({message:'there is an error with updating the details'})
    }
   
}

module.exports={
    adminLogin,
    addProduct,
    listMovies,
    adminDeleteMovies,
    adminEditMovies
}

