const User = require('../models/User');
const asyncHandler = require('express-async-handler');

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
    const user = User.findOneAndUpdate({ email }, { headline, bio, location });
    res.status(202).json({
      success: true,
    });
  } catch (err) {
    res.status(400);
    throw new Error('Failed to update personal information');
  }
  next();
});
