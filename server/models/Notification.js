const mongoose = require('mongoose');
const { Schema } = mongoose;
require('mongoose-type-url');
const { User } = require('./User');
const { Contest } = require('./Contest');
const { Submission } = require('./Submission');
const { Conversation } = require('./Conversation');

const notificationTypes = ['submission', 'message'];

function setRequirement() {
  return this.notificationType === 'submission';
}

// Schema based on submission data passed by front end
const notificationSchema = new Schema(
  {
    type: {
      type: String,
      enum: notificationTypes,
      required: true,
    },

    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    contestId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Contest',
      required: setRequirement,
    },

    submissionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Submission',
      required: setRequirement,
    },

    conversationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Conversation',
      required: !setRequirement,
    },

    readStatus: {
      type: Boolean,
      default: false,
    },

    // Message: Profile photo of sender
    // Submission: Last uploaded photo of submission
    photo: {
      type: mongoose.SchemaTypes.Url,
      // Default while featured photo / profile photos are not yet set up
      default:
        'https://images.unsplash.com/photo-1517705600644-3f392e2d6439?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1834&q=80',
      required: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model('notifications', notificationSchema);
