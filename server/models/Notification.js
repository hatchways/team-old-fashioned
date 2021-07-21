const mongoose = require('mongoose');
const { Schema } = mongoose;
require('mongoose-type-url');
const { User } = require('./User');
const { Contest } = require('./Contest');
const { Submission } = require('./Submission');
const notificationTypes = ['submission', 'message'];

// Requires contest field if notification is for a submission
function setContestRequirement() {
  return this.notificationType === 'submission';
}

const notificationSchema = new Schema({
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
    required: setContestRequirement,
  },

  submissionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Submission',
    required: setContestRequirement,
  },

  timeSent: {
    type: Date,
    default: Date.now,
  },

  readStatus: {
    type: Boolean,
    default: false,
  },

  // Message: Profile photo of sender
  // Submission: Featured photo of submission
  photo: {
    type: mongoose.SchemaTypes.Url,
    // Default set while featured photo / profile photos are not yet set up
    default:
      'https://images.unsplash.com/photo-1517705600644-3f392e2d6439?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1834&q=80',
    required: true,
  },
});

module.exports = mongoose.model('notifications', notificationSchema);
