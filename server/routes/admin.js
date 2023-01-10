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
router.post('/api/addPlan',auth.adminAuth,adminController.addPlan)
router.get('/api/getAllPlan',auth.adminAuth,adminController.getAllPlan)
router.get('/api/deletePlan/:id',auth.adminAuth,adminController.deletePlan)
router.get('/api/getPlanDetails/:id',auth.adminAuth,adminController.getPlanDetails)
router.post('/api/editPlan',auth.adminAuth,adminController.editPlan)
router.get('/api/getPendingApprovalCount',auth.adminAuth,adminController.getPendingApprovalCount)
router.get('/api/getUsersCount',auth.adminAuth,adminController.getUsersCount)
router.get('/api/getExpertsCount',auth.adminAuth,adminController.getExpertsCount)
router.get('/api/getPendingApprovalDetails',auth.adminAuth,adminController.getPendingApprovalDetails)
router.get('/api/getExpertAllDetails/:id',auth.adminAuth,adminController.getExpertAllDetails)
router.get('/api/approveExpert/:id',auth.adminAuth,adminController.approveExpert)


module.exports=router;