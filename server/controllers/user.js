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

exports.getUserPersonalInformation = asyncHandler(async (req, res, next) => {
  try {
    //const userId = req.params.id;
    res.status(200).json({
      headline: 'Tattoos last forever',
      bio: 'I like tattoos',
      location: 'Denver, CO USA',
    });
    // const user = await User.findById(userId);
    // res.status(200).json({
    //   headline: user.personalInformationHeadline,
    //   bio: user.personalInformationBio,
    //   location: user.personalInformationLocation,
    // });
  } catch (error) {
    res.status(500);
    throw new Error('failed to get user');
  }
});
