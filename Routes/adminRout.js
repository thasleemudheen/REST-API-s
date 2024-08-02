const express=require('express')
const app=express()
const router=express.Router()
const adminController=require('../Controller/adminController')

router.post('/admin',adminController.addProduct)

module.exports=router