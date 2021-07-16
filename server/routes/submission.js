const express = require("express");
const router = express.Router();

const protect = require('../middleware/auth');
const { getAllSubmissionByContestId, createSubmission } = require("../controllers/submission")

router.post("/", protect, createSubmission);

module.exports = router;