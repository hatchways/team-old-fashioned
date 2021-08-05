const asyncHandler = require('express-async-handler');
const ObjectId = require('mongoose').Types.ObjectId;
const Contest = require('../models/Contest');
const Submission = require('../models/Submission');
const User = require('../models/User');

//@GET /:id
//Get all submissions for contest owner or submitter
exports.getAllSubmissions = asyncHandler(async (req, res, next) => {
  const userId = req.user.id;
  const contestId = req.params.id;
  const submissionList = [];

  if (!ObjectId.isValid(contestId)) {
    return res.status(400).json({
      error: 'Contest ID is invalid.',
    });
  }

  try {
    const isOwner = await Contest.findOne({ userId: userId });
    const contestData = await Contest.findById(contestId).populate('userId');
    if (isOwner) {
      if (contestData.userId._id == userId) {
        const submissions = await Submission.find({ contestId: contestId }).populate('userId');
        if (submissions.length !== 0) {
          submissions.forEach((submission) => {
            const submissionData = {
              _id: submission._id,
              name: submission.userId.username,
              files: submission.files,
              ownerName: contestData.userId.username,
              title: contestData.title,
              description: contestData.description,
              prizeAmount: contestData.prizeAmount,
              profilePicUrl: contestData.userId.profilePicUrl,
            };
            submissionList.push(submissionData);
          });
        } else {
          const submissionData = {
            _id: null,
            name: null,
            files: null,
            ownerName: contestData.userId.username,
            title: contestData.title,
            description: contestData.description,
            prizeAmount: contestData.prizeAmount,
            profilePicUrl: contestData.userId.profilePicUrl,
          };
          submissionList.push(submissionData);
        }

        res.status(200).json({
          submission: submissionList,
          isOwner: true,
        });
      } else {
        const submissions = await Submission.find({ contestId: contestId }).populate('userId');

        if (submissions.length !== 0) {
          submissions.forEach((submission) => {
            if (submission.userId._id == userId) {
              const submissionData = {
                _id: submission._id,
                name: submission.userId.username,
                files: submission.files,
                ownerName: contestData.userId.username,
                title: contestData.title,
                description: contestData.description,
                prizeAmount: contestData.prizeAmount,
                profilePicUrl: contestData.userId.profilePicUrl,
              };
              submissionList.push(submissionData);
            }
          });
        } else {
          const submissionData = {
            _id: null,
            name: null,
            files: null,
            ownerName: contestData.userId.username,
            title: contestData.title,
            description: contestData.description,
            prizeAmount: contestData.prizeAmount,
            profilePicUrl: contestData.userId.profilePicUrl,
          };
          submissionList.push(submissionData);
        }

        res.status(200).json({
          submission: submissionList,
          isOwner: false,
        });
      }
    } else {
      const submission = await Submission.findOne({ userId: userId }).populate('userId');

      if (submission) {
        if (submission.contestId.toString() === contestId) {
          const submissionData = {
            _id: submission._id,
            name: submission.userId.username,
            files: submission.files,
            ownerName: contestData.userId.username,
            title: contestData.title,
            description: contestData.description,
            prizeAmount: contestData.prizeAmount,
            profilePicUrl: contestData.userId.profilePicUrl,
          };
          submissionList.push(submissionData);
        } else {
          const submissionData = {
            _id: null,
            name: null,
            files: null,
            ownerName: contestData.userId.username,
            title: contestData.title,
            description: contestData.description,
            prizeAmount: contestData.prizeAmount,
            profilePicUrl: contestData.userId.profilePicUrl,
          };
          submissionList.push(submissionData);
        }
      } else {
        const submissionData = {
          _id: null,
          name: null,
          files: null,
          ownerName: contestData.userId.username,
          title: contestData.title,
          description: contestData.description,
          prizeAmount: contestData.prizeAmount,
          profilePicUrl: contestData.userId.profilePicUrl,
        };
        submissionList.push(submissionData);
      }

      res.status(200).json({ submission: submissionList, isOwner: false });
    }
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
});
