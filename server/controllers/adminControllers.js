const adminUtilities = require('../utilities/adminUtilities');
const jwt = require('jsonwebtoken');

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
      // console.log(details);
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
      console.log(details);
      res.json({status:'ok',blocked:true,userDetails:details})
    })
    .catch((err) => {
      console.log(err);
    });
};

const unblockUser=(req,res)=>{
  const id=req.params.id
  adminUtilities.unblockUser(id).then((details)=>{
    console.log(details);
    res.json({status:'ok',unblocked:true,userDetails:details})
  }).catch((err)=>{
    console.log(err);
  })
}

module.exports = {
  adminLogin,
  getAllUsers,
  blockUser,
  unblockUser
};
