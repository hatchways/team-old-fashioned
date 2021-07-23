const { ObjectId } = require('mongoose');
const asyncHandler = require('express-async-handler');
const Conversation = require('../models/Conversation');
const Message = require('../models/Message');
const User = require('../models/User');

exports.createConversation = asyncHandler(async (req, res, next) => {
  const { to } = req.body;

  try {
    const from = req.user.id;
    if (!to) {
      throw new Error('recipient is required');
    }

    const conversation = await Conversation.create({
      fromUser: ObjectId(from),
      toUser: ObjectId(to),
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
      $or: [{ fromUser: ObjectId(userId) }, { toUser: ObjectId(userId) }],
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

    if (!conversationId) {
      throw new Error('conversationId is required');
    }
    const conversation = await Conversation.findById(conversationId);
    if (!conversation) {
      throw new Error('invalid conversation id');
    }

    const newMessage = await Message.create({
      conversation: conversation.get('_id'),
      user: ObjectId(userId),
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

    if (!conversationId) {
      throw new Error('conversationId is required');
    }
    const conversation = await Conversation.findById(conversationId);
    if (!conversation) {
      throw new Error('invalid conversation id');
    }

    const messages = await Message.find({ conversation: conversation.get('_id') })
      .populate('user', 'username')
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
