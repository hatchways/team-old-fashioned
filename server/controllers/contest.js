const asyncHandler = require('express-async-handler');
const ObjectId = require('mongoose').Types.ObjectId;
const mongoose = require('mongoose');
const Contest = require('../models/Contest');
const Submission = require('../models/Submission');

// handler for creating a new contest object
exports.createContest = asyncHandler(async (req, res, next) => {
  const { title, description, prizeAmount, deadline } = req.body;
  const userId = req.user.id;

  const contest = await Contest.create({ title, description, prizeAmount, deadline, userId });

  if (contest) {
    res.status(201).json({
      success: {
        message: 'New contest has been created successfully.',
        contest,
      },
    });
  } else {
    res.status(500);
    throw new Error('invalid contest data');
  }

  next();
});

// handler for updating a contest object
exports.updateContest = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const { description, prizeAmount, title } = req.body;

  try {
    const contest = await Contest.findOneAndUpdate(
      { id: id },
      { title: title, description: description, prizeAmount: prizeAmount },
    );

    res.status(200).json(contest);
  } catch (error) {
    res.status(500);
    throw new Error('failed to update contest');
  }

  next();
});

// handler for getting a contest by providing the contest id
exports.getContest = asyncHandler(async (req, res, next) => {
  try {
    const id = req.params.id;
    const contest = await Contest.findById(id);

    res.status(200).json(contest);
  } catch (error) {
    res.status(500);
    throw new Error(`failed to get contest by id: ${req.params.id}`);
  }
});

// handler for getting all the contests
exports.getContests = asyncHandler(async (req, res, next) => {
  try {
    const contests = await Contest.find({});
    res.status(200).json(contests);
  } catch (error) {
    res.status(500);
    throw new Error('failed to get contests');
  }
});

// handler for create submission by contest id
exports.createSubmissionByContestId = asyncHandler(async (req, res, next) => {
  const contestId = req.params.id;
  const s3UrlArray = req.body.data;
  const userId = req.user.id;
  if (!ObjectId.isValid(contestId)) {
    return res.status(400).json({
      error: 'Contest ID is invalid.',
    });
  }
  try {
    const userExist = await Submission.findOne({ userId: userId, contestId: contestId });
    if (userExist) {
      const newFilesData = userExist.files.concat(s3UrlArray);
      const submissionData = await Submission.findByIdAndUpdate(
        userExist._id,
        { files: newFilesData },
        {
          new: true,
        },
      );
      res.status(200).json({
        submission: submissionData,
      });
    } else {
      const submissionData = await Submission.create({
        contestId: contestId,
        userId: userId,
        files: s3UrlArray,
        isActive: true,
      });
      if (submissionData) {
        res.status(201).json({
          submission: submissionData,
        });
      }
    }
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
});

exports.getUserContests = asyncHandler(async (req, res, next) => {
  try {
    const userId = req.user.id;
    const contests = await Contest.aggregate([
      { $match: { user: mongoose.Types.ObjectId(userId) } },
      {
        $lookup: {
          from: 'submissions',
          localField: '_id',
          foreignField: 'contestId',
          as: 'subs',
        },
      },
    ]);

    res.status(200).json({
      success: true,
      contests,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});
