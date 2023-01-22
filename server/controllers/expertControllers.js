const { response } = require('express');
const jwt = require('jsonwebtoken');
const expertUtilities = require('../utilities/expertUtilities');

const expertSignup = (req, res) => {
  const data = req.body;
  delete data.confirmPassword;

  expertUtilities
    .doExpertSignup(data)
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
};
