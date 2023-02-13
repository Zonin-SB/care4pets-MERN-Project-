const express = require('express');
const router = express.Router();
const userController = require('../controllers/userControllers');
const auth = require('../middlewares/tokenAuth');

router.post('/api/userSignup', userController.userSignup);
router.post('/api/userLogin', userController.userLogin);
router.post('/api/userSendOTP', userController.userSendOTP);
router.post('/api/verifyOTP', userController.verifyOTP);
router.get(
  '/api/getUserDetails/:id',
  auth.userAuth,
  userController.getUserDetails
);
router.post(
  '/api/updateUserProfile',
  auth.userAuth,
  userController.updateUserProfile
);
router.post('/api/uploadUserProfilePic', userController.uploadProfilePic);
router.post(
  '/api/userProfilePicUpdate',
  auth.userAuth,
  userController.userProfilePicUpdate
);
router.get(
  '/api/getUsersExpert/:id',
  auth.userAuth,
  userController.getUsersExpert
);
router.get('/api/selectExpert/:id', auth.userAuth, userController.selectExpert);
router.get('/api/selectPlan/:id', auth.userAuth, userController.selectPlan);
router.post(
  '/api/create-checkout-session',
  auth.userAuth,
  userController.buyPlan
);
router.post(
  '/api/postPlanOrderValues',
  auth.userAuth,
  userController.postPlanOrderValues
);
router.get(
  '/api/getFreeVideos/:id',
  auth.userAuth,
  userController.getFreeVideos
);
router.get(
  '/api/getVideosCount/:id',
  auth.userAuth,
  userController.getVideosCount
);
router.get(
  '/api/getPlanDetails/:id',
  auth.userAuth,
  userController.getPlanDetails
);
router.get(
  '/api/getExpertChangeRejected/:id',
  auth.userAuth,
  userController.getExpertChangeRejected
);
router.get(
  '/api/getExpertChangeApproved/:id',
  auth.userAuth,
  userController.getExpertChangeApproved
);
router.get(
  '/api/getExpertChangeNotification/:id',
  auth.userAuth,
  userController.getExpertChangeNotification
);
router.get(
  '/api/userExpertRejectionAccepted/:id',
  auth.userAuth,
  userController.userExpertRejectionAccepted
);
router.get(
  '/api/userExpertChangeAccepted/:id',
  auth.userAuth,
  userController.userExpertChangeAccepted
);
router.get(
  '/api/getUserPlanDetails/:id',
  auth.userAuth,
  userController.getUserPlanDetails
);
router.get(
  '/api/getPlanVideos/:id',
  auth.userAuth,
  userController.getPlanVideos
);
router.get(
  '/api/getYourExpertDetails/:id',
  auth.userAuth,
  userController.getYourExpertDetails
);
router.post('/api/sendMessage/:id', auth.userAuth, userController.sendMessage);
router.get(
  '/api/getAllMessages/:id',
  auth.userAuth,
  userController.getAllMessages
);
router.get(
  '/api/checkUserPlan/:id',
  auth.userAuth,
  userController.checkUserPlan
);
router.post('/api/sendFeedback', auth.userAuth, userController.sendFeedback);
router.post(
  '/api/userChangeExpert',
  auth.userAuth,
  userController.userChangeExpert
);

router.get('/api/viewAllPlan', userController.viewAllPlan);
router.get('/api/getExperts', userController.getExperts);
router.get('/api/getHomeFeedback', userController.getHomeFeedback);
// router.get('/api/getUserHomePlan/:id',userController.getPlanDetails)

module.exports = router;
