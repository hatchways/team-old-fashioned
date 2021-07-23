const mongoose = require('mongoose');
const asyncHandler = require('express-async-handler');
const Conversation = require('../models/Conversation');
const Message = require('../models/Message');
const User = require('../models/User');

exports.createConversation = asyncHandler(async (req, res, next) => {
  const { to } = req.body;

  try {
    const from = req.user.id;

    if (!to || !mongoose.isValidObjectId(to)) {
      throw new Error('invalid recipient');
    }

    const conversation = await Conversation.create({
      fromUser: mongoose.Types.ObjectId(from),
      toUser: mongoose.Types.ObjectId(to),
    });

    res.status(201).json({
      success: true,
      conversation,
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
});

exports.getUserConversations = asyncHandler(async (req, res, next) => {
  try {
    const userId = req.user.id;
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
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
});

exports.addMessage = asyncHandler(async (req, res, next) => {
  const { conversationId, message } = req.body;
  try {
    const userId = req.user.id;

    if (!conversationId || !mongoose.isValidObjectId(conversationId)) {
      throw new Error('invalid conversation');
    }
    const conversation = await Conversation.findById(conversationId);
    if (!conversation) {
      throw new Error('conversation not found');
    }

    const newMessage = await Message.create({
      conversation: conversation.get('_id'),
      sender: mongoose.Types.ObjectId(userId),
      message,
    });

    res.status(201).json({
      success: true,
      message: newMessage,
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
});

exports.getMessagesForConversation = asyncHandler(async (req, res, next) => {
  try {
    conversationId = req.params.id;
    if (!conversationId || !mongoose.isValidObjectId(conversationId)) {
      throw new Error('invalid conversation');
    }

    const messages = await Message.find({ conversation: mongoose.Types.ObjectId(conversationId) })
      .populate('sender', 'username')
      .sort({ created: 'desc' });

    res.status(201).json({
      success: true,
      messages,
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
});
