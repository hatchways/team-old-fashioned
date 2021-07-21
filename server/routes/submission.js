const express = require('express');
const router = express.Router();

const protect = require('../middleware/auth');
const { getAllSubmissionForOwner, getSubmissonForSubmitter } = require('../controllers/submission');

router.get('/:id', protect, getAllSubmissionForOwner);
router.get('/submitter', protect, getSubmissonForSubmitter);

module.exports = router;
