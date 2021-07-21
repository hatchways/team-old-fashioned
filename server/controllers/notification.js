const asyncHandler = require('express-async-handler');
const Notification = require('../models/Notification');
const Contest = require('../models/Contest');
const mongoose = require('mongoose');

exports.createNotification = asyncHandler(async (req, res, next) => {
  const senderId = req.user.id;
  const { type } = req.body;
  const typeList = ['submission', 'message'];
  if (!typeList.includes(type)) {
    res.status(400);
    throw new Error('Unsupported notification type');
  } else {
    if (type === 'submission') {
      const { _id: submissionId, contestId, submitDate: timeSent } = req.body;
      const receiverId = await Contest.findById(contestId).then((contest) => {
        return contest.user;
      });
      var params = { type, receiverId, senderId, contestId, submissionId, timeSent };
    } else if (type === 'message') {
      const { receiverId, sendDate: timeSent } = req.body;
      var params = { type, receiverId, senderId, timeSent };
    }
    const notification = await Notification.create(params);

    if (!notification) {
      res.status(500);
      throw new Error('invalid notification data');
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
  console.log(userId);
  const notifications = await Notification.find({ receiverId: mongoose.Types.ObjectId(userId) });

  if (!notifications) {
    res.status(500);
    throw new Error('failed to get notifications');
  }
  res.status(200).json(notifications);
});
