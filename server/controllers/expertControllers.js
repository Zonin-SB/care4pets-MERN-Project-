const { response } = require('express');
const jwt = require('jsonwebtoken');
const { ObjectId } = require('mongodb');
const commonUtilities = require('../utilities/commonUtilities');
const expertUtilities = require('../utilities/expertUtilities');

const expertSignup = (req, res) => {
  const data = req.body;
  delete data.confirmPassword;

  expertUtilities
    .doExpertSignup(data)
    .then((response) => {
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

const expertLogin = (req, res) => {
  const data = req.body;
  expertUtilities.doExpertLogin(data).then((response) => {
    if (response.blocked) {
      return res.json({ blocked: true, expert: false });
    } else {
      if (response.status) {
        const token = jwt.sign(
          {
            expertId: response.expert._id,
            name: response.expert.name,
            email: response.expert.email,
          },
          process.env.JWT_SECRET_KEY
        );
        return res.json({ status: 'ok', expert: token });
      }
      return res.json({ status: 'error', expert: false });
    }
  });
};

const uploadDocuments = (req, res) => {
  const fileStr = req.body.data;
  expertUtilities
    .uploadDocuments(fileStr)
    .then((response) => {
      res.json({ status: 'ok', imageData: response });
    })
    .catch((err) => {
      console.log(err);
    });
};

const expertApplyVerification = (req, res) => {
  expertUtilities
    .expertApplyVerification(req.body)
    .then(() => {
      res.json({ status: 'ok' });
    })
    .catch(() => {
      res.json({ status: 'error' });
    });
};

const getExpertDetails = (req, res) => {
  const id = req.params.id;
  expertUtilities
    .findExpertById(id)
    .then((details) => {
      res.json({ status: 'ok', expertDetails: details });
    })
    .catch((err) => {
      console.log(err);
    });
};

const expertRejectionAccepted = (req, res) => {
  const id = req.params.id;
  expertUtilities
    .expertRejectionAccepted(id)
    .then(() => {
      res.json({ status: 'ok' });
    })
    .catch(() => {
      res.json({ status: 'error' });
    });
};

const expertAccepted = (req, res) => {
  const id = req.params.id;
  expertUtilities
    .expertAccepted(id)
    .then(() => {
      res.json({ status: 'ok' });
    })
    .catch(() => {
      res.json({ status: 'error' });
    });
};

const expertVideoUpload = (req, res) => {
  const ytUrl = req.body.link;
  req.body.link = ytUrl.replace('/watch?v=', '/embed/');
req.body.expertId=ObjectId(req.body.expertId)
  expertUtilities
    .expertVideoUpload(req.body)
    .then(() => {
      res.json({ status: 'ok' });
    })
    .catch(() => {
      res.json({ status: 'error' });
    });
};

const getAllVideos = (req, res) => {
  const id = req.params.id;
  expertUtilities
    .getAllVideos(id)
    .then((details) => {
      res.json({ status: 'ok', videoDetails: details });
    })
    .catch(() => {
      res.json({ status: 'error' });
    });
};

const getVideoDetails = (req, res) => {
  const id = req.params.id;
  expertUtilities
    .getVideoDetails(id)
    .then((details) => {
      res.json({ status: 'ok', videoDetails: details });
    })
    .catch(() => {
      res.json({ status: 'error' });
    });
};

const editVideo = (req, res) => {
  expertUtilities
    .editVideo(req.body)
    .then(() => {
      res.json({ status: 'ok' });
    })
    .catch(() => {
      res.json({ status: 'error' });
    });
};

const deleteVideo = (req, res) => {
  const data = req.body;
  expertUtilities
    .deleteVideo(data)
    .then((details) => {
      res.json({ status: 'ok', videoDetails: details });
    })
    .catch(() => {
      res.json({ status: 'error' });
    });
};

const getRejectedVideoCount = (req, res) => {
  const id = req.params.id;
  expertUtilities
    .getRejectedVideoCount(id)
    .then((response) => {
      res.json({ status: 'ok', videoCount: response });
    })
    .catch((err) => {
      console.log(err);
    });
};
const getRejectedVideos=(req,res)=>{
  const id = req.params.id;
  expertUtilities.getRejectedVideos(id).then((response)=>{
    res.json({ status: 'ok', videos: response });
  }).catch(()=>{
    console.log(err);
  })
}

const getRejectedVideoDetails=(req,res)=>{
  const id = req.params.id;
  expertUtilities.getRejectedVideoDetails(id).then((response)=>{
    res.json({ status: 'ok', videoDetails: response });
  }).catch(()=>{
    console.log(err);
  })
}

const expertVideoRejected=(req,res)=>{
  const id = req.params.id;
  expertUtilities.expertVideoRejected(id).then(()=>{
    res.json({ status: 'ok' });
  }).catch(()=>{
    res.json({ status: 'error' });
  })
}

const getVideosCount=(req,res)=>{
  const id = req.params.id;
  expertUtilities.getVideosCount(id).then((response)=>{
    res.json({ status: 'ok', videoCount: response });
  }).catch((err)=>{
    console.log(err);
  })
}

const getAllClients=(req,res)=>{
  const id = req.params.id;
  expertUtilities.getAllClients(id).then((response)=>{
    res.json({ status: true, clients: response });
  }).catch(()=>{
    res.json({ status: false});
  })
}

const getClientDetails=(req,res)=>{
  const id = req.params.id;
  expertUtilities.getClientDetails(id).then((response)=>{
    res.json({ status: true, client: response });
  }).catch(()=>{
    res.json({ status: false});
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

module.exports = {
  expertSignup,
  expertLogin,
  uploadDocuments,
  expertApplyVerification,
  getExpertDetails,
  expertRejectionAccepted,
  expertAccepted,
  expertVideoUpload,
  getAllVideos,
  getVideoDetails,
  editVideo,
  deleteVideo,
  getRejectedVideoCount,
  getRejectedVideos,
  getRejectedVideoDetails,
  expertVideoRejected,
  getVideosCount,
  getAllClients,
  getClientDetails,
  sendMessage,
};
