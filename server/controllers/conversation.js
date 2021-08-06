const mongoose = require('mongoose');
const asyncHandler = require('express-async-handler');
const Conversation = require('../models/Conversation');
const Message = require('../models/Message');
const User = require('../models/User');

exports.createConversation = asyncHandler(async (req, res, next) => {
  const { to } = req.body;

  try {
    const from = req.user.id;
    const toUser = await User.findOne({ email: to });
    conversation = await Conversation.create({
      fromUser: mongoose.Types.ObjectId(from),
      toUser: toUser.get('_id'),
    });

    const conversations = await Conversation.aggregate([
      {
        $match: {
          _id: conversation.get('_id'),
        },
      },
      {
        $lookup: {
          from: 'messages',
          let: {
            cId: '$_id',
          },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ['$conversation', '$$cId'],
                },
              },
            },
            {
              $lookup: {
                from: 'users',
                let: { uId: '$sender' },
                pipeline: [
                  {
                    $match: {
                      $expr: {
                        $eq: ['$_id', '$$uId'],
                      },
                    },
                  },
                  { $project: { email: 1, username: 1, profilePicUrl: 1 } },
                ],
                as: 'sender',
              },
            },
            {
              $sort: {
                createdAt: -1,
              },
            },
            {
              $limit: 1,
            },
            { $unwind: '$sender' },
            { $project: { _id: 1, conversation: 1, sender: 1, message: 1, createdAt: 1 } },
          ],
          as: 'last_msg',
        },
      },
      {
        $unwind: {
          path: '$last_msg',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: 'users',
          let: { uId: '$fromUser' },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ['$_id', '$$uId'],
                },
              },
            },
            { $project: { email: 1, username: 1, profilePicUrl: 1 } },
          ],
          as: 'from',
        },
      },
      {
        $unwind: {
          path: '$from',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: 'users',
          let: { uId: '$toUser' },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ['$_id', '$$uId'],
                },
              },
            },
            { $project: { email: 1, username: 1, profilePicUrl: 1 } },
          ],
          as: 'to',
        },
      },
      {
        $unwind: {
          path: '$to',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: 'messages',
          let: {
            cId: '$_id',
          },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ['$conversation', '$$cId'],
                },
              },
            },
            {
              $lookup: {
                from: 'users',
                let: { uId: '$sender' },
                pipeline: [
                  {
                    $match: {
                      $expr: {
                        $eq: ['$_id', '$$uId'],
                      },
                    },
                  },
                  { $project: { email: 1, username: 1, profilePicUrl: 1 } },
                ],
                as: 'sender',
              },
            },
            {
              $sort: {
                createdAt: 1,
              },
            },
            { $unwind: '$sender' },
            { $project: { _id: 1, conversation: 1, sender: 1, message: 1, createdAt: 1 } },
          ],
          as: 'messages',
        },
      },
      { $sort: { createdAt: -1 } },
      {
        $project: {
          _id: 1,
          from: 1,
          to: 1,
          last_msg: 1,
          createdAt: 1,
          updatedAt: 1,
          messages: 1,
        },
      },
    ]);
    res.status(201).json({
      success: true,
      data: conversations[0],
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

exports.getUserConversations = asyncHandler(async (req, res, next) => {
  try {
    const userId = req.user.id;
    const conversations = await Conversation.aggregate([
      {
        $match: {
          $or: [
            {
              fromUser: mongoose.Types.ObjectId(userId),
            },
            {
              toUser: mongoose.Types.ObjectId(userId),
            },
          ],
        },
      },
      {
        $lookup: {
          from: 'messages',
          let: {
            cId: '$_id',
          },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ['$conversation', '$$cId'],
                },
              },
            },
            {
              $lookup: {
                from: 'users',
                let: { uId: '$sender' },
                pipeline: [
                  {
                    $match: {
                      $expr: {
                        $eq: ['$_id', '$$uId'],
                      },
                    },
                  },
                  { $project: { email: 1, username: 1, profilePicUrl: 1 } },
                ],
                as: 'sender',
              },
            },
            {
              $sort: {
                createdAt: -1,
              },
            },
            {
              $limit: 1,
            },
            { $unwind: '$sender' },
            { $project: { _id: 1, conversation: 1, sender: 1, message: 1, createdAt: 1 } },
          ],
          as: 'last_msg',
        },
      },
      {
        $unwind: {
          path: '$last_msg',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: 'users',
          let: { uId: '$fromUser' },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ['$_id', '$$uId'],
                },
              },
            },
            { $project: { email: 1, username: 1, profilePicUrl: 1 } },
          ],
          as: 'from',
        },
      },
      {
        $unwind: {
          path: '$from',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: 'users',
          let: { uId: '$toUser' },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ['$_id', '$$uId'],
                },
              },
            },
            { $project: { email: 1, username: 1, profilePicUrl: 1 } },
          ],
          as: 'to',
        },
      },
      {
        $unwind: {
          path: '$to',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: 'messages',
          let: {
            cId: '$_id',
          },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ['$conversation', '$$cId'],
                },
              },
            },
            {
              $lookup: {
                from: 'users',
                let: { uId: '$sender' },
                pipeline: [
                  {
                    $match: {
                      $expr: {
                        $eq: ['$_id', '$$uId'],
                      },
                    },
                  },
                  { $project: { email: 1, username: 1, profilePicUrl: 1 } },
                ],
                as: 'sender',
              },
            },
            {
              $sort: {
                createdAt: 1,
              },
            },
            { $unwind: '$sender' },
            { $project: { _id: 1, conversation: 1, sender: 1, message: 1, createdAt: 1 } },
          ],
          as: 'messages',
        },
      },
      { $sort: { createdAt: -1 } },
      {
        $project: {
          _id: 1,
          from: 1,
          to: 1,
          last_msg: 1,
          createdAt: 1,
          updatedAt: 1,
          messages: 1,
        },
      },
    ]);

    res.status(201).json({
      success: 'true',
      data: conversations,
    });
  } catch (error) {
    res.status(500).json({
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
    res.status(500).json({
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

    const messages = await Message.aggregate([
      { $match: { conversation: mongoose.Types.ObjectId(conversationId) } },
      {
        $sort: {
          createdAt: -1,
        },
      },
      {
        $lookup: {
          from: 'users',
          let: { uId: '$sender' },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ['$_id', '$$uId'],
                },
              },
            },
            { $project: { _id: 1, username: 1 } },
          ],
          as: 'sender',
        },
      },
      {
        $unwind: {
          path: '$sender',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $project: {
          _id: 1,
          conversation: 1,
          sender: 1,
          message: 1,
          createdAt: 1,
        },
      },
    ]);

    res.status(201).json({
      success: 'true',
      data: messages,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});
