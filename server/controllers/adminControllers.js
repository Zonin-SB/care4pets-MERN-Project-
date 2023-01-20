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

// const approveExpert=(req,res)=>{
//   const id=req.params.id
//   adminUtilities.approveExpert(id).then(()=>{
//     res.json({status:'ok'})
//   }).catch(()=>{
//     res.json({status:'error'})
//   })
  
// }

const rejectExpert=(req,res)=>{
  adminUtilities.rejectExpert(req.body).then(()=>{
    res.json({status:'ok'})
  }).catch(()=>{
    res.json({status:'error'})
  })
}

const acceptExpert=(req,res)=>{
  adminUtilities.acceptExpert(req.body).then(()=>{
    res.json({status:'ok'})
  }).catch(()=>{
    res.json({status:'error'})
  })
}



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
  // approveExpert,
  rejectExpert,
  acceptExpert,
 
};
