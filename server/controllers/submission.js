const ObjectId = require("mongoose").Types.ObjectId;
const asyncHandler = require("express-async-handler");
const Contest = require("../models/Contest");
const Submission = require("../models/Submission");


exports.createSubmission = asyncHandler(async (req, res, next) => {
    console.log("right here");
    console.log(req.body);
    res.send("hellp");
})

exports.getAllSubmissionByContestId = asyncHandler(async (req, res, next) => {
    const userId = req.user.id;
    console.log(userId);
    if (!ObjectId(userId)) {
        return res.status(400).send(Error("Contest id is invalid"));
    }
    try {
        const user = await Submission.findById(userId);
        if (user) {
            const submissionData = await Submission.find({ userId: userId });
            res.status(200).json({ submission: submissionData })
        }
    }catch(error){
        console.log(error);
    }
})