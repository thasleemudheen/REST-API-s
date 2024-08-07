const jwt=require('jsonwebtoken')
require('dotenv').config()
// const cookieparser=require('cookie-parser')
// const express=require('express')
// const app=express()
// app.use(cookieparser())
const verifyAdmin=async(req,res,next)=>{
     const token=req.cookies.adminToken
    //  console.log(toks)
    // const authHeader=req.headers.authorization
    // // console.log(authHeader)
    // if (!authHeader) {
    //     return res.status(403).json({ message: 'No token provided' });
    //   }
    //   const token = authHeader.split(' ')[1];
    //   console.log(token)
     if(token){
      jwt.verify(token,process.env.JWT_SECRET,(err,decodedToken)=>{
        if(err){
            res.status(500).json({message:'admin wants to login'})
        }else{
            req.admin=decodedToken.id
            next()
        }
      })
     }
     else{
        res.status(500).json({message:'admin wants to login'})
     }
}

module.exports=verifyAdmin