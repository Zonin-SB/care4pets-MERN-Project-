const { response } = require('express');
const { ObjectId } = require('mongodb');
const collection = require('../config/collection');
const db = require('../config/connection');

module.exports = {
  doAdminLogin: (adminData) => {
    return new Promise(async (resolve, reject) => {
      const response = {};
      const admin = await db
        .get()
        .collection(collection.ADMIN_COLLECTION)
        .findOne({ email: adminData.email });
      if (admin) {
        if (adminData.password == admin.password) {
          response.admin = admin;
          response.status = true;
          resolve(response);
        } else {
          resolve({ status: false });
        }
      } else {
        resolve({ status: false });
      }
    });
  },
  findAdminById: (userId) => {
    // console.log(userId,'adminid');
    return new Promise(async (resolve, reject) => {
      try {
        const user = await db
          .get()
          .collection(collection.ADMIN_COLLECTION)
          .findOne({ _id: ObjectId(userId) });

        resolve(user);
      } catch (error) {
        reject();
      }
    });
  },

  userDetails: () => {
    return new Promise(async (resolve, reject) => {
      try {
        const details = await db
          .get()
          .collection(collection.USER_COLLECTION)
          .find()
          .toArray();
        resolve(details);
      } catch (error) {
        reject();
      }
    });
  },

  blockUser: (userId) => {
    return new Promise((resolve, reject) => {
      try {
        db.get()
          .collection(collection.USER_COLLECTION)
          .updateOne({ _id: ObjectId(userId) }, { $set: { blocked: true } })
          .then(async () => {
            const details = await db
              .get()
              .collection(collection.USER_COLLECTION)
              .find()
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

  unblockUser: (userId) => {
    return new Promise((resolve, reject) => {
      try {
        db.get()
          .collection(collection.USER_COLLECTION)
          .updateOne({ _id: ObjectId(userId) }, { $set: { blocked: false } })
          .then(async () => {
            const details = await db
              .get()
              .collection(collection.USER_COLLECTION)
              .find()
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

  expertDetails: () => {
    return new Promise(async (resolve, reject) => {
      try {
        const details = await db
          .get()
          .collection(collection.EXPERT_COLLECTION)
          .find()
          .toArray();
        resolve(details);
      } catch (error) {
        reject();
      }
    });
  },

  blockExpert: (userId) => {
    return new Promise((resolve, reject) => {
      try {
        db.get()
          .collection(collection.EXPERT_COLLECTION)
          .updateOne({ _id: ObjectId(userId) }, { $set: { blocked: true } })
          .then(async () => {
            const details = await db
              .get()
              .collection(collection.EXPERT_COLLECTION)
              .find()
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

  unblockExpert: (userId) => {
    return new Promise((resolve, reject) => {
      try {
        db.get()
          .collection(collection.EXPERT_COLLECTION)
          .updateOne({ _id: ObjectId(userId) }, { $set: { blocked: false } })
          .then(async () => {
            const details = await db
              .get()
              .collection(collection.EXPERT_COLLECTION)
              .find()
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
  addPlan: (planData) => {
    return new Promise(async (resolve, reject) => {
      try {
        await db
          .get()
          .collection(collection.PLAN_COLLECTION)
          .insertOne(planData)
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

  getAllPlan: () => {
    return new Promise(async (resolve, reject) => {
      try {
        const planDetails = await db
          .get()
          .collection(collection.PLAN_COLLECTION)
          .find()
          .toArray();
        resolve(planDetails);
      } catch (error) {
        reject();
      }
    });
  },

  deletePlan: (planId) => {
    return new Promise(async (resolve, reject) => {
      try {
        await db
          .get()
          .collection(collection.PLAN_COLLECTION)
          .deleteOne({ _id: ObjectId(planId) })
          .then(async () => {
            const planDetails = await db
              .get()
              .collection(collection.PLAN_COLLECTION)
              .find()
              .toArray();
            resolve(planDetails);
          })
          .catch(() => {
            reject();
          });
      } catch (error) {
        console.log(error);
      }
    });
  },

  getPlanDetails: (planId) => {
    return new Promise(async (resolve, reject) => {
      try {
        const details = await db
          .get()
          .collection(collection.PLAN_COLLECTION)
          .find({ _id: ObjectId(planId) })
          .toArray();
        resolve(details);
      } catch (error) {
        console.log(error);
      }
    });
  },

  editPlan: (planData) => {
    return new Promise((resolve, reject) => {
      try {
        db.get()
          .collection(collection.PLAN_COLLECTION)
          .updateOne(
            { _id: ObjectId(planData.planId) },
            {
              $set: {
                planName: planData.planName,
                validity: planData.validity,
                currentPrice: planData.currentPrice,
                previousPrice: planData.previousPrice,
                dietPlan: planData.dietPlan,
                expertAvailability: planData.expertAvailability,
                numberOfCheckup: planData.numberOfCheckup,
                tipAvailabilty: planData.tipAvailabilty,
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

  getPendingApprovalCount: () => {
    return new Promise(async (resolve, reject) => {
      try {
        const pendingApprovalcount = await db
          .get()
          .collection(collection.EXPERT_COLLECTION)
          .countDocuments({ applied: true });

        resolve(pendingApprovalcount);
      } catch (error) {
        console.log(error);
      }
    });
  },

  getUsersCount: () => {
    return new Promise(async (resolve, reject) => {
      try {
        const usersCount = await db
          .get()
          .collection(collection.USER_COLLECTION)
          .countDocuments({ blocked: false });

        resolve(usersCount);
      } catch (error) {
        console.log(error);
      }
    });
  },

  getExpertsCount: () => {
    return new Promise(async (resolve, reject) => {
      try {
        const expertsCount = await db
          .get()
          .collection(collection.EXPERT_COLLECTION)
          .countDocuments({ $and: [{ blocked: false }, { verified: true }] });

        resolve(expertsCount);
      } catch (error) {
        console.log(error);
      }
    });
  },

  getPendingApprovalDetails: () => {
    return new Promise(async (resolve, reject) => {
      try {
        const approvalDetails = await db
          .get()
          .collection(collection.EXPERT_COLLECTION)
          .find({ applied: true })
          .toArray();

        resolve(approvalDetails);
      } catch (error) {
        reject();
      }
    });
  },

  getExpertAllDetails: (expertId) => {
    return new Promise(async (resolve, reject) => {
      try {
        const details = await db
          .get()
          .collection(collection.EXPERT_COLLECTION)
          .find({ _id: ObjectId(expertId) })
          .toArray();
        resolve(details);
      } catch (error) {
        console.log(error);
      }
    });
  },

  // approveExpert: (expertId) => {
  //   return new Promise(async (resolve, reject) => {
  //     try {
  //       await db
  //         .get()
  //         .collection(collection.EXPERT_COLLECTION)
  //         .updateOne(
  //           { _id: ObjectId(expertId) },
  //           {
  //             $set: {
  //               applied: false,
  //               verified: true,
  //               expertFrom: new Date(),
  //             },
  //           }
  //         )
  //         .then((response) => {
  //           resolve(response);
  //         });
  //     } catch (error) {
  //       reject();
  //     }
  //   });
  // },

  rejectExpert: (data) => {
    return new Promise(async (resolve, reject) => {
      try {
        await db
          .get()
          .collection(collection.EXPERT_COLLECTION)
          .updateOne(
            { _id: ObjectId(data.id) },
            {
              $set: {
                applied: false,
              },
              $push: {
                rejected: {
                  reason: data.reason,
                  message: data.message,
                },
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

  acceptExpert: (data) => {
    return new Promise(async (resolve, reject) => {
      try {
        let date_time = new Date();

        // get current date
        // adjust 0 before single digit date
        let date = ('0' + date_time.getDate()).slice(-2);

        // get current month
        let month = ('0' + (date_time.getMonth() + 1)).slice(-2);

        // get current year
        let year = date_time.getFullYear();

        // get current hours
        let hours = date_time.getHours();

        // get current minutes
        let minutes = date_time.getMinutes();

        // get current seconds
        let seconds = date_time.getSeconds();
        await db
          .get()
          .collection(collection.EXPERT_COLLECTION)
          .updateOne(
            { _id: ObjectId(data.id) },
            {
              $set: {
                applied: false,
                verified: true,
                expertFrom:
                  year +
                  '-' +
                  month +
                  '-' +
                  date +
                  ' ' +
                  hours +
                  ':' +
                  minutes +
                  ':' +
                  seconds,
              },
              $push: {
                accepted: {
                  message: data.message,
                },
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

  getVideoApprovalList: () => {
    return new Promise(async (resolve, reject) => {
      try {
        const details = await db
          .get()
          .collection(collection.VIDEO_COLLECTION)
          .aggregate([
            {
              $match: { $and: [{ approved: false }, { uploaded: true }] },
            },
            {
              $lookup: {
                from: collection.EXPERT_COLLECTION,
                let: { eid: '$expertId' },
                pipeline: [
                  {
                    $match: {
                      $expr: {
                        $eq: ['$_id', { $toObjectId: '$$eid' }],
                      },
                    },
                  },
                ],
                as: 'experts',
              },
            },
            {
              $set: {
                experts: {
                  $arrayElemAt: ['$experts', 0],
                },
              },
            },
            {
              $project: {
                title: 1,
                type: 1,
                link: 1,
                description: 1,
                category: 1,
                expertId: 1,
                experts: {
                  name: 1,
                  expertisedIn: 1,
                },
              },
            },
          ])
          .toArray();
        // console.log(details);
        resolve(details);
      } catch (error) {
        reject();
      }
    });
  },

  getVideoDetails: (id) => {
    return new Promise(async (resolve, reject) => {
      try {
        const details = await db
          .get()
          .collection(collection.VIDEO_COLLECTION)
          .aggregate([
            {
              $match: { _id: ObjectId(id) },
            },

            {
              $lookup: {
                from: collection.EXPERT_COLLECTION,
                let: { eid: '$expertId' },
                pipeline: [
                  {
                    $match: {
                      $expr: {
                        $eq: ['$_id', { $toObjectId: '$$eid' }],
                      },
                    },
                  },
                ],
                as: 'expert',
              },
            },
            {
              $set: {
                expert: {
                  $arrayElemAt: ['$expert', 0],
                },
              },
            },
          ])
          .toArray();

        resolve(details);
      } catch (error) {
        console.log(error);
      }
    });
  },
  approveVideo: (videoId) => {
    return new Promise(async (resolve, reject) => {
      try {
        let date_time = new Date();

        // get current date
        // adjust 0 before single digit date
        let date = ('0' + date_time.getDate()).slice(-2);

        // get current month
        let month = ('0' + (date_time.getMonth() + 1)).slice(-2);

        // get current year
        let year = date_time.getFullYear();

        // get current hours
        let hours = date_time.getHours();

        // get current minutes
        let minutes = date_time.getMinutes();

        // get current seconds
        let seconds = date_time.getSeconds();
        await db
          .get()
          .collection(collection.VIDEO_COLLECTION)
          .updateOne(
            { _id: ObjectId(videoId) },
            {
              $set: {
                approved: true,
                uploaded: false,
                videoPosted:
                  year +
                  '-' +
                  month +
                  '-' +
                  date +
                  ' ' +
                  hours +
                  ':' +
                  minutes +
                  ':' +
                  seconds,
                // videoPosted: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
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

  getAllVideos: () => {
    return new Promise(async (resolve, reject) => {
      try {
        const details = await db
          .get()
          .collection(collection.VIDEO_COLLECTION)
          .aggregate([
            {
              $match: { approved: true },
            },
            {
              $lookup: {
                from: collection.EXPERT_COLLECTION,
                let: { eid: '$expertId' },
                pipeline: [
                  {
                    $match: {
                      $expr: {
                        $eq: ['$_id', { $toObjectId: '$$eid' }],
                      },
                    },
                  },
                ],
                as: 'experts',
              },
            },
            {
              $set: {
                experts: {
                  $arrayElemAt: ['$experts', 0],
                },
              },
            },
            {
              $project: {
                title: 1,
                type: 1,
                link: 1,
                description: 1,
                category: 1,
                expertId: 1,
                experts: {
                  name: 1,
                  expertisedIn: 1,
                },
              },
            },
          ])
          .toArray();
        // console.log(details);
        resolve(details);
      } catch (error) {
        reject();
      }
    });
  },

  deleteVideo: (id) => {
    return new Promise(async (resolve, reject) => {
      try {
        await db
          .get()
          .collection(collection.VIDEO_COLLECTION)
          .deleteOne({ _id: ObjectId(id) })
          .then(() => {
            resolve();
          })
          .catch(() => {
            reject();
          });
      } catch (error) {
        console.log(error);
      }
    });
  },

  getVideoApprovalCount: () => {
    return new Promise(async (resolve, reject) => {
      try {
        const videoApprovalcount = await db
          .get()
          .collection(collection.VIDEO_COLLECTION)
          .countDocuments({ $and: [{ uploaded: true }, { approved: false }] });

        resolve(videoApprovalcount);
      } catch (error) {
        console.log(error);
      }
    });
  },

  getEditVideoDetails: (id) => {
    return new Promise(async (resolve, reject) => {
      try {
        const details = await db
          .get()
          .collection(collection.VIDEO_COLLECTION)
          .find({ _id: ObjectId(id) })
          .toArray();
        resolve(details);
      } catch (error) {
        console.log(error);
      }
    });
  },

  adminEditVideo: (data) => {
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
                category: data.category,
                description: data.description,
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

  adminRejectVideo: (data) => {
    return new Promise(async (resolve, reject) => {
      try {
        await db
          .get()
          .collection(collection.VIDEO_COLLECTION)
          .updateOne(
            { _id: ObjectId(data.id) },
            {
              $set: {
                uploaded: false,
              },
              $push: {
                videoRejected: {
                  expert: data.name,
                  reason: data.reason,
                  message: data.message,
                },
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

  getPaymentDetails: () => {
    return new Promise(async (resolve, reject) => {
      try {
        const data = await db
          .get()
          .collection(collection.PURCHASE_COLLECTION)
          .aggregate([
            {
              $lookup: {
                from: collection.EXPERT_COLLECTION,
                localField: 'expertId',
                foreignField: '_id',
                as: 'expert',
              },
            },
            {
              $lookup: {
                from: collection.USER_COLLECTION,
                localField: 'userId',
                foreignField: '_id',
                as: 'user',
              },
            },
            {
              $lookup: {
                from: collection.PLAN_COLLECTION,
                localField: 'planId',
                foreignField: '_id',
                as: 'plan',
              },
            },
            {
              $unwind: '$expert',
            },
            {
              $unwind: '$user',
            },
            {
              $unwind: '$plan',
            },
            {
              $project: {
                _id: 1,
                planId: 1,
                expertId: 1,
                userId: 1,
                validFrom: 1,
                validTill: 1,
                expert: {
                  name: 1,
                },
                user: {
                  name: 1,
                  pet: 1,
                },
                plan: {
                  validity: 1,
                  currentPrice: 1,
                  planName: 1,
                },
              },
            },
          ])
          .toArray();
        // console.log(data);
        resolve(data);
      } catch (error) {
        reject();
      }
    });
  },

  getPaymentAllDetails: (id) => {
    return new Promise(async (resolve, reject) => {
      try {
        const data = await db
          .get()
          .collection(collection.PURCHASE_COLLECTION)
          .aggregate([
            {
              $match: {
                _id: ObjectId(id),
              },
            },
            {
              $lookup: {
                from: collection.EXPERT_COLLECTION,
                localField: 'expertId',
                foreignField: '_id',
                as: 'expert',
              },
            },
            {
              $lookup: {
                from: collection.USER_COLLECTION,
                localField: 'userId',
                foreignField: '_id',
                as: 'user',
              },
            },
            {
              $lookup: {
                from: collection.PLAN_COLLECTION,
                localField: 'planId',
                foreignField: '_id',
                as: 'plan',
              },
            },
            {
              $unwind: '$expert',
            },
            {
              $unwind: '$user',
            },
            {
              $unwind: '$plan',
            },
            {
              $project: {
                _id: 1,
                planId: 1,
                expertId: 1,
                userId: 1,
                validFrom: 1,
                validTill: 1,
                expert: {
                  name: 1,
                  email: 1,
                  mobile: 1,
                  dob: 1,
                  gender: 1,
                  expertisedIn: 1,
                  experience: 1,
                  profilePic: 1,
                },
                user: {
                  name: 1,
                  email: 1,
                  mobile: 1,
                  pet: 1,
                  profileImage: 1,
                },
                plan: {
                  planName: 1,
                  validity: 1,
                  currentPrice: 1,
                  dietPlan: 1,
                  expertAvailability: 1,
                  numberOfCheckup: 1,
                  tipAvailabilty: 1,
                },
              },
            },
          ])
          .toArray();
        // console.log(data);
        resolve(data);
      } catch (error) {
        reject();
      }
    });
  },

  getFeedback: () => {
    return new Promise(async (resolve, reject) => {
      try {
        const data = await db
          .get()
          .collection(collection.FEEDBACK_COLLECTION)
          .find()
          .toArray();

        resolve(data);
      } catch (error) {
        reject();
      }
    });
  },

  approveFeedback: (id) => {
    return new Promise((resolve, reject) => {
      try {
        db.get()
          .collection(collection.FEEDBACK_COLLECTION)
          .updateOne({ _id: ObjectId(id) }, { $set: { approved: true } })
          .then(async () => {
            const details = await db
              .get()
              .collection(collection.FEEDBACK_COLLECTION)
              .find()
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

  disapproveFeedback: (id) => {
    return new Promise((resolve, reject) => {
      try {
        db.get()
          .collection(collection.FEEDBACK_COLLECTION)
          .updateOne({ _id: ObjectId(id) }, { $set: { approved: false } })
          .then(async () => {
            const details = await db
              .get()
              .collection(collection.FEEDBACK_COLLECTION)
              .find()
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

  getFeedbackDetails: (id) => {
    return new Promise(async (resolve, reject) => {
      try {
        const data = await db
          .get()
          .collection(collection.FEEDBACK_COLLECTION)
          .findOne({ _id: ObjectId(id) });
        resolve(data);
      } catch (error) {
        console.log(error);
      }
    });
  },

  deleteFeedback: (id) => {
    return new Promise(async (resolve, reject) => {
      try {
        await db
          .get()
          .collection(collection.FEEDBACK_COLLECTION)
          .deleteOne({ _id: ObjectId(id) })
          .then(async () => {
            const details = await db
              .get()
              .collection(collection.FEEDBACK_COLLECTION)
              .find()
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

  getExpertDetailedView:(expertId)=>{
    return new Promise(async(resolve,reject)=>{
      try {
        const data=await db.get().collection(collection.EXPERT_COLLECTION).aggregate([
          {
            $match:{
              _id:ObjectId(expertId)
            }
          },{
            $lookup: {
              from: collection.PURCHASE_COLLECTION,
              localField: '_id',
              foreignField: 'expertId',
              as: 'clients',
            },
          },{
            $addFields:{
              usersCount:{"$size": "$clients" }
            }
          }
        ]).toArray()
       
        resolve(data)
      } catch (error) {
        console.log(error);
      }
    })
  },

  getExpertChangeRequestCount:()=>{
    return new Promise(async(resolve,reject)=>{
      try {
        const count=await db.get().collection(collection.PURCHASE_COLLECTION).countDocuments({ expertChangeRequest: { $exists: true } })
       
        resolve(count)
      } catch (error) {
        console.log(error);
      }
    })
  }
};
