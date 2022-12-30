const bcrypt = require('bcrypt');
const collection = require('../config/collection');
const db = require('../config/connection');

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
};
