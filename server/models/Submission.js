const mongoose = require('mongoose');
const { Schema } = mongoose;
const { ObjectId } = Schema;

const submissionSchema = new Schema({
  contestId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'contest',
    require: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    require: true,
  },
  isActive: {
    type: Boolean,
    require: true,
  },
  files: [{ type: String, required: true }],
  submitDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Submission = mongoose.model('submission', submissionSchema);
