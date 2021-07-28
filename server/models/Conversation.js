const mongoose = require('mongoose');

const conversationSchema = new mongoose.Schema(
  {
    fromUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    toUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
  },
  { timestamps: true },
);

const Conversation = mongoose.model('conversation', conversationSchema);
module.exports = Conversation;
