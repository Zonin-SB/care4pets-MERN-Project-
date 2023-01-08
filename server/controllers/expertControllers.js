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

module.exports = {
  expertSignup,
  expertLogin,
  uploadDocuments,
};
