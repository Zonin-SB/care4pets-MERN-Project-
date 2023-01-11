const bcrypt = require('bcrypt');
const collection = require('../config/collection');
const db = require('../config/connection');
const { ObjectId } = require('mongodb');
const { cloudinary } = require('../middlewares/cloudinary');
const { response } = require('express');

module.exports = {
  doExpertSignup: (data) => {
    return new Promise(async (resolve, reject) => {
      let email = await db
        .get()
        .collection(collection.EXPERT_COLLECTION)
        // .findOne({ email: data.email });
        .findOne({ $or: [{ email: data.email }, { mobile: data.mobile }] });

      if (email == null) {
        data.password = await bcrypt.hash(data.password, 10);

        db.get()
          .collection(collection.EXPERT_COLLECTION)
          .insertOne(data)
          .then((data) => {
            resolve(data);
          })
          .catch((error) => {
            reject(error);
          });
      } else {
        resolve({ emailFound: true });
      }
    });
  },

  doExpertLogin: (data) => {
    return new Promise(async (resolve, reject) => {
      let response = {};
      let expert = await db
        .get()
        .collection(collection.EXPERT_COLLECTION)
        .findOne({ email: data.email });
      if (expert) {
        if (expert.blocked) {
          response.blocked = true;
          resolve(response);
        } else {
          bcrypt.compare(data.password, expert.password).then((status) => {
            if (status) {
              response.expert = expert;
              response.status = true;
              resolve(response);
            } else {
              resolve({ status: false });
            }
          });
        }
      } else {
        resolve({ status: false });
      }
    });
  },

  findVerifiedExpertById: (expertId) => {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await db
          .get()
          .collection(collection.EXPERT_COLLECTION)
          .findOne({ $and: [{ _id: ObjectId(expertId) }, { verified: true }] });

        resolve(user);
      } catch (error) {
        reject();
      }
    });
  },

  findExpertById: (expertId) => {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await db
          .get()
          .collection(collection.EXPERT_COLLECTION)
          .findOne({ _id: ObjectId(expertId) });

        resolve(user);
      } catch (error) {
        reject();
      }
    });
  },

  uploadDocuments: (fileStr) => {
    return new Promise(async (resolve, reject) => {
      try {
        const uploadedResponse = await cloudinary.uploader.upload(fileStr, {
          upload_preset: 'care4pets',
        });
        resolve(uploadedResponse);
      } catch (error) {
        console.log(error);
      }
    });
  },

  expertApplyVerification: (expertData) => {
    return new Promise((resolve, reject) => {
      try {
        db.get()
          .collection(collection.EXPERT_COLLECTION)
          .updateOne(
            { _id: ObjectId(expertData.id) },
            {
              $set: {
                profilePic: expertData.profilePic,
                idProofPic: expertData.idProofPic,
                trainersLicensePic: expertData.licensePic,
                applied: expertData.applied,
              },
            }
          )
          .then((response) => {
            resolve(response);
          })
          .catch((err) => {
            reject(err);
          });
      } catch (error) {
        console.log(error);
      }
    });
  },

  expertRejectionAccepted:(expertId)=>{
    return new Promise((resolve, reject) => {
      try {
        db.get()
          .collection(collection.EXPERT_COLLECTION)
          .updateOne(
            { _id: ObjectId(expertId) },
            {
              $unset: {
                rejected:''
               
              },
            }
          )
          .then((response) => {
            resolve(response);
          });
      } catch (error) {
        reject();
      }
    });
  }
};
