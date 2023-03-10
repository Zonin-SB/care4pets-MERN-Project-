const adminUtilities = require('../utilities/adminUtilities');
const jwt = require('jsonwebtoken');
const { response } = require('express');

const adminLogin = (req, res) => {
  const data = req.body;

  adminUtilities.doAdminLogin(data).then((response) => {
    if (response.status) {
      const token = jwt.sign(
        {
          adminId: response.admin._id,

          email: response.admin.email,
        },
        process.env.JWT_SECRET_KEY
      );
      return res.json({ status: 'ok', admin: token });
    } else {
      return res.json({ status: 'error', admin: false });
    }
  });
};

const getAllUsers = (req, res) => {
  adminUtilities
    .userDetails()
    .then((details) => {
      res.json({ status: 'ok', userDetails: details });
    })
    .catch((err) => {
      console.log(err);
    });
};

const blockUser = (req, res) => {
  const id = req.params.id;
  adminUtilities
    .blockUser(id)
    .then((details) => {
      res.json({ status: 'ok', blocked: true, userDetails: details });
    })
    .catch((err) => {
      console.log(err);
    });
};

const unblockUser = (req, res) => {
  const id = req.params.id;
  adminUtilities
    .unblockUser(id)
    .then((details) => {
      res.json({ status: 'ok', unblocked: true, userDetails: details });
    })
    .catch((err) => {
      console.log(err);
    });
};

const getAllExperts = (req, res) => {
  adminUtilities
    .expertDetails()
    .then((details) => {
      res.json({ status: 'ok', expertDetails: details });
    })
    .catch((err) => {
      console.log(err);
    });
};

const blockExpert = (req, res) => {
  const id = req.params.id;
  adminUtilities
    .blockExpert(id)
    .then((details) => {
      res.json({ status: 'ok', blocked: true, expertDetails: details });
    })
    .catch((err) => {
      console.log(err);
    });
};

const unblockExpert = (req, res) => {
  const id = req.params.id;
  adminUtilities
    .unblockExpert(id)
    .then((details) => {
      res.json({ status: 'ok', unblocked: true, expertDetails: details });
    })
    .catch((err) => {
      console.log(err);
    });
};

const addPlan = (req, res) => {
  adminUtilities
    .addPlan(req.body)
    .then(() => {
      res.json({ status: 'ok' });
    })
    .catch((err) => {
      console.log(err);
      res.json({ status: 'error' });
    });
};

const getAllPlan = (req, res) => {
  adminUtilities
    .getAllPlan()
    .then((planDetails) => {
      res.json({ status: 'ok', planDetails: planDetails });
    })
    .catch((err) => {
      console.log(err);
    });
};

const deletePlan = (req, res) => {
  const id = req.params.id;
  adminUtilities
    .deletePlan(id)
    .then((planDetails) => {
      res.json({ status: 'ok', planDetails: planDetails });
    })
    .catch((err) => {
      console.log(err);
    });
};

const getPlanDetails = (req, res) => {
  const id = req.params.id;
  adminUtilities
    .getPlanDetails(id)
    .then((details) => {
      res.json({ status: 'ok', planDetails: details });
    })
    .catch((err) => {
      console.log(err);
    });
};

const editPlan = (req, res) => {
  adminUtilities
    .editPlan(req.body)
    .then(() => {
      return res.json({ status: 'ok' });
    })
    .catch((err) => {
      console.log(err);
    });
};

const getPendingApprovalCount = (req, res) => {
  adminUtilities
    .getPendingApprovalCount()
    .then((response) => {
      res.json({ status: 'ok', count: response });
    })
    .catch((error) => {
      console.log(error);
    });
};

const getUsersCount = (req, res) => {
  adminUtilities
    .getUsersCount()
    .then((response) => {
      res.json({ status: 'ok', count: response });
    })
    .catch((err) => {
      console.log(err);
    });
};

const getExpertsCount = (req, res) => {
  adminUtilities
    .getExpertsCount()
    .then((response) => {
      res.json({ status: 'ok', count: response });
    })
    .catch((err) => {
      console.log(err);
    });
};

const getPendingApprovalDetails = (req, res) => {
  adminUtilities
    .getPendingApprovalDetails()
    .then((response) => {
      res.json({ status: 'ok', approvalDetails: response });
    })
    .catch((err) => {
      console.log(err);
    });
};

const getExpertAllDetails = (req, res) => {
  const id = req.params.id;
  adminUtilities
    .getExpertAllDetails(id)
    .then((details) => {
      res.json({ status: 'ok', expertDetails: details });
    })
    .catch((err) => {
      console.log(err);
    });
};

const rejectExpert = (req, res) => {
  adminUtilities
    .rejectExpert(req.body)
    .then(() => {
      res.json({ status: 'ok' });
    })
    .catch(() => {
      res.json({ status: 'error' });
    });
};

const acceptExpert = (req, res) => {
  adminUtilities
    .acceptExpert(req.body)
    .then(() => {
      res.json({ status: 'ok' });
    })
    .catch(() => {
      res.json({ status: 'error' });
    });
};

const getVideoApprovalList = (req, res) => {
  adminUtilities
    .getVideoApprovalList()
    .then((response) => {
      res.json({ status: 'ok', videoDetails: response });
    })
    .catch((err) => {
      console.log(err);
    });
};

const getVideoDetails = (req, res) => {
  const id = req.params.id;
  adminUtilities
    .getVideoDetails(id)
    .then((details) => {
      res.json({ status: 'ok', videoDetails: details });
    })
    .catch((err) => {
      console.log(err);
    });
};

const approveVideo = (req, res) => {
  const id = req.params.id;
  adminUtilities
    .approveVideo(id)
    .then(() => {
      res.json({ status: 'ok' });
    })
    .catch(() => {
      res.json({ status: 'error' });
    });
};

const getAllVideos = (req, res) => {
  adminUtilities
    .getAllVideos()
    .then((details) => {
      res.json({ status: 'ok', videoDetails: details });
    })
    .catch((err) => {
      console.log(err);
    });
};

const deleteVideo = (req, res) => {
  const id = req.params.id;
  adminUtilities
    .deleteVideo(id)
    .then(() => {
      res.json({ status: 'ok' });
    })
    .catch(() => {
      res.json({ status: 'error' });
    });
};

const getVideoApprovalCount = (req, res) => {
  adminUtilities
    .getVideoApprovalCount()
    .then((response) => {
      res.json({ status: 'ok', videoCount: response });
    })
    .catch((err) => {
      console.log(err);
    });
};

const getEditVideoDetails = (req, res) => {
  const id = req.params.id;
  adminUtilities
    .getEditVideoDetails(id)
    .then((response) => {
      res.json({ status: 'ok', videoDetails: response });
    })
    .catch((err) => {
      console.log(err);
    });
};

const adminEditVideo = (req, res) => {
  adminUtilities
    .adminEditVideo(req.body)
    .then(() => {
      res.json({ status: 'ok' });
    })
    .catch(() => {
      res.json({ status: 'error' });
    });
};

const adminRejectVideo = (req, res) => {
  adminUtilities
    .adminRejectVideo(req.body)
    .then(() => {
      res.json({ status: 'ok' });
    })
    .catch(() => {
      res.json({ status: 'error' });
    });
};

const getPaymentDetails = (req, res) => {
  adminUtilities
    .getPaymentDetails()
    .then((response) => {
      res.json({ status: 'ok', details: response });
    })
    .catch(() => {
      res.json({ status: 'error' });
    });
};

const getPaymentAllDetails = (req, res) => {
  const id = req.params.id;
  adminUtilities
    .getPaymentAllDetails(id)
    .then((response) => {
      res.json({ status: 'ok', details: response });
    })
    .catch(() => {
      res.json({ status: 'error' });
    });
};

const getFeedback = (req, res) => {
  adminUtilities
    .getFeedback()
    .then((data) => {
      res.json({ status: 'ok', feedback: data });
    })
    .catch(() => {
      res.json({ status: false, feedback: false });
    });
};

const approveFeedback = (req, res) => {
  const id = req.params.id;
  adminUtilities
    .approveFeedback(id)
    .then((details) => {
      res.json({ status: 'ok', approved: true, feedback: details });
    })
    .catch(() => {
      res.json({ status: false, feedback: false });
    });
};

const disapproveFeedback = (req, res) => {
  const id = req.params.id;
  adminUtilities
    .disapproveFeedback(id)
    .then((details) => {
      res.json({ status: 'ok', disapproved: true, feedback: details });
    })
    .catch(() => {
      res.json({ status: false, feedback: false });
    });
};

const getFeedbackDetails = (req, res) => {
  const id = req.params.id;
  adminUtilities
    .getFeedbackDetails(id)
    .then((data) => {
      res.json({ status: 'ok', feedback: data });
    })
    .catch(() => {
      res.json({ status: false, feedback: false });
    });
};

const deleteFeedback = (req, res) => {
  const id = req.params.id;
  adminUtilities
    .deleteFeedback(id)
    .then((details) => {
      res.json({ status: 'ok', feedback: details });
    })
    .catch(() => {
      res.json({ status: false, feedback: false });
    });
};

const getExpertDetailedView = (req, res) => {
  const id = req.params.id;
  adminUtilities
    .getExpertDetailedView(id)
    .then((response) => {
      res.json({ status: 'ok', details: response });
    })
    .catch(() => {
      res.json({ status: false, details: false });
    });
};

const getExpertChangeRequestCount = (req, res) => {
  adminUtilities
    .getExpertChangeRequestCount()
    .then((response) => {
      res.json({ status: 'ok', count: response });
    })
    .catch(() => {
      res.json({ status: false });
    });
};

const getRequestList = (req, res) => {
  adminUtilities
    .getRequestList()
    .then((response) => {
      res.json({ status: 'ok', request: response });
    })
    .catch(() => {
      res.json({ status: false });
    });
};

const getChangeRequestDetails = (req, res) => {
  const id = req.params.id;
  adminUtilities
    .getChangeRequestDetails(id)
    .then((response) => {
      res.json({ status: 'ok', request: response });
    })
    .catch(() => {
      res.json({ status: false });
    });
};

const getNewExpertDetails = (req, res) => {
  const id = req.params.id;
  adminUtilities
    .getExpertById(id)
    .then((response) => {
      res.json({ status: 'ok', expert: response });
    })
    .catch(() => {
      res.json({ status: false });
    });
};

const adminRejectExpertChange = (req, res) => {
  const id = req.params.id;
  const data = req.body;
  adminUtilities
    .adminRejectExpertChange(id, data)
    .then(() => {
      res.json({ status: 'ok' });
    })
    .catch(() => {
      res.json({ status: 'error' });
    });
};

const adminApproveExpertChange = (req, res) => {
  const id = req.params.id;
  const data = req.body;
  adminUtilities
    .adminApproveExpertChange(id, data)
    .then((response) => {
      if (response.purchaseNotFound) {
        res.json({
          status: 'error',
          error: 'No purchase found for this account.',
        });
      } else {
        res.json({ status: 'ok' });
      }
    })
    .catch(() => {
      res.json({ status: false });
    });
};

module.exports = {
  adminLogin,
  getAllUsers,
  blockUser,
  unblockUser,
  getAllExperts,
  blockExpert,
  unblockExpert,
  addPlan,
  getAllPlan,
  deletePlan,
  getPlanDetails,
  editPlan,
  getPendingApprovalCount,
  getUsersCount,
  getExpertsCount,
  getPendingApprovalDetails,
  getExpertAllDetails,
  rejectExpert,
  acceptExpert,
  getVideoApprovalList,
  getVideoDetails,
  approveVideo,
  getAllVideos,
  deleteVideo,
  getVideoApprovalCount,
  getEditVideoDetails,
  adminEditVideo,
  adminRejectVideo,
  getPaymentDetails,
  getPaymentAllDetails,
  getFeedback,
  approveFeedback,
  disapproveFeedback,
  getFeedbackDetails,
  deleteFeedback,
  getExpertDetailedView,
  getExpertChangeRequestCount,
  getRequestList,
  getChangeRequestDetails,
  getNewExpertDetails,
  adminRejectExpertChange,
  adminApproveExpertChange,
};
