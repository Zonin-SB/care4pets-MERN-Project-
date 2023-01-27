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

  expertRejectionAccepted: (expertId) => {
    return new Promise((resolve, reject) => {
      try {
        db.get()
          .collection(collection.EXPERT_COLLECTION)
          .updateOne(
            { _id: ObjectId(expertId) },
            {
              $unset: {
                rejected: '',
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
  },

  expertAccepted: (expertId) => {
    return new Promise((resolve, reject) => {
      try {
        db.get()
          .collection(collection.EXPERT_COLLECTION)
          .updateOne(
            { _id: ObjectId(expertId) },
            {
              $unset: {
                accepted: '',
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
  },

  expertVideoUpload: (data) => {
    return new Promise(async (resolve, reject) => {
      try {
        await db
          .get()
          .collection(collection.VIDEO_COLLECTION)
          .insertOne(data)
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

  getAllVideos: (id) => {
    return new Promise(async (resolve, reject) => {
      try {
        const videos = await db
          .get()
          .collection(collection.VIDEO_COLLECTION)
          .find({ expertId: ObjectId(id )})
          .toArray();
        resolve(videos);
      } catch (error) {
        reject(error);
      }
    });
  },

  getVideoDetails: (id) => {
    return new Promise(async (resolve, reject) => {
      try {
        const videoDetails = await db
          .get()
          .collection(collection.VIDEO_COLLECTION)
          .find({ _id: ObjectId(id) })
          .toArray();
        resolve(videoDetails);
      } catch (error) {
        reject(error);
      }
    });
  },

  editVideo: (data) => {
    return new Promise(async (resolve, reject) => {
      try {
        await db
          .get()
          .collection(collection.VIDEO_COLLECTION)
          .updateOne(
            { _id: ObjectId(data.videoId) },
            {
              $set: {
                title: data.title,
                type: data.type,
                link: data.link,
                description: data.description,
                category:data.category,
                uploaded:true,
              },
            }
          )
          .then((response) => {
            resolve(response);
          })
          .catch(() => {
            reject();
          });
      } catch (error) {
        reject(error);
      }
    });
  },

  deleteVideo: (data) => {
    return new Promise(async (resolve, reject) => {
      try {
        await db
          .get()
          .collection(collection.VIDEO_COLLECTION)
          .deleteOne({ _id: ObjectId(data.videoId) })
          .then(async () => {
            const details = await db
              .get()
              .collection(collection.VIDEO_COLLECTION)
              .find({
                expertId: ObjectId(data.expertId),
              })
              .toArray();
            resolve(details);
          })
          .catch(() => {
            reject();
          });
      } catch (error) {
        console.log(error);
      }
    });
  },

  getRejectedVideoCount: (id) => {
    return new Promise(async (resolve, reject) => {
      try {
        const videosCount = await db
          .get()
          .collection(collection.VIDEO_COLLECTION)
          .countDocuments({
            $and: [{ expertId: ObjectId(id )}, { videoRejected: { $exists: true } }],
          });
        resolve(videosCount);
      } catch (error) {
        reject(error);
      }
    });
  },

  getRejectedVideos: (id) => {
    return new Promise(async (resolve, reject) => {
      try {
        const videos = await db
          .get()
          .collection(collection.VIDEO_COLLECTION)
          .find({
            $and: [{ expertId: ObjectId(id )}, { videoRejected: { $exists: true } }],
          })
          .toArray();
        resolve(videos);
      } catch (error) {
        reject(error);
      }
    });
  },

  getRejectedVideoDetails:(id)=>{
    return new Promise(async (resolve, reject) => {
      try {
        const videos = await db
          .get()
          .collection(collection.VIDEO_COLLECTION)
          .find({
           _id:ObjectId(id)
          })
          .toArray();
        resolve(videos);
      } catch (error) {
        reject(error);
      }
    });
  },

  expertVideoRejected:(id)=>{
    return new Promise(async (resolve, reject) => {
      try {
        await db
          .get()
          .collection(collection.VIDEO_COLLECTION)
          .updateOne(
            { _id: ObjectId(id) },
            {
              $unset: {
                videoRejected:''
              },
            }
          )
          .then(() => {
            resolve();
          })
          .catch(() => {
            reject();
          });
      } catch (error) {
        reject(error);
      }
    });
  },

  getVideosCount:(id)=>{
    return new Promise(async (resolve, reject) => {
      try {
        const videoCount = await db
          .get()
          .collection(collection.VIDEO_COLLECTION)
          .countDocuments({ $and:[{expertId:ObjectId(id)},{approved:true}] });

        resolve(videoCount);
      } catch (error) {
        console.log(error);
      }
    });
  }
};
