const express=require('express')
const app=express()

const router=express.Router()
const controller=require('../Controller/controll')
const verifyUser=require('../middleWare/verifyUser')

router.get('/',controller.home)
router.post('/signup',controller.signUpPostPage)
router.post('/login',controller.loginPostPage)
router.patch('/editProfile',verifyUser,controller.changeProfile)

module.exports=router;
