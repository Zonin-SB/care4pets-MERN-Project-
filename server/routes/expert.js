const express=require('express')
const router=express.Router()
const expertController=require('../controllers/expertControllers')
const auth=require('../middlewares/tokenAuth')


router.post('/api/expertSignup',expertController.expertSignup)
router.post('/api/expertLogin',expertController.expertLogin)
router.post('/api/uploadDocuments',expertController.uploadDocuments)
router.post('/api/expertApplyVerification',auth.expertNotverifiedAuth,expertController.expertApplyVerification)
router.get('/api/getExpertDetails/:id',auth.expertNotverifiedAuth,expertController.getExpertDetails)

module.exports=router;