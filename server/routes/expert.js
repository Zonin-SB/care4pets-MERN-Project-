const express = require('express');
const router = express.Router();
const expertController = require('../controllers/expertControllers');
const auth = require('../middlewares/tokenAuth');

router.post('/api/expertSignup', expertController.expertSignup);
router.post('/api/expertLogin', expertController.expertLogin);
router.post('/api/expertSendOTP', expertController.expertSendOTP);
router.post('/api/verifyOTP', expertController.verifyOTP);
router.post('/api/uploadDocuments', expertController.uploadDocuments);
router.post(
  '/api/expertApplyVerification',
  auth.expertNotverifiedAuth,
  expertController.expertApplyVerification
);
router.get(
  '/api/getExpertDetails/:id',
  auth.expertNotverifiedAuth,
  expertController.getExpertDetails
);
router.get(
  '/api/getDetails/:id',
  auth.expertNotverifiedAuth,
  expertController.getDetails
);
router.get(
  '/api/expertRejectionAccepted/:id',
  auth.expertNotverifiedAuth,
  expertController.expertRejectionAccepted
);
router.get(
  '/api/expertAccepted/:id',
  auth.expertNotverifiedAuth,
  expertController.expertAccepted
);
router.post(
  '/api/expertVideoUpload',
  auth.expertVerifiedAuth,
  expertController.expertVideoUpload
);
router.get(
  '/api/getAllVideos/:id',
  auth.expertVerifiedAuth,
  expertController.getAllVideos
);
router.get(
  '/api/getVideoDetails/:id',
  auth.expertVerifiedAuth,
  expertController.getVideoDetails
);
router.post(
  '/api/editVideo',
  auth.expertVerifiedAuth,
  expertController.editVideo
);
router.post(
  '/api/deleteVideo',
  auth.expertVerifiedAuth,
  expertController.deleteVideo
);
router.get(
  '/api/getRejectedVideoCount/:id',
  auth.expertVerifiedAuth,
  expertController.getRejectedVideoCount
);
router.get(
  '/api/getRejectedVideos/:id',
  auth.expertVerifiedAuth,
  expertController.getRejectedVideos
);
router.get(
  '/api/getRejectedVideoDetails/:id',
  auth.expertVerifiedAuth,
  expertController.getRejectedVideoDetails
);
router.get(
  '/api/expertVideoRejected/:id',
  auth.expertVerifiedAuth,
  expertController.expertVideoRejected
);
router.get(
  '/api/getVideosCount/:id',
  auth.expertVerifiedAuth,
  expertController.getVideosCount
);
router.get(
  '/api/getAllClients/:id',
  auth.expertVerifiedAuth,
  expertController.getAllClients
);
router.get(
  '/api/getClientDetails/:id',
  auth.expertVerifiedAuth,
  expertController.getClientDetails
);
router.post(
  '/api/sendMessage/:id',
  auth.expertVerifiedAuth,
  expertController.sendMessage
);
router.get(
  '/api/getAllMessages/:id',
  auth.expertVerifiedAuth,
  expertController.getAllMessages
);
router.get(
  '/api/getClientsCount/:id',
  auth.expertVerifiedAuth,
  expertController.getClientsCount
);
router.get(
  '/api/getExpertEditDetails/:id',
  auth.expertVerifiedAuth,
  expertController.getExpertEditDetails
);
router.post(
  '/api/updateExpertProfile',
  auth.expertVerifiedAuth,
  expertController.updateExpertProfile
);

module.exports = router;
