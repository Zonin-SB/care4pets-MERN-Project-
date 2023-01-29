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

  getAllMessages: (to, from) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = {};
        const messageFrom = await db
          .get()
          .collection(collection.CHAT_COLLECTION)
          .aggregate([
            {
              $match: {
                $and: [{ to: ObjectId(to) }, { from: from }],
              },
            },
            {
              $unwind: '$messages',
            },
            {
              $project: {
                _id: 1,
                messages: 1,
              },
            },
          ])
          .toArray();
        // console.log(messageFrom,'msgs');

        const messageTo = await db
          .get()
          .collection(collection.CHAT_COLLECTION)
          .aggregate([
            {
              $match: {
                $and: [{ to: from }, { from: ObjectId(to) }],
              },
            },
            {
              $unwind: '$messages',
            },
            {
              $project: {
                _id: 1,
                messages: 1,
              },
            },
          ])
          .toArray();
        // console.log(messageTo);

        if (messageFrom.length === 0) {
          messageFrom = false;
        } else {
          response.from = messageFrom[0]._id;
        }
        if (messageTo.length === 0) {
          messageTo = false;
        } else {
          response.to = messageTo[0]._id;
        }

        if (messageFrom && messageTo) {
          let mergedArray = messageFrom.concat(messageTo);
          mergedArray.sort(
            (a, b) =>
              new Date(a.messages.realtime) - new Date(b.messages.realtime)
          );
          response.message = mergedArray;
        } else if (messageFrom) {
          response.message = messageFrom;
        } else if (messageTo) {
          response.message = messageTo;
        } else {
          response.message = false;
        }
        // console.log(response, 'merg res');
        resolve(response);
      } catch (error) {
        reject(error);
      }
    });
  },
};
