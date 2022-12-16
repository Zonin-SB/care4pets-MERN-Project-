const express=require('express')
const router=express.Router()
const adminController=require('../controllers/adminControllers')



router.post('/api/adminLogin',adminController.adminLogin)


module.exports=router;