const mongoose = require('mongoose');
const asyncHandler = require('express-async-handler');
const Submission = require('../models/Submission');
const Contest = require('../models/Contest');
const User = require('../models/User');
const Rating = require('../models/Rating');

exports.rateArtist = asyncHandler(async (req, res, next) => {
  const raterId = req.user.id;
  const { numericalRating, textRating, submissionId, contestId } = req.body;
  const submission = await Submission.findById(submissionId);
  const artistId = submission.userId;
  const params = { raterId, numericalRating, textRating, submissionId, contestId, artistId };
  const rating = await Rating.create(params);
  res.status(201).json(rating);
});

exports.getRatings = asyncHandler(async (req, res, next) => {
  const artistUsername = req.params.username;
  const artistId = await User.findOne({ username: artistUsername })._id;
  const ratings = await Rating.find(artistId)
    .sort('-numericalRating')
    .populate([
      { path: 'contestId', model: 'Contest', select: ['title', 'createdAt'] },
      { path: 'raterId', model: 'user', select: ['username', 'profilePicUrl'] },
      { path: 'artistId', model: 'user', select: 'username' },
      { path: 'submissionId', model: 'submission', select: 'files' },
    ]);
  res.status(200).json(ratings);
});

// exports.getNotifications = asyncHandler(async (req, res, next) => {
//   const userId = req.user.id;

//   // Lists notifications for the user as the receiver
//   let notifications = await Notification.find({ receiverId: mongoose.Types.ObjectId(userId) })
//     .populate([
//       { path: 'contestId', model: 'Contest', select: ['title'] },
//       { path: 'senderId', model: 'user', select: 'username' },
//     ])
//     .sort('-createdAt');

//   if (!notifications) {
//     res.status(500);
//     throw new Error('failed to get notifications');
//   }

//   res.status(200).json(notifications);
// });

// const getSocketReceiver = async (receiverId, connectedUsers) => {
//   try {
//     return await User.findById(receiverId)
//       .then((user) => {
//         return user.email;
//       })
//       .then((email) => {
//         return connectedUsers.find((user) => email === user.email).socketId;
//       });
//   } catch (error) {
//     console.log('User offline');
//   }
// };

// const socketEmit = (receiverId, message, connectedUsers, socket) => {
//   getSocketReceiver(receiverId, connectedUsers).then((receiver) => {
//     socket.to(receiver).emit(message);
//   });
// };

// module.exports.socketCreateNotification = function (socket, connectedUsers) {
//   socket.on('create notification', async function (data) {
//     const type = data.type;

//     const typeList = ['submission', 'message'];
//     if (!typeList.includes(type)) {
//       throw new Error('No such notification type.');
//     } else {
//       let params;
//       if (type === 'submission') {
//         const { files, _id: submissionId, contestId, userId: senderId } = data.returnData.submission;
//         // Use last file in submission array while submission featured photo is not yet set
//         const photo = files[files.length - 1];
//         const receiverId = await Contest.findById(contestId).then((contest) => {
//           return contest.userId;
//         });
//         params = { type, receiverId, senderId, contestId, submissionId, photo };
//       } else if (type === 'message') {
//         const { receiver, userId: senderId, conversationId } = data;
//         const receiverId = await User.findOne({ email: receiver }).then((user) => {
//           return user.id;
//         });
//         const photo = await User.findById(senderId).then((user) => {
//           return user.profilePicUrl;
//         });
//         params = { type, receiverId, senderId, conversationId, photo };
//       }

//       const notification = await Notification.create(params);
//       if (notification && params.type === 'message') {
//         await Notification.deleteMany({ type: 'message', senderId: params.senderId, _id: { $ne: notification._id } });
//       }

//       if (!notification) {
//         throw new Error('Invalid notification data');
//       } else {
//         socketEmit(params.receiverId, 'notification created', connectedUsers, socket);
//       }
//     }
//   });
// };

// module.exports.markAsRead = function (socket, connectedUsers) {
//   socket.on('read notification', async function (data) {
//     const { notificationId, receiverId } = data;

//     const notification = await Notification.findByIdAndUpdate(notificationId, { readStatus: true }, { new: true });

//     if (!notification) {
//       throw new Error(`Failed to mark notification as read`);
//     } else {
//       socketEmit(receiverId, 'notification updated', connectedUsers, socket);
//     }
//   });
