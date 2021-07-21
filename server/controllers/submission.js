const asyncHandler = require('express-async-handler');
const ObjectId = require('mongoose').Types.ObjectId;
const Contest = require('../models/Contest');
const Submission = require('../models/Submission');

//@GET /:id
//Get all submissions for contest owner or submitter
exports.getAllSubmissions = asyncHandler((req, res, next) => {
  const userId = req.user.id;
  const contestId = req.params.id;

  if (!ObjectId.isValid(contestId)) {
    return res.status(400).json({
      error: 'Contest ID is invalid.',
    });
  }

  try {
    const isOwner = await Contest.fineOne({ userId: userId });
    if (isOwner) {
      const submissions = Submission.find({ contestId: contestId });
      res.status(200).json({ submission: submissions });
    } else {
      const submissions = Submission.find({ userId: userId });
      res.status(200).json({ submission: submissions });
    }
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
});
