const mongoose = require('mongoose');

const contestSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  prizeAmount: {
    type: Number,
  },

  deadline: {
    type: Date,
    required: true,
  },

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },

  created: {
    type: Date,
    default: Date.now,
  },

  winningSubmission: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'submission',
  },

  // Identifies whether contest owner was already notified that the deadline has passed
  notified: {
    type: Boolean,
    default: false,
  },
});

const Contest = mongoose.model('Contest', contestSchema);
module.exports = Contest;
