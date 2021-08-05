const User = require('../models/User');
const asyncHandler = require('express-async-handler');
const generateToken = require('../utils/generateToken');
const verifyToken = require('../utils/verifyToken');
const bcrypt = require('bcryptjs');

// @route POST /auth/register
// @desc Register user
// @access Public
exports.registerUser = asyncHandler(async (req, res, next) => {
  const { username, email, password } = req.body;

  const emailExists = await User.findOne({ email });

  if (emailExists) {
    res.status(400);
    throw new Error('A user with that email already exists');
  }

  const usernameExists = await User.findOne({ username });

  if (usernameExists) {
    res.status(400);
    throw new Error('A user with that username already exists');
  }

  const user = await User.create({
    username,
    email,
    password,
  });

  if (user) {
    const token = generateToken(user._id);
    const secondsInWeek = 604800;

    res.cookie('token', token, {
      httpOnly: true,
      maxAge: secondsInWeek * 1000,
    });

    res.status(201).json({
      success: {
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
        },
        token: token,
      },
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// @route POST /auth/login
// @desc Login user
// @access Public
exports.loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    const token = generateToken(user._id);
    const secondsInWeek = 604800;

    res.cookie('token', token, {
      httpOnly: true,
      maxAge: secondsInWeek * 1000,
    });

    res.status(200).json({
      success: {
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          headline: user.headline ? user.headline : '',
          bio: user.bio ? user.bio : '',
          location: user.location ? user.location : '',
          profilePicUrl: user.profilePicUrl ? user.profilePicUrl : '',
          payment_method_confirmed: user.payment_method_confirmed,
          coverPhoto: user.coverPhoto ? user.coverPhoto : '',
        },
        token: token,
      },
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

// @route GET /auth/user
// @desc Get user data with valid token
// @access Private
exports.loadUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error('Not authorized');
  }

  res.status(200).json({
    success: {
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        headline: user.headline,
        bio: user.bio,
        location: user.location,
        profilePicUrl: user.profilePicUrl,
        payment_method_confirmed: user.payment_method_confirmed,
      },
    },
  });
});

// @route GET /auth/logout
// @desc Logout user
// @access Public
exports.logoutUser = asyncHandler(async (req, res, next) => {
  res.clearCookie('token');

  res.send('You have successfully logged out');
});

//@route POST /auth/reset-password
exports.resetPassword = asyncHandler(async (req, res, next) => {
  const { password, token } = req.body;
  try {
    const decoded = verifyToken(token);
    const salt = await bcrypt.genSalt(20);
    const newPassword = await bcrypt.hash(password, salt);
    const updatedUser = await User.findOneAndUpdate(
      { _id: decoded.id },
      {
        password: newPassword,
      },
    );
    return res.status(200).json({ success: { message: 'Your password has been updated.' } });
  } catch (e) {
    res.status(500).json(error);
  }
});
