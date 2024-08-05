const mongoose=require('mongoose')

const moveiSchema=new mongoose.Schema({
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
          language:{
            type:String,
            required:true
          },
          movieId:{
            type:String,
            required:true
          }
})
const Movie=mongoose.model('movie',moveiSchema)
module.exports=Movie;