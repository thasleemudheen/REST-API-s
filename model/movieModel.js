const mongoose=require('mongoose')

const moveiSchema=new mongoose.schema({
          movieName:{
            type:String,
            required:true
          },
          moviePrice:{
            type:String,
            required:true
          },
          description:{
            type:String,
            required:true
          },
          duration:{
            type:Number,
            required:true
          }
})
const Movie=mongoose.model('movie',moveiSchema)
module.exports=Movie;