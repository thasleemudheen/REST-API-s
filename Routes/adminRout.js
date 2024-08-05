const express=require('express')
const app=express()
const router=express.Router()
const adminController=require('../Controller/adminController')
const verifyAdmin=require('../middleWare/verifyAdmin')

router.post('/adminLogin',adminController.adminLogin)
router.post('/admin',verifyAdmin,adminController.addProduct)
router.get('/movies',verifyAdmin,adminController.listMovies)
router.delete('/deleteMovie',verifyAdmin,adminController.adminDeleteMovies)
router.patch('/editMovie',verifyAdmin,adminController.adminEditMovies)

module.exports=router