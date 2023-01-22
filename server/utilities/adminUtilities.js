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
          .countDocuments({ blocked: false });

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
        await db
          .get()
          .collection(collection.EXPERT_COLLECTION)
          .updateOne(
            { _id: ObjectId(data.id) },
            {
              $set: {
                applied: false,
                verified: true,
                expertFrom: new Date(),
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
              $match:{approved:false}
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
        await db
          .get()
          .collection(collection.VIDEO_COLLECTION)
          .updateOne(
            { _id: ObjectId(videoId) },
            {
              $set: {
                approved: true,
                videoPosted: new Date(),
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
              $match:{approved:true}
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

};
