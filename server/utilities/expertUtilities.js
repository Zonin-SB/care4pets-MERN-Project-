const bcrypt = require('bcrypt');
const collection = require('../config/collection');
const db = require('../config/connection');
const { ObjectId } = require('mongodb');
const { cloudinary } = require('../middlewares/cloudinary');
const { response } = require('express');
const { SendOTP } = require('../middlewares/sendEmail');

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
          .find({ expertId: ObjectId(id) })
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
                category: data.category,
                uploaded: true,
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
            $and: [
              { expertId: ObjectId(id) },
              { videoRejected: { $exists: true } },
            ],
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
            $and: [
              { expertId: ObjectId(id) },
              { videoRejected: { $exists: true } },
            ],
          })
          .toArray();
        resolve(videos);
      } catch (error) {
        reject(error);
      }
    });
  },

  getRejectedVideoDetails: (id) => {
    return new Promise(async (resolve, reject) => {
      try {
        const videos = await db
          .get()
          .collection(collection.VIDEO_COLLECTION)
          .find({
            _id: ObjectId(id),
          })
          .toArray();
        resolve(videos);
      } catch (error) {
        reject(error);
      }
    });
  },

  expertVideoRejected: (id) => {
    return new Promise(async (resolve, reject) => {
      try {
        await db
          .get()
          .collection(collection.VIDEO_COLLECTION)
          .updateOne(
            { _id: ObjectId(id) },
            {
              $unset: {
                videoRejected: '',
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

  getVideosCount: (id) => {
    return new Promise(async (resolve, reject) => {
      try {
        const videoCount = await db
          .get()
          .collection(collection.VIDEO_COLLECTION)
          .countDocuments({
            $and: [{ expertId: ObjectId(id) }, { approved: true }],
          });

        resolve(videoCount);
      } catch (error) {
        console.log(error);
      }
    });
  },

  getAllClients: (id) => {
    return new Promise(async (resolve, reject) => {
      try {
        const clients = await db
          .get()
          .collection(collection.PURCHASE_COLLECTION)
          .aggregate([
            {
              $match: {
                expertId: ObjectId(id),
              },
            },
            {
              $lookup: {
                from: collection.USER_COLLECTION,
                localField: 'userId',
                foreignField: '_id',
                as: 'clientDetails',
              },
            },
            {
              $unwind: '$clientDetails',
            },
            {
              $project: {
                planId: 1,
                expertId: 1,
                userId: 1,
                validFrom: 1,
                validTill: 1,
                plan: 1,
                clientDetails: {
                  name: 1,
                  email: 1,
                  mobile: 1,
                  profileImage: 1,
                  pet: 1,
                },
              },
            },
          ])
          .toArray();

        resolve(clients);
      } catch (error) {}
    });
  },

  getClientDetails: (id) => {
    return new Promise(async (resolve, reject) => {
      try {
        const userDetails = await db
          .get()
          .collection(collection.USER_COLLECTION)
          .aggregate([
            {
              $match: {
                _id: ObjectId(id),
              },
            },
            {
              $project: {
                _id: 1,
                name: 1,
                email: 1,
                mobile: 1,
                profileImage: 1,
                pet: 1,
              },
            },
          ])
          .toArray();
        resolve(userDetails);
      } catch (error) {
        reject(error);
      }
    });
  },

  getClientsCount: (id) => {
    return new Promise(async (resolve, reject) => {
      try {
        const count = await db
          .get()
          .collection(collection.PURCHASE_COLLECTION)
          .countDocuments({
            expertId: ObjectId(id),
          });

        resolve(count);
      } catch (error) {
        console.log(error);
      }
    });
  },

  getExpertEditDetails: (id) => {
    return new Promise(async (resolve, reject) => {
      try {
        const data = await db
          .get()
          .collection(collection.EXPERT_COLLECTION)
          .aggregate([
            {
              $match: {
                _id: ObjectId(id),
              },
            },
            {
              $project: {
                _id: 1,
                name: 1,
                mobile: 1,
                dob: 1,
                gender: 1,
                expertisedIn: 1,
                experience: 1,
              },
            },
          ])
          .toArray();

        resolve(data);
      } catch (error) {
        console.log(error);
      }
    });
  },

  updateExpertProfile: (data) => {
    return new Promise(async (resolve, reject) => {
      try {
        await db
          .get()
          .collection(collection.EXPERT_COLLECTION)
          .updateOne(
            { _id: ObjectId(data.id) },
            {
              $set: {
                name: data.name,
                gender: data.gender,
                mobile: data.mobile,
                expertisedIn: data.expertisedIn,
                experience: data.experience,
                dob: data.dob,
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

  sendOTP: (data) => {
    return new Promise(async (resolve, reject) => {
      const expert = await db
        .get()
        .collection(collection.EXPERT_COLLECTION)
        .findOne({ email: data.Email });

      if (expert) {
        if (expert.blocked) {
          const err = 'This account is blocked...';
          reject(err);
        } else {
          try {
            const { name } = expert;
            const { email } = expert;
            const otp = `${Math.floor(1000 + Math.random() * 9000)}`;
            const hashotp = await bcrypt.hash(otp, 10);
            db.get()
              .collection(collection.EXPERT_COLLECTION)
              .updateOne(
                {
                  _id: expert._id,
                },
                {
                  $set: {
                    otp: hashotp,
                  },
                }
              )
              .then((response) => {
                SendOTP(otp, email, name).then((data) => {
                  resolve({ status: true });
                });
              });
          } catch (error) {
            reject(error);
          }
        }
      } else {
        const err = 'User not found..';
        reject(err);
      }
    });
  },

  verifyOTP: (data) => {
    return new Promise(async (resolve, reject) => {
      const response = {};
      const expert = await db
        .get()
        .collection(collection.EXPERT_COLLECTION)
        .findOne({ email: data.Email });
      if (expert) {
        bcrypt.compare(data.OTP, expert.otp).then((status) => {
          if (status) {
            response.expert = expert;
            response.status = true;
            resolve(response);
          } else {
            resolve({ status: false });
          }
        });
      } else {
        resolve({ status: false });
      }
    });
  },

  getDetails: (id) => {
    return new Promise(async (resolve, reject) => {
      try {
        const data = await db
          .get()
          .collection(collection.EXPERT_COLLECTION)
          .aggregate([
            {
              $match: {
                _id: ObjectId(id),
              },
            },
            {
              $project: {
                verified: 1,
              },
            },
          ])
          .toArray();
        resolve(data);
      } catch (error) {
        reject();
      }
    });
  },
};
