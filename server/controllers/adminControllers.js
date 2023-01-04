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
     
      res.json({status:'ok',blocked:true,userDetails:details})
    })
    .catch((err) => {
      console.log(err);
    });
};

const unblockUser=(req,res)=>{
  const id=req.params.id
  adminUtilities.unblockUser(id).then((details)=>{
    res.json({status:'ok',unblocked:true,userDetails:details})
  }).catch((err)=>{
    console.log(err);
  })
}

const getAllExperts=(req,res)=>{
  adminUtilities.expertDetails().then((details)=>{
    res.json({status:'ok',expertDetails:details})
  }).catch((err)=>{
    console.log(err);
  })
}

const blockExpert=(req,res)=>{
const id=req.params.id
adminUtilities.blockExpert(id).then((details)=>{
  
  res.json({status:'ok',blocked:true,expertDetails:details})
  
}).catch((err)=>{
  console.log(err);
})
}

const unblockExpert=(req,res)=>{
  const id=req.params.id
  adminUtilities.unblockExpert(id).then((details)=>{
    res.json({status:'ok',unblocked:true,expertDetails:details})
  }).catch((err)=>{
    console.log(err);
  })
}

const addPlan=(req,res)=>{
  adminUtilities.addPlan(req.body).then(()=>{
    res.json({status:'ok'})
  }).catch((err)=>{
    console.log(err);
    res.json({status:'error'})
  })
}

const getAllPlan=(req,res)=>{
  adminUtilities.getAllPlan().then((planDetails)=>{
    res.json({status:'ok',planDetails:planDetails})
  }).catch((err)=>{
    console.log(err);
  })
}

const deletePlan=(req,res)=>{
  const id=req.params.id
  adminUtilities.deletePlan(id).then((planDetails)=>{
    res.json({status:'ok',planDetails:planDetails})
  }).catch((err)=>{
    console.log(err);
  })
}

const getPlanDetails=(req,res)=>{
  const id=req.params.id
  adminUtilities.getPlanDetails(id).then((details)=>{
    res.json({status:'ok',planDetails:details})
  }).catch((err)=>{
    console.log(err);
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
};
