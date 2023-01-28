const { response } = require('express');
const jwt = require('jsonwebtoken');
const commonUtilities = require('../utilities/commonUtilities');
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
            pet: response.user.pet,
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
    .then(() => {
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

const getUsersExpert = (req, res) => {
  const id = req.params.id;

  userUtilities
    .findUserById(id)
    .then((userData) => {
      userUtilities
        .getUsersExpert(userData)
        .then((details) => {
          res.json({ status: 'ok', expertDetails: details });
        })
        .catch(() => {
          res.json({ status: 'error' });
        });
    })
    .catch(() => {
      res.json({ status: 'error' });
    });
};

// const selectExpert=(req,res)=>{

// userUtilities.selectExpert(req.body).then(()=>{
//   res.json({ status: 'ok' });
// }).catch(()=>{
//   res.json({ status: 'error' });
// })
// }

const selectExpert = (req, res) => {
  const id = req.params.id;

  userUtilities
    .selectExpert(id)
    .then((response) => {
      res.json({ status: 'ok', expertDetails: response });
    })
    .catch(() => {
      res.json({ status: 'error' });
    });
};

const selectPlan = (req, res) => {
  const id = req.params.id;
  userUtilities
    .selectPlan(id)
    .then((response) => {
      res.json({ status: 'ok', planDetails: response });
    })
    .catch(() => {
      res.json({ status: 'error' });
    });
};

const buyPlan = (req, res) => {
  userUtilities
    .buyPlan(req.body)
    .then((response) => {
      res.json({ status: 'ok', data: response.url });
    })
    .catch((error) => {
      console.log(error);
    });
};

const postPlanOrderValues = (req, res) => {
  userUtilities
    .postPlanOrderValues(req.body)
    .then(() => {
      res.json({ status: 'ok' });
    })
    .catch(() => {
      res.json({ status: 'error' });
    });
};

const getFreeVideos = (req, res) => {
  const id = req.params.id;
  userUtilities
    .findUserById(id)
    .then((userData) => {
      userUtilities
        .getFreeVideos(userData)
        .then((details) => {
          res.json({ status: 'ok', freeVideos: details });
        })
        .catch((error) => {
          console.log(error);
        });
    })
    .catch((err) => {
      console.log(err);
    });
};

const getPlanVideos = (req, res) => {
  const id = req.params.id;
  userUtilities
    .findPlanById(id)
    .then((response) => {
      if (response !== null) {
        userUtilities.getPlanVideos(response).then((data) => {
          res.json({ status: 'ok', planVideos: data });
        });
      } else {
        res.json({ status: 'ok', plan: false });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

const getVideosCount = (req, res) => {
  const id = req.params.id;
  userUtilities
    .getVideosCount(id)
    .then((response) => {
      res.json({ status: 'ok', count: response });
    })
    .catch((err) => {
      console.log(err);
    });
};

const getPlanDetails = (req, res) => {
  const id = req.params.id;
  userUtilities
    .findPlanById(id)
    .then((response) => {
      if (response !== null) {
        userUtilities.getPlanDetails(response).then((data) => {
          res.json({ status: 'ok', plan: data });
        });
      } else {
        res.json({ status: 'ok', plan: false });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

const getYourExpertDetails=(req,res)=>{
  const id = req.params.id;

 userUtilities.findPlanById(id).then((response)=>{
if(response!==null){
  userUtilities.getYourExpertDetails(response).then((data)=>{
    res.json({ status: 'ok', expert: data });
  })
}else{
  res.json({ status: 'ok', expert: false });
}
 }).catch((err)=>{
  console.log(err);
 })
}

const sendMessage=(req,res)=>{
  const to =req.params.id
  const message=req.body;
  const from=req.user._id;
 commonUtilities.sendMessage(to,from,message).then(()=>{
  res.json({ status: true, message: 'success' })
 }).catch((err)=>{
  res.json({ status: false, message: err })
 })
}

const getAllMessages=(req,res)=>{
  const to =req.params.id
  const from=req.user._id;
  commonUtilities.getAllMessages(to,from).then(()=>{

  }).catch(()=>{

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
  getFreeVideos,
  getVideosCount,
  getPlanDetails,
  getPlanVideos,
  getYourExpertDetails,
  sendMessage,
  getAllMessages,
};
