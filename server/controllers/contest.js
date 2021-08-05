const asyncHandler = require('express-async-handler');
const ObjectId = require('mongoose').Types.ObjectId;
const mongoose = require('mongoose');
const Contest = require('../models/Contest');
const Submission = require('../models/Submission');
const User = require('../models/User');

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

// handler for selecting a contest winner
exports.selectWinner = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const { submissionId } = req.body;

  if (!ObjectId.isValid(id)) {
    res.status(400);
    throw new Error('Contest ID is invalid.');
  }
  if (!ObjectId.isValid(submissionId)) {
    res.status(400);
    throw new Error('Submission ID is invalid.');
  }

  let contest = await Contest.findById(id);
  if (contest.userId != req.user.id) {
    res.status(400);
    throw new Error('This contest belongs to another user.');
  }
  if (contest.deadline > new Date()) {
    res.status(400);
    throw new Error('You can select a winner after the deadline.');
  }
  if (contest.winningSubmission) {
    res.status(400);
    throw new Error('A winner for the contest has already been selected.');
  }

  const submission = await Submission.findById(submissionId);
  if (!submission) {
    res.status(400);
    throw new Error('No such submission found.');
  }

  if (submission.userId.toString() === contest.userId.toString()) {
    res.status(400);
    throw new Error('Submissions to own contest is forbidden.');
  }

  const userHasPaymentMethod = await User.findById(contest.userId).then((user) => {
    return user.payment_method_confirmed;
  });
  if (!userHasPaymentMethod) {
    res.status(400);
    throw new Error('Please add a payment method on your Settings Page.');
  }

  contest = await Contest.findByIdAndUpdate(id, { winningSubmission: submissionId }, { new: true });
  return res.status(200).json(contest);
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
  const contestList = [];
  const { search, title, startTime, endTime } = req.query;
  try {
    if (search === 'null' && title === 'null' && startTime === 'null' && endTime === 'null') {
      const contests = await Contest.find({}).populate('userId');
      contests.forEach((contest) => {
        const contestData = {
          _id: contest._id,
          ownerName: contest.userId.username,
          profileImg: contest.userId.profilePicUrl,
          title: contest.title,
          description: contest.description,
          prizeAmount: contest.prizeAmount,
        };
        contestList.push(contestData);
      });
      res.status(200).json({ contest: contestList });
    } else if (search !== 'null') {
      const contests = await Contest.find({ title: { $regex: new RegExp(search, 'i') } }).populate('userId');

      contests.forEach((contest) => {
        const contestData = {
          _id: contest._id,
          ownerName: contest.userId.username,
          profileImg: contest.userId.profilePicUrl,
          title: contest.title,
          description: contest.description,
          prizeAmount: contest.prizeAmount,
        };
        contestList.push(contestData);
      });
      if (contestList.length) {
        res.status(200).json({ success: { contest: contestList } });
      } else {
        res.status(200).json({ error: 'Could not find any match' });
      }
    } else {
      const contests = await Contest.find({
        $and: [
          { title: { $regex: new RegExp(title, 'i') } },
          { created: { $gt: startTime } },
          { deadline: { $lt: endTime } },
        ],
      }).populate('userId');

      contests.forEach((contest) => {
        const contestData = {
          _id: contest._id,
          ownerName: contest.userId.username,
          profileImg: contest.userId.profilePicUrl,
          title: contest.title,
          description: contest.description,
          prizeAmount: contest.prizeAmount,
        };
        contestList.push(contestData);
      });
      if (contestList.length) {
        res.status(200).json({ success: { contest: contestList } });
      } else {
        res.status(200).json({ error: 'Could not find any match' });
      }
    }
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
  const beforeDeadline = await Contest.findById(contestId).then((contest) => {
    return contest.deadline > new Date();
  });
  if (!beforeDeadline) {
    return res.status(400).json({ error: 'Submissions for this contest had been closed.' });
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
      { $match: { userId: mongoose.Types.ObjectId(userId) } },
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
