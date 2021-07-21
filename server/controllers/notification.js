const asyncHandler = require('express-async-handler');
const Notification = require('../models/Notification');
const Contest = require('../models/Contest');
const mongoose = require('mongoose');

// handler for creating/sending a notification
exports.createNotification = asyncHandler(async (req, res, next) => {
  const { type } = req.body;
  const typeList = ['submission', 'message'];
  if (!typeList.includes(type)) {
    res.status(400);
    throw new Error('Unsupported notification type');
  } else {
    if (type === 'submission') {
      var { files, _id: submissionId, contestId, userId: senderId, submitDate: timeSent } = req.body;
      var receiverId = await Contest.findById(contestId).then((contest) => {
        return contest.user;
      });
    } else if (type === 'message') {
    }
    const notification = await Notification.create({ type, receiverId, senderId, contestId, submissionId, timeSent });

    if (notification) {
      res.status(201).json(notification);
    } else {
      res.status(500);
      throw new Error('invalid notification data');
    }
  }
});
