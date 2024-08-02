const express=require('express')
const app=express()
const Movie=require('../')
const addProduct=async(req,res)=>{
    const {name,price,qunatity}=req.query
    console.log(req.query)
    res.status(200).json({message:'product is getting'})
}

module.exports={
    addProduct
}

