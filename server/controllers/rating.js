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
