const mongoose = require('mongoose');
const asyncHandler = require('express-async-handler');
const Notification = require('../models/Notification');
const Contest = require('../models/Contest');
const User = require('../models/User');

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
  try {
    return await User.findById(receiverId)
      .then((user) => {
        return user.email;
      })
      .then((email) => {
        return connectedUsers.find((user) => email === user.email).socketId;
      });
  } catch (error) {
    console.log('User offline');
  }
};

const socketEmit = (receiverId, message, connectedUsers, socket) => {
  getSocketReceiver(receiverId, connectedUsers).then((receiver) => {
    socket.to(receiver).emit(message);
  });
};

module.exports.socketCreateNotification = function (socket, connectedUsers) {
  socket.on('create notification', async function (data) {
    const type = data.type;

    const typeList = ['submission', 'message'];
    if (!typeList.includes(type)) {
      throw new Error('No such notification type.');
    } else {
      let params;
      if (type === 'submission') {
        const { files, _id: submissionId, contestId, userId: senderId } = data.returnData.submission;
        // Use last file in submission array while submission featured photo is not yet set
        const photo = files[files.length - 1];
        const receiverId = await Contest.findById(contestId).then((contest) => {
          return contest.userId;
        });
        params = { type, receiverId, senderId, contestId, submissionId, photo };
      } else if (type === 'message') {
        const { receiver, userId: senderId, conversationId } = data;
        const receiverId = await User.findOne({ email: receiver }).then((user) => {
          return user.id;
        });
        const photo = await User.findById(senderId).then((user) => {
          return user.profilePicUrl;
        });
        params = { type, receiverId, senderId, conversationId, photo };
      }

      const notification = await Notification.create(params);

      if (!notification) {
        throw new Error('Invalid notification data');
      } else {
        socketEmit(params.receiverId, 'notification created', connectedUsers, socket);
      }
    }
  });
};

module.exports.markAsRead = function (socket, connectedUsers) {
  socket.on('read notification', async function (data) {
    const { notificationId, receiverId } = data;

    const notification = await Notification.findByIdAndUpdate(notificationId, { readStatus: true }, { new: true });

    if (!notification) {
      throw new Error(`Failed to mark notification as read`);
    } else {
      socketEmit(receiverId, 'notification updated', connectedUsers, socket);
    }
  });
};
