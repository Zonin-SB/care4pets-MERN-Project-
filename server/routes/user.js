const express=require('express')
const router=express.Router()
const userController=require('../controllers/userControllers')


router.post('/api/userSignup',userController.userSignup)
router.post('/api/userLogin',userController.userLogin)


module.exports=router;