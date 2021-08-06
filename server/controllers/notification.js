const mongoose = require('mongoose');
const asyncHandler = require('express-async-handler');
const Notification = require('../models/Notification');
const Contest = require('../models/Contest');
const User = require('../models/User');

exports.createNotification = asyncHandler(async (req, res, next) => {
  const senderId = req.user.id;
  const { type } = req.body;
  const typeList = ['submission', 'message'];
  if (!typeList.includes(type)) {
    res.status(400);
    throw new Error('No such notification type.');
  } else {
    let params;
    if (type === 'submission') {
      const { files, _id: submissionId, contestId } = req.body;
      // Use last file in submission array while submission featured photo is not yet set
      const photo = files[files.length - 1];
      const receiverId = await Contest.findById(contestId).then((contest) => {
        return contest.userId;
      });
      params = { type, receiverId, senderId, contestId, submissionId, photo };
    } else if (type === 'message') {
      const { receiverId } = req.body;
      params = { type, receiverId, senderId };
    }

    const notification = await Notification.create(params);

    if (!notification) {
      res.status(500);
      throw new Error('Invalid notification data');
    }

    res.status(201).json(notification);
  }
});

exports.markAsRead = asyncHandler(async (req, res, next) => {
  const notificationId = req.params.id;

  const notification = await Notification.findByIdAndUpdate(notificationId, { readStatus: true }, { new: true });

  if (!notification) {
    res.status(500);
    throw new Error(`Failed to mark notification as read`);
  }
  res.status(200).json(notification);
});

exports.getNotifications = asyncHandler(async (req, res, next) => {
  const userId = req.user.id;

  // Lists notifications for the user as the receiver
  let notifications = await Notification.find({ receiverId: mongoose.Types.ObjectId(userId) }).populate([
    { path: 'contestId', model: 'Contest', select: ['title'] },
    { path: 'senderId', model: 'user', select: 'username' },
  ]);

  if (!notifications) {
    res.status(500);
    throw new Error('failed to get notifications');
  }

  res.status(200).json(notifications);
});

const getSocketReceiver = async (receiverId, connectedUsers) => {
  return await User.findById(receiverId)
    .then((user) => {
      return user.email;
    })
    .then((email) => {
      return connectedUsers.find((user) => user.email === email);
    });
};

module.exports.socketCreateNotification = function (socket, connectedUsers) {
  socket.on('create notification', async function (data) {
    const submissionData = data.returnData.submission;
    const type = data.type;

    const typeList = ['submission', 'message'];
    if (!typeList.includes(type)) {
      throw new Error('No such notification type.');
    } else {
      let params;
      if (type === 'submission') {
        const { files, _id: submissionId, contestId, userId: senderId } = submissionData;
        // Use last file in submission array while submission featured photo is not yet set
        const photo = files[files.length - 1];
        const receiverId = await Contest.findById(contestId).then((contest) => {
          return contest.userId;
        });
        params = { type, receiverId, senderId, contestId, submissionId, photo };
      } else if (type === 'message') {
        const { receiverId, userId: senderId } = submissionData;
        params = { type, receiverId, senderId };
      }

      const notification = await Notification.create(params);

      if (!notification) {
        throw new Error('Invalid notification data');
      } else {
        const receiver = getSocketReceiver(params.receiverId, connectedUsers);
        if (receiver) {
          socket.to(receiver).emit('notification created');
        }
      }
    }
  });
};
