const express = require('express');
const router = express.Router();
const protect = require('../middleware/auth');
const {
  createContest,
  updateContest,
  getContest,
  getContests,
  createSubmissionByContestId,
  getUserContests,
} = require('../controllers/contest');

router.post('/', protect, createContest);
router.post('/:id', protect, updateContest);
router.get('/:id', protect, getContest);
router.get('/all', protect, getContests);
router.post('/:id/submission', protect, createSubmissionByContestId);
router.route('/user-contests').get(protect, getUserContests);

module.exports = router;
