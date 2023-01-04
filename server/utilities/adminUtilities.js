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

  deletePlan:(planId)=>{
    return new Promise(async(resolve,reject)=>{
      try {
        await db.get().collection(collection.PLAN_COLLECTION).deleteOne({_id:ObjectId(planId)}).then(async()=>{
          const planDetails=await db.get().collection(collection.PLAN_COLLECTION).find().toArray()
          resolve(planDetails)
        }).catch(()=>{
          reject()
        })
      } catch (error) {
        console.log(error);
      }
    })
  },

  getPlanDetails:(planId)=>{
    return new Promise(async(resolve,reject)=>{
      try {
        const details=await db.get().collection(collection.PLAN_COLLECTION).find({_id:ObjectId(planId)}).toArray()
        resolve(details)
      } catch (error) {
        console.log(error);
      }
    })
  }
};
