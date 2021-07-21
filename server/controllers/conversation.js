const asyncHandler = require('express-async-handler');
const Conversation = require('../models/Conversation');
const Message = require('../models/Message');
const User = require('../models/User');

exports.createConversation = asyncHandler(async (req, res, next) => {
  const { from, to } = req.body;
  console.log(from, to);
  try {
    if (!from || !to) {
      res.status(400).json({
        error: 'from and to are required',
      });
      throw new Error('from and to are required');
    }

    const user1 = await User.findOne({ email: from });
    const user2 = await User.findOne({ email: to });
    if (!user1 || !user2) {
      res.status(400).json({
        error: 'unknown user',
      });
      throw new Error('unknown user');
    }

    const conversation = await Conversation.create({
      user1: user1.get('_id'),
      user2: user2.get('_id'),
    });

    res.status(201).json({
      success: true,
      conversation,
    });
  } catch (error) {}
});
