const User = require('../models/User');
const Contest = require('../models/Contest');
const mongoose = require('mongoose');
const asyncHandler = require('express-async-handler');

const getProfile = (user) => {
  return {
    user: {
      email: user.get('email'),
      username: user.get('username'),
      headline: user.get('headline'),
      bio: user.get('bio'),
      location: user.get('location'),
      profilePicUrl: user.get('profilePicUrl'),
      coverPhoto: user.get('coverPhoto'),
    },
  };
};

// @route POST /users
// @desc Search for users
// @access Private
exports.searchUsers = asyncHandler(async (req, res, next) => {
  const searchString = req.query.search;

  let users;
  if (searchString) {
    users = await User.find({
      username: { $regex: searchString, $options: 'i' },
    });
  }

  if (!users) {
    res.status(404);
    throw new Error('No users found in search');
  }

  res.status(200).json({ users: users });
});

// @route POST /users/info
// @desc Update user personal info
// @access Public
exports.updatePersonalInformation = asyncHandler(async (req, res, next) => {
  const { email, headline, bio, location } = req.body;
  try {
    const user = await User.findOneAndUpdate(
      { email },
      { headline: headline, bio: bio, location: location },
      { new: true },
    );
    profile = getProfile(user);
    res.status(202).json({
      success: true,
      profile,
    });
  } catch (err) {
    res.status(400);
    throw new Error('Failed to update personal information');
  }
});

exports.getUserInfo = asyncHandler(async (req, res, next) => {
  const username = req.params.username;
  try {
    const user = await User.findOne({ username: username });
    profile = getProfile(user).user;
    res.status(200).json(profile);
  } catch (err) {
    res.status(400);
    throw new Error('Failed to retrieve personal information');
  }
});
exports.getContestsByUsername = asyncHandler(async (req, res, next) => {
  const username = req.params.username;
  try {
    const user = await User.findOne({ username: username });
    const contestList = await Contest.find({ userId: user.id, deadline: { $gte: new Date() } });
    res.status(200).json(contestList);
  } catch (err) {
    res.status(400);
    throw new Error('Failed to retrieve list of active contests');
  }
});

exports.updateProfilePhoto = asyncHandler(async (req, res, next) => {
  const { url, imageType } = req.body;
  const userId = req.user.id;
  try {
    const user = await User.findOneAndUpdate(
      { _id: mongoose.Types.ObjectId(userId) },
      imageType === 'Profile picture' ? { profilePicUrl: url } : imageType === 'Cover photo' ? { coverPhoto: url } : '',
      { new: true },
    );

    profile = getProfile(user);

    res.status(200).json({
      message: `${imageType} updated`,
      profile,
    });
  } catch (err) {
    res.status(500);
    throw new Error(`Failed to update ${imageType} url`);
  }
});

exports.confirmPaymentMethod = asyncHandler(async (req, res, next) => {
  const userId = req.user.id;
  const confirmed = req.params.val === '1';
  try {
    const user = await User.findOneAndUpdate(
      { _id: mongoose.Types.ObjectId(userId) },
      { payment_method_confirmed: confirmed },
      { new: true },
    );
    res.status(200).json({
      message: 'Payment method confirmed',
      user: {
        email: user.get('email'),
        username: user.get('username'),
        headline: user.get('headline'),
        bio: user.get('bio'),
        location: user.get('location'),
        profilePicUrl: user.get('profilePicUrl'),
        payment_method_confirmed: user.get('payment_method_confirmed'),
      },
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});
