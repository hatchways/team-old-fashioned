const User = require('../models/User');
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

exports.updateProfilePicture = asyncHandler(async (req, res, next) => {
  const { url } = req.body;
  const userId = req.user.id;
  try {
    const user = await User.findOneAndUpdate(
      { _id: mongoose.Types.ObjectId(userId) },
      { profilePicUrl: url },
      { new: true },
    );

    profile = getProfile(user);

    res.status(200).json({
      message: 'profile picture updated',
      profile,
    });
  } catch (err) {
    res.status(500);
    throw new Error('Failed to update profile picture url');
  }
});
