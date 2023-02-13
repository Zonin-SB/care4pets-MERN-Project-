const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminControllers');
const auth = require('../middlewares/tokenAuth');

router.post('/api/adminLogin', adminController.adminLogin);
router.get('/api/userDetails', auth.adminAuth, adminController.getAllUsers);
router.get('/api/blockUser/:id', auth.adminAuth, adminController.blockUser);
router.get('/api/unblockUser/:id', auth.adminAuth, adminController.unblockUser);
router.get('/api/expertDetails', auth.adminAuth, adminController.getAllExperts);
router.get('/api/blockExpert/:id', auth.adminAuth, adminController.blockExpert);
router.get(
  '/api/unblockExpert/:id',
  auth.adminAuth,
  adminController.unblockExpert
);
router.post('/api/addPlan', auth.adminAuth, adminController.addPlan);
router.get('/api/getAllPlan', auth.adminAuth, adminController.getAllPlan);
router.get('/api/deletePlan/:id', auth.adminAuth, adminController.deletePlan);
router.get(
  '/api/getPlanDetails/:id',
  auth.adminAuth,
  adminController.getPlanDetails
);
router.post('/api/editPlan', auth.adminAuth, adminController.editPlan);
router.get(
  '/api/getPendingApprovalCount',
  auth.adminAuth,
  adminController.getPendingApprovalCount
);
router.get('/api/getUsersCount', auth.adminAuth, adminController.getUsersCount);
router.get(
  '/api/getExpertsCount',
  auth.adminAuth,
  adminController.getExpertsCount
);
router.get(
  '/api/getPendingApprovalDetails',
  auth.adminAuth,
  adminController.getPendingApprovalDetails
);
router.get(
  '/api/getExpertAllDetails/:id',
  auth.adminAuth,
  adminController.getExpertAllDetails
);
// router.get('/api/approveExpert/:id',auth.adminAuth,adminController.approveExpert)
router.post('/api/rejectExpert', auth.adminAuth, adminController.rejectExpert);
router.post('/api/acceptExpert', auth.adminAuth, adminController.acceptExpert);
router.get(
  '/api/getVideoApprovalList',
  auth.adminAuth,
  adminController.getVideoApprovalList
);
router.get(
  '/api/getVideoDetails/:id',
  auth.adminAuth,
  adminController.getVideoDetails
);
router.get(
  '/api/approveVideo/:id',
  auth.adminAuth,
  adminController.approveVideo
);
router.get('/api/getAllVideos', auth.adminAuth, adminController.getAllVideos);
router.get('/api/deleteVideo/:id', auth.adminAuth, adminController.deleteVideo);
router.get(
  '/api/getVideoApprovalCount',
  auth.adminAuth,
  adminController.getVideoApprovalCount
);
router.get(
  '/api/getEditVideoDetails/:id',
  auth.adminAuth,
  adminController.getEditVideoDetails
);
router.post(
  '/api/adminEditVideo',
  auth.adminAuth,
  adminController.adminEditVideo
);
router.post(
  '/api/adminRejectVideo',
  auth.adminAuth,
  adminController.adminRejectVideo
);
router.get(
  '/api/getPaymentDetails',
  auth.adminAuth,
  adminController.getPaymentDetails
);
router.get(
  '/api/getPaymentAllDetails/:id',
  auth.adminAuth,
  adminController.getPaymentAllDetails
);
router.get('/api/getFeedback', auth.adminAuth, adminController.getFeedback);
router.get(
  '/api/approveFeedback/:id',
  auth.adminAuth,
  adminController.approveFeedback
);
router.get(
  '/api/disapproveFeedback/:id',
  auth.adminAuth,
  adminController.disapproveFeedback
);
router.get(
  '/api/getFeedbackDetails/:id',
  auth.adminAuth,
  adminController.getFeedbackDetails
);
router.get(
  '/api/deleteFeedback/:id',
  auth.adminAuth,
  adminController.deleteFeedback
);
router.get(
  '/api/getExpertDetailedView/:id',
  auth.adminAuth,
  adminController.getExpertDetailedView
);
router.get(
  '/api/getExpertChangeRequestCount',
  auth.adminAuth,
  adminController.getExpertChangeRequestCount
);
router.get(
  '/api/getRequestList',
  auth.adminAuth,
  adminController.getRequestList
);
router.get(
  '/api/getChangeRequestDetails/:id',
  auth.adminAuth,
  adminController.getChangeRequestDetails
);
router.get(
  '/api/getNewExpertDetails/:id',
  auth.adminAuth,
  adminController.getNewExpertDetails
);
router.post(
  '/api/adminRejectExpertChange/:id',
  auth.adminAuth,
  adminController.adminRejectExpertChange
);
router.post(
  '/api/adminApproveExpertChange/:id',
  auth.adminAuth,
  adminController.adminApproveExpertChange
);

module.exports = router;
