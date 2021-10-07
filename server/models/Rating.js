const mongoose = require('mongoose');
const { Schema } = mongoose;
const { User } = require('./User');
const { Contest } = require('./Contest');
const { Submission } = require('./Submission');

// Currently specific to Artist ratings
const ratingSchema = new Schema(
  {
    artistId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    submissionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Submission',
      required: true,
    },

    contestId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Contest',
      required: true,
    },

    numericalRating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },

    textRating: {
      type: String,
      required: false,
      maxLength: 300,
    },

    raterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true },
);

ratingSchema.index({ artistId: 1, createdAt: -1 });

module.exports = mongoose.model('ratings', ratingSchema);
