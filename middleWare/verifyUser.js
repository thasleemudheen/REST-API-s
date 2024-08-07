const jwt=require('jsonwebtoken')
require('dotenv').config()

const verifyUser=async(req,res,next)=>{
    // const authHeader=req.headers.authorization

    // if(!authHeader){
    //     return res.status(404).json({message:'not token provided'})
    // }
    const token=req.cookies.token
    console.log(token)

    if(token){
        jwt.verify(token,process.env.JWT_SECRET,(err,decodedToken)=>{
            if(err){
                res.status(500).json({message:'admin wants to login'})
            }else{
                req.user=decodedToken.id
                next()
            }
        })
    }else{
        res.status(500).json({message:'internal server error'})
    }
}

module.exports=verifyUser