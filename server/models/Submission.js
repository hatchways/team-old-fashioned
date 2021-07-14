const mongoose = require("mongoose");
const { Schema } = mongoose;

const submissionSchema = new Schema({
    contest_id: {
        type: ObjectId,
        ref: "contest",
        require: true
    },
    user_id: {
        type: ObjectId,
        ref: "user",
        require: true
    },
    is_active: {
        type: Boolean,
        require: true
    },
    files: [{ type: String, required: true }],
    submit_date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Submission = mongoose.model('submission', submissionSchema);