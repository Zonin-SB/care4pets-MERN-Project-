const express=require('express')
const router=express.Router()
const adminController=require('../controllers/adminControllers')
const auth=require('../middlewares/tokenAuth')



router.post('/api/adminLogin',adminController.adminLogin)
router.get('/api/userDetails',auth.adminAuth,adminController.getAllUsers)
router.get('/api/blockUser/:id',auth.adminAuth,adminController.blockUser)
router.get('/api/unblockUser/:id',auth.adminAuth,adminController.unblockUser)
router.get('/api/expertDetails',auth.adminAuth,adminController.getAllExperts)
router.get('/api/blockExpert/:id',auth.adminAuth,adminController.blockExpert)
router.get('/api/unblockExpert/:id',auth.adminAuth,adminController.unblockExpert)


module.exports=router;