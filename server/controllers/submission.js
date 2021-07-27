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
    if (isOwner) {
      const submissions = await Submission.find({ contestId: contestId });
      submissions.map(async (submission) => {
        const name = await User.findOne({ _id: submission.userId });
        const submissionData = {
          _id: submission._id,
          name: name.username,
          files: submission.files,
        };
        submissionList.push(submissionData);
        if (submissionList.length === submissions.length) {
          res.status(200).json({ submission: submissionList, isOwner: true });
        }
      });
    } else {
      const submissions = await Submission.find({ userId: userId });
      submissions.map(async (submission) => {
        const name = await User.findOne({ _id: submission.userId });
        const submissionData = {
          _id: submission._id,
          name: name.username,
          files: submission.files,
        };
        submissionList.push(submissionData);
        if (submissionList.length === submissions.length) {
          res.status(200).json({ submission: submissionList, isOwner: false });
        }
      });
    }
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
});
