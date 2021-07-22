const mongoose = require('mongoose');
const asyncHandler = require('express-async-handler');
const Conversation = require('../models/Conversation');
const Message = require('../models/Message');
const User = require('../models/User');

exports.createConversation = asyncHandler(async (req, res, next) => {
  const { from, to } = req.body;

  try {
    if (!from || !to) {
      res.status(400).json({
        error: 'from and to are required',
      });
      throw new Error('from and to are required');
    }

    const fromUser = await User.findOne({ email: from });
    const toUser = await User.findOne({ email: to });
    if (!fromUser || !toUser) {
      res.status(400).json({
        error: 'unknown user',
      });
      throw new Error('unknown user');
    }

    const conversation = await Conversation.create({
      fromUser: fromUser.get('_id'),
      toUser: toUser.get('_id'),
    });

    res.status(201).json({
      success: true,
      conversation,
    });
  } catch (error) {}
});

exports.getUserConversations = asyncHandler(async (req, res, next) => {
  const { email } = req.body;
  try {
    if (!email) {
      res.status(400).json({
        error: 'email is required',
      });
      throw new Error('email is required');
    }

    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({
        error: 'unknown user',
      });
      throw new Error('unknown user');
    }
    const userId = user.get('_id');
    const conversations = await Conversation.find({
      $or: [{ fromUser: mongoose.Types.ObjectId(userId) }, { toUser: mongoose.Types.ObjectId(userId) }],
    })
      .populate('fromUser', 'username')
      .populate('toUser', 'username')
      .sort({ updated: 'desc' });

    res.status(201).json({
      success: true,
      conversations,
    });
  } catch (error) {}
});

exports.addMessage = asyncHandler(async (req, res, next) => {
  const { conversationId, email, message } = req.body;
  try {
    if (!conversationId) {
      res.status(400).json({
        error: 'conversationId is required',
      });
      throw new Error('conversationId is required');
    }
    const conversation = await Conversation.findById(conversationId);
    if (!conversation) {
      res.status(400).json({
        error: 'invalid conversation id',
      });
      throw new Error('invalid conversation id');
    }

    if (!email) {
      res.status(400).json({
        error: 'email is required',
      });
      throw new Error('email is required');
    }

    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({
        error: 'unknown user',
      });
      throw new Error('unknown user');
    }

    const newMessage = await Message.create({
      conversation: conversation.get('_id'),
      user: user.get('_id'),
      message,
    });

    res.status(201).json({
      success: true,
      message: newMessage,
    });
  } catch (error) {}
});

exports.getMessagesForConversation = asyncHandler(async (req, res, next) => {
  const { conversationId } = req.body;
  try {
    if (!conversationId) {
      res.status(400).json({
        error: 'conversationId is required',
      });
      throw new Error('conversationId is required');
    }
    const conversation = await Conversation.findById(conversationId);
    if (!conversation) {
      res.status(400).json({
        error: 'invalid conversation id',
      });
      throw new Error('invalid conversation id');
    }

    const messages = await Message.find({ conversation: conversation.get('_id') })
      .populate('user', 'username')
      .sort({ created: 'desc' });

    res.status(201).json({
      success: true,
      messages,
    });
  } catch (error) {}
});
