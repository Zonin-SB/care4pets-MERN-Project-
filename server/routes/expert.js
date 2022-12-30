const express=require('express')
const router=express.Router()
const expertController=require('../controllers/expertControllers')
const {upload}=require('../middlewares/fileUpload')

router.post('/api/expertSignup',expertController.expertSignup)
router.post('/api/expertLogin',expertController.expertLogin)
router.post('/api/applyToVerify',upload.array('files'),expertController.multipleFileUpload)


module.exports=router;