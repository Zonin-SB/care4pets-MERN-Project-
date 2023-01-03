const express=require('express')
const router=express.Router()
const userController=require('../controllers/userControllers')
const auth=require('../middlewares/tokenAuth')


router.post('/api/userSignup',userController.userSignup)
router.post('/api/userLogin',userController.userLogin)
router.get('/api/getUserDetails/:id',auth.userAuth,userController.getUserDetails)
router.post('/api/updateUserProfile',auth.userAuth,userController.updateUserProfile)

router.get('/api/viewAllPlan',userController.viewAllPlan)


module.exports=router;