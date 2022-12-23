const bcrypt = require('bcrypt');
const collection = require('../config/collection');
const db = require('../config/connection');

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
};
