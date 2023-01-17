const { response } = require('express');
const jwt = require('jsonwebtoken');
const userUtilities = require('../utilities/userUtilities');

// const {cloudinary}=require('../middlewares/cloudinary');

const userSignup = (req, res) => {
  const data = req.body;
  delete data.confirmPassword;
  userUtilities
    .doUserSignup(data)
    .then((response) => {
      console.log(response);
      if (response.emailFound) {
        res.json({
          status: 'error',
          error: 'This email or phone number already exists,try another one.',
        });
      } else {
        res.json({ status: 'success' });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

const userLogin = (req, res) => {
  const data = req.body;
  userUtilities.doUserLogin(data).then((response) => {
    if (response.blocked) {
      return res.json({ blocked: true, user: false });
    } else {
      if (response.status) {
        const token = jwt.sign(
          {
            userId: response.user._id,
            name: response.user.name,
            email: response.user.email,
          },
          process.env.JWT_SECRET_KEY
        );
        return res.json({ status: 'ok', user: token });
      }
      return res.json({ status: 'error', user: false });
    }
  });
};

const getUserDetails = (req, res) => {
  const id = req.params.id;
  userUtilities
    .findUserById(id)
    .then((details) => {
      res.json({ status: 'ok', userDetails: details });
    })
    .catch((err) => {
      console.log(err);
    });
};

const updateUserProfile = (req, res) => {
  userUtilities
    .updateUserProfile(req.body)
    .then((response) => {
      return res.json({ status: 'ok' });
    })
    .catch((err) => {
      console.log(err);
    });
};

const viewAllPlan = (req, res) => {
  userUtilities
    .viewAllPlan()
    .then((details) => {
      res.json({ status: 'ok', planDetails: details });
    })
    .catch((err) => {
      console.log(err);
    });
};

const uploadProfilePic = (req, res) => {
  const fileStr = req.body.data;

  userUtilities
    .uploadProfilePic(fileStr)
    .then((response) => {
      res.json({ status: 'ok', imageData: response });
    })
    .catch((err) => {
      console.log(err);
    });
};

const userProfilePicUpdate = (req, res) => {
  userUtilities
    .userProfilePicUpdate(req.body)
    .then(() => {
      res.json({ status: 'ok' });
    })
    .catch(() => {
      res.json({ status: 'error' });
    });
};

const getUsersExpert=(req,res)=>{
const id=req.params.id
  userUtilities.getUsersExpert(id).then((details)=>{
    res.json({ status: 'ok', expertDetails: details });
  }).catch(()=>{
    res.json({ status: 'error' });
  })
}

// const selectExpert=(req,res)=>{

// userUtilities.selectExpert(req.body).then(()=>{
//   res.json({ status: 'ok' });
// }).catch(()=>{
//   res.json({ status: 'error' });
// })
// }

const selectExpert=(req,res)=>{
const id=req.params.id

userUtilities.selectExpert(id).then((response)=>{
  res.json({ status: 'ok',expertDetails:response });
}).catch(()=>{
  res.json({ status: 'error' });
})
}

const selectPlan=(req,res)=>{
  const id=req.params.id
userUtilities.selectPlan(id).then((response)=>{
  res.json({ status: 'ok',planDetails:response });
}).catch(()=>{
  res.json({status:'error'})
})
}

const buyPlan=(req,res)=>{
 
  userUtilities.buyPlan(req.body).then((response)=>{
    res.json({status:'ok',data:response.url})
  
    
    
  }).catch((error)=>{
    console.log(error);
  })
}

const postPlanOrderValues=(req,res)=>{
  
  userUtilities.postPlanOrderValues(req.body).then(()=>{
    // userUtilities.postPlanDetails(req.body).then(()=>{

    // }).catch(()=>{

    // })
    res.json({status:'ok'})
  }).catch((error)=>{
    res.json({status:'error'})
  })
}



module.exports = {
  userSignup,
  userLogin,
  getUserDetails,
  updateUserProfile,
  viewAllPlan,
  uploadProfilePic,
  userProfilePicUpdate,
  getUsersExpert,
  selectExpert,
  selectPlan,
  buyPlan,
  postPlanOrderValues,
};
