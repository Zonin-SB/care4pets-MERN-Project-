const express=require('express')
const router=express.Router()
const expertController=require('../controllers/expertControllers')

router.post('/api/expertSignup',expertController.expertSignup)
router.post('/api/expertLogin',expertController.expertLogin)


module.exports=router;