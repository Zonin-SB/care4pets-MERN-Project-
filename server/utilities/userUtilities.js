const bcrypt = require('bcrypt');
const collection = require('../config/collection');
const db = require('../config/connection');
const { ObjectId } = require('mongodb');
const { cloudinary } = require('../middlewares/cloudinary');
const Stripe = require('stripe');
const { response } = require('express');

const stripe = Stripe(process.env.STRIPE_KEY);

module.exports = {
  doUserSignup: (data) => {
    return new Promise(async (resolve, reject) => {
      let email = await db
        .get()
        .collection(collection.USER_COLLECTION)
        .findOne({ $or: [{ email: data.email }, { mobile: data.mobile }] });

      if (email == null) {
        data.password = await bcrypt.hash(data.password, 10);

        db.get()
          .collection(collection.USER_COLLECTION)
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

  doUserLogin: (data) => {
    return new Promise(async (resolve, reject) => {
      let response = {};
      let user = await db
        .get()
        .collection(collection.USER_COLLECTION)
        .findOne({ email: data.email });
      if (user) {
        if (user.blocked) {
          response.blocked = true;

          resolve(response);
        } else {
          bcrypt.compare(data.password, user.password).then((status) => {
            if (status) {
              response.user = user;
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

  findUserById: (userId) => {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await db
          .get()
          .collection(collection.USER_COLLECTION)
          .findOne({ _id: ObjectId(userId) });

        resolve(user);
      } catch (error) {
        reject();
      }
    });
  },

  updateUserProfile: (userData) => {
    return new Promise(async (resolve, reject) => {
      try {
        await db
          .get()
          .collection(collection.USER_COLLECTION)
          .updateOne(
            { _id: ObjectId(userData.id) },
            {
              $set: {
                name: userData.name,
                email: userData.email,
                mobile: userData.mobile,
                pet:userData.pet,
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

  viewAllPlan: () => {
    return new Promise(async (resolve, reject) => {
      try {
        const planDetails = await db
          .get()
          .collection(collection.PLAN_COLLECTION)
          .find()
          .toArray();
        resolve(planDetails);
      } catch (error) {
        console.log(error);
      }
    });
  },

  uploadProfilePic: (fileStr) => {
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

  userProfilePicUpdate: (userData) => {
    return new Promise(async (resolve, reject) => {
      try {
        await db
          .get()
          .collection(collection.USER_COLLECTION)
          .updateOne(
            { _id: ObjectId(userData.id) },
            {
              $set: {
                profileImage: userData.profileImage,
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

  getUsersExpert: (userData) => {
    const userPet = userData.pet;
    return new Promise(async (resolve, reject) => {
      try {
        const expertDetails = await db
          .get()
          .collection(collection.EXPERT_COLLECTION)
          .find({
            $and:[{ expertisedIn: userPet},{blocked:false},{verified:true}]
           
          })
          .toArray();

       
        resolve(expertDetails);
      } catch (error) {
        console.log(error);
      }
    });
  },

  // selectExpert:(id)=>{
  //   console.log(id);
  //   return new Promise(async(resolve,reject)=>{
  //     try {
  //       await db.get().collection(collection.USER_COLLECTION).updateOne({ _id: ObjectId(id.userId)},{$set:{expertId:id.expertId}}).then((response)=>{
  //         resolve(response)
  //       }).catch((error)=>{
  //         reject()
  //       })
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   })
  // }

  selectExpert: (id) => {
    return new Promise(async (resolve, reject) => {
      try {
        const expert = await db
          .get()
          .collection(collection.EXPERT_COLLECTION)
          .find({ _id: ObjectId(id) })
          .toArray();

        resolve(expert);
      } catch (error) {
        console.log(error);
      }
    });
  },

  selectPlan: (id) => {
    return new Promise(async (resolve, reject) => {
      try {
        const plan = await db
          .get()
          .collection(collection.PLAN_COLLECTION)
          .find({ _id: ObjectId(id) })
          .toArray();

        resolve(plan);
      } catch (error) {
        console.log(error);
      }
    });
  },

  buyPlan: (data) => {
    return new Promise(async (resolve, reject) => {
      try {
        // const line_items=data.map((item)=>{
        //   return{
        //     price_data:{
        //       currency:'inr',
        //       product_data:{
        //         name:item.planName,
        //         validity:item.planValidity
        //       },
        //       unit_amount:item.planPrice*100,
        //     },
        //     quantity:1,
        //   }
        // })
        const session = await stripe.checkout.sessions.create({
          line_items: [
            {
              price_data: {
                currency: 'inr',
                product_data: {
                  name: data.planName,
                },
                unit_amount: data.planPrice * 100,
              },
              quantity: 1,
            },
          ],
          mode: 'payment',
          success_url: `${process.env.CLIENT_URL}/buyPlanSuccess`,
          cancel_url: `${process.env.CLIENT_URL}/userBuyPlan`,
        });
        console.log(response);
        console.log(session);
        resolve(session);
        // res.send({url:session.url});
      } catch (error) {
        console.log(error);
      }
    });
  },

  postPlanOrderValues: (data) => {
    return new Promise((resolve, reject) => {
      const orderDetails = {};
      const validFrom = new Date();
      const validTill = new Date();
      validTill.setMonth(validFrom.getMonth() + data.planValidity);

      (orderDetails.planId = data.planId),
        (orderDetails.expertId = data.expertId),
        (orderDetails.userId = data.userId),
        (orderDetails.validFrom = validFrom),
        (orderDetails.validTill = validTill);

      db.get()
        .collection(collection.PURCHASE_COLLECTION)
        .insertOne(orderDetails)
        .then((response) => {
          console.log(response);
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  // postPlanDetails: (data) => {
  //   return new Promise((resolve, reject) => {
  //     db.get().collection(collection.USER_COLLECTION)
  //   });
  // },
};

// getUsersExpert: (userData) => {
//   const userPet=userData.pet
//   return new Promise(async (resolve, reject) => {
//     try {
//       const expertDetails = await db
//         .get()
//         .collection(collection.USER_COLLECTION)
//         .aggregate([
//           {
//             $match: { _id: ObjectId(userId) },
//           },
//           {
//             $lookup: {
//               from: collection.EXPERT_COLLECTION,
//               localField: 'pet',
//               foreignField: 'expertisedIn',
//               as: 'experts',
//             },
//           },
//         ])
//         .toArray();
//       // console.log(expertDetails);
//       resolve(expertDetails);
//     } catch (error) {
//       console.log(error);
//     }
//   });
// },
