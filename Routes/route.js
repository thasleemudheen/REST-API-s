const express=require('express')
const app=express()

const router=express.Router()
const controller=require('../Controller/controll')
router.get('/',controller.home)
router.post('/signup',controller.signUpPostPage)
router.post('/login',controller.loginPostPage)
module.exports=router;
