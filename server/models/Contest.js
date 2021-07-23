const mongoose = require('mongoose');
const { User } = require('./User');

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

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },

  created: {
    type: Date,
    default: Date.now,
  },
});

const Contest = mongoose.model('Contest', contestSchema);
module.exports = Contest;
