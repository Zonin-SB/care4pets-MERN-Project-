const express=require('express')
const router=express.Router()
const userController=require('../controllers/userControllers')
const auth=require('../middlewares/tokenAuth')


router.post('/api/userSignup',userController.userSignup)
router.post('/api/userLogin',userController.userLogin)
router.get('/api/getUserDetails/:id',auth.userAuth,userController.getUserDetails)
router.post('/api/updateUserProfile',auth.userAuth,userController.updateUserProfile)
router.post('/api/uploadUserProfilePic',userController.uploadProfilePic)
router.post('/api/userProfilePicUpdate',auth.userAuth,userController.userProfilePicUpdate)
router.get('/api/getUsersExpert/:id',auth.userAuth,userController.getUsersExpert)
// router.post('/api/selectExpert',auth.userAuth,userController.selectExpert)
router.get('/api/selectExpert/:id',auth.userAuth,userController.selectExpert)
router.get('/api/selectPlan/:id',auth.userAuth,userController.selectPlan)
router.post('/api/create-checkout-session',auth.userAuth,userController.buyPlan)
router.post('/api/postPlanOrderValues',auth.userAuth,userController.postPlanOrderValues)
router.get('/api/getFreeVideos/:id',auth.userAuth,userController.getFreeVideos)
router.get('/api/getVideosCount/:id',auth.userAuth,userController.getVideosCount)
router.get('/api/getPlanDetails/:id',auth.userAuth,userController.getPlanDetails)
router.get('/api/getPlanVideos/:id',auth.userAuth,userController.getPlanVideos)
router.get('/api/getYourExpertDetails/:id',auth.userAuth,userController.getYourExpertDetails)
router.post('/api/sendMessage/:id',auth.userAuth,userController.sendMessage)
router.get('/api/getAllMessages/:id',auth.userAuth,userController.getAllMessages)

router.get('/api/viewAllPlan',userController.viewAllPlan)
router.get('/api/getExperts',userController.getExperts)


module.exports=router;