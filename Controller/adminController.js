const express=require('express')
const app=express()

const addProduct=async(req,res)=>{
    const {name,price,qunatity}=req.query
    console.log(req.query)
    res.json({message:'product is getting'})
}

module.exports={
    addProduct
}

