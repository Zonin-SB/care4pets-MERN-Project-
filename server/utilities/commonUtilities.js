const collection = require('../config/collection');
const db = require('../config/connection');
const { ObjectId } = require('mongodb');

module.exports = {
  sendMessage: (to, from, data) => {
    return new Promise((resolve, reject) => {
      try {
        const currentDate = new Date();
        const time = currentDate.toLocaleString('en-US', {
          hour: 'numeric',
          minute: 'numeric',
          hour12: true,
        });
        const date = new Date().toLocaleDateString();
        const mess = {
          message: data.message,
          date: date,
          time: time,
          realtime: currentDate,
        };
        db.get()
          .collection(collection.CHAT_COLLECTION)
          .findOne({ $and: [{ to: ObjectId(to) }, { from: from }] })
          .then((response) => {
            if (response === null) {
              const messages = [mess];
              db.get()
                .collection(collection.CHAT_COLLECTION)
                .insertOne({
                  to: ObjectId(to),
                  from: from,
                  messages: messages,
                })
                .then(() => {
                  resolve();
                })
                .catch(() => {
                  reject();
                });
            } else {
              const messages = mess;
              db.get()
                .collection(collection.CHAT_COLLECTION)
                .updateOne(
                  { to: ObjectId(to), from: from },
                  {
                    $push: {
                      messages: messages,
                    },
                  }
                )
                .then(() => {
                  resolve();
                })
                .catch(() => {
                  reject();
                });
            }
          });
      } catch (error) {
        console.log(error);
      }
    });
  },

  getHomeFeedback: () => {
    return new Promise(async (resolve, reject) => {
      try {
        const data = await db
          .get()
          .collection(collection.FEEDBACK_COLLECTION)
          .find({ approved: true })
          .toArray();
        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  },

  getAllMessages: (to, from) =>
    new Promise(async (resolve, reject) => {
      try {
        const response = {};
        let fromMessage = await db
          .get()
          .collection(collection.CHAT_COLLECTION)
          .aggregate([
            { $match: { to: ObjectId(to), from: from } },

            { $unwind: '$messages' },
            { $project: { _id: 1, messages: 1 } },
          ])
          .toArray();

        let toMessage = await db
          .get()
          .collection(collection.CHAT_COLLECTION)
          .aggregate([
            { $match: { to: from, from: ObjectId(to) } },
            { $unwind: '$messages' },
            { $project: { _id: 1, messages: 1 } },
          ])
          .toArray();
        if (fromMessage.length === 0) {
          fromMessage = false;
        } else {
          response.from = fromMessage[0]._id;
        }
        if (toMessage.length === 0) {
          toMessage = false;
        } else {
          response.to = toMessage[0]._id;
        }

        if (fromMessage && toMessage) {
          let mergedArray = fromMessage.concat(toMessage);
          mergedArray.sort(
            (a, b) =>
              new Date(a.messages.realtime) - new Date(b.messages.realtime)
          );
          response.message = mergedArray;
        } else if (fromMessage) {
          response.message = fromMessage;
        } else if (toMessage) {
          response.message = toMessage;
        } else {
          response.message = false;
        }

        resolve(response);
      } catch (error) {
        reject(error);
      }
    }),
};
