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
                pet: userData.pet,
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

  getExperts: () => {
    return new Promise(async (resolve, reject) => {
      try {
        const experts = await db
          .get()
          .collection(collection.EXPERT_COLLECTION)
          .aggregate([
            {
              $match: {
                verified: true,
              },
            },
            {
              $project: {
                name: 1,
                profilePic: 1,
                expertisedIn: 1,
                experience:1,
                expertFrom:1,
              },
            },
          ])
          .toArray();
        
        resolve(experts);
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
            $and: [
              { expertisedIn: userPet },
              { blocked: false },
              { verified: true },
            ],
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
          success_url: `${process.env.CLIENT_URL}/buyPlanSuccess?session_id={CHECKOUT_SESSION_ID}`,
          cancel_url: `${process.env.CLIENT_URL}/userBuyPlan`,
        });
        // console.log(response,'check res');
        // console.log(session);
        resolve(session);
        // res.send({url:session.url});
      } catch (error) {
        console.log(error);
      }
    });
  },

  postPlanOrderValues: (data) => {
    // console.log(data);
    return new Promise(async (resolve, reject) => {
      try {
        const orderDetails = {};
        let validFrom = new Date();
        let validTill = new Date();
        validTill.setMonth(
          validFrom.getMonth() + data.planOrderValues.planValidity
        );
        // get current date
        // adjust 0 before single digit date
        let date = ('0' + validFrom.getDate()).slice(-2);

        // get current month
        let month = ('0' + (validFrom.getMonth() + 1)).slice(-2);

        // get current year
        let year = validFrom.getFullYear();

        // get current hours
        let hours = validFrom.getHours();

        // get current minutes
        let minutes = validFrom.getMinutes();

        // get current seconds
        let seconds = validFrom.getSeconds();

        // get current date
        // adjust 0 before single digit date
        let validTillDate = ('0' + validTill.getDate()).slice(-2);

        // get current month
        let validTillMonth = ('0' + (validTill.getMonth() + 1)).slice(-2);

        // get current year
        let validTillYear = validTill.getFullYear();

        // get current hours
        let validTillHours = validTill.getHours();

        // get current minutes
        let validTillMinutes = validTill.getMinutes();

        // get current seconds
        let validTillSeconds = validTill.getSeconds();

        validFrom =
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
          seconds;

        validTill =
          validTillYear +
          '-' +
          validTillMonth +
          '-' +
          validTillDate +
          ' ' +
          validTillHours +
          ':' +
          validTillMinutes +
          ':' +
          validTillSeconds;

        (orderDetails.planId = ObjectId(data.planOrderValues.planId)),
          (orderDetails.expertId = ObjectId(data.planOrderValues.expertId)),
          (orderDetails.userId = ObjectId(data.planOrderValues.userId)),
          (orderDetails.validFrom = validFrom);
        orderDetails.validTill = validTill;
        orderDetails.plan = data.planOrderValues.planName;
        const redirectUrl = data.succesurl;

        const url = new URL(redirectUrl);
        const sessionId = url.searchParams.get('session_id');
        const session = await stripe.checkout.sessions.retrieve(sessionId);
        // console.log(session.status,'session status'); // "complete" or "canceled"
        if (session.status === 'complete') {
          db.get()
            .collection(collection.PURCHASE_COLLECTION)
            .insertOne(orderDetails)
            .then(() => {
              resolve();
            })
            .catch((error) => {
              reject(error);
            });
        } else {
          console.log('payment failed');
        }
      } catch (error) {
        console.log(error);
      }
    });
  },

  getFreeVideos: (userData) => {
    const userPet = userData.pet;

    return new Promise(async (resolve, reject) => {
      try {
        const videos = await db
          .get()
          .collection(collection.VIDEO_COLLECTION)
          .aggregate([
            {
              $match: {
                $and: [
                  {
                    category: userPet,
                  },
                  { approved: true },
                  { type: 'Free' },
                ],
              },
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
                videoPosted: 1,
                experts: {
                  name: 1,
                  expertisedIn: 1,
                  profilePic: 1,
                },
              },
            },
          ])
          .toArray();

        resolve(videos);
      } catch (error) {
        console.log(error);
      }
    });
  },

  getVideosCount: (id) => {
    return new Promise(async (resolve, reject) => {
      try {
        const count = await db
          .get()
          .collection(collection.VIDEO_COLLECTION)
          .countDocuments({
            $and: [{ expertId: ObjectId(id) }, { approved: true }],
          });

        resolve(count);
      } catch (error) {
        console.log(error);
      }
    });
  },

  findPlanById: (id) => {
    return new Promise(async (resolve, reject) => {
      try {
        const details = await db
          .get()
          .collection(collection.PURCHASE_COLLECTION)
          .findOne({ userId: ObjectId(id) });

        resolve(details);
      } catch (error) {
        console.log(error);
      }
    });
  },

  getPlanDetails: (data) => {
    return new Promise(async (resolve, reject) => {
      try {
        const details = await db
          .get()
          .collection(collection.PLAN_COLLECTION)
          .findOne({ _id: data.planId });

        resolve(details);
      } catch (error) {
        console.log(error);
      }
    });
  },

  getPlanVideos: (data) => {
    return new Promise(async (resolve, reject) => {
      try {
        const videos = await db
          .get()
          .collection(collection.VIDEO_COLLECTION)
          .find({
            $and: [
              { expertId: data.expertId },
              { type: data.plan },
              { approved: true },
            ],
          })
          .toArray();

        resolve(videos);
      } catch (error) {
        console.log(error);
      }
    });
  },

  getYourExpertDetails: (data) => {
    return new Promise(async (resolve, reject) => {
      try {
        const expert = await db
          .get()
          .collection(collection.EXPERT_COLLECTION)
          .aggregate([
            {
              $match: {
                _id: data.expertId,
              },
            },
            {
              $project: {
                name: 1,
                profilePic: 1,
                expertisedIn: 1,
              },
            },
          ])
          .toArray();

        resolve(expert);
      } catch (error) {
        reject(error);
      }
    });
  },
};
