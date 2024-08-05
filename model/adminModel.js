const mongoose=require('mongoose')

const adminSchema=new mongoose.Schema({
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        required:true
    }
})
const Admin=mongoose.model('Admin',adminSchema)
module.exports=Admin