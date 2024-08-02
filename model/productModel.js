const mongoose=require('mongoose')

const productSchema=new mongoose.schema({
          productName:{
            type:String,
            required:true
          },
          price:{
            type:String,
            required:true
          },

})