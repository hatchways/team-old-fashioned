const express = require('express');
const router = express.Router();
const protect = require('../middleware/auth');
const { validateContest, validateUpdateContest, validateGetContest } = require('../validate');
const {
  createContest,
  updateContest,
  getContest,
  getContests,
  createSubmissionByContestId,
  getUserContests,
} = require('../controllers/contest');

router.route('/').post(validateContest, createContest);
router.route('/all').get(getContests);
router.post('/:id/submission', protect, createSubmissionByContestId);
router.post('/contests', getUserContests);

module.exports = router;
