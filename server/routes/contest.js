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
  getContestsBySimpleSearch,
  getContestsByAdvanceSearch,
} = require('../controllers/contest');

router.post('/', protect, createContest);
router.route('/user-contests').get(protect, getUserContests);
router.post('/:id', protect, updateContest);
router.get('/:id', protect, getContest);
router.get('/all/contests', getContests);
router.post('/:id/submission', protect, createSubmissionByContestId);
router.post('/all/contests/simpleSearch', getContestsBySimpleSearch);
router.post('/all/contests/advanceSearch', getContestsByAdvanceSearch);

module.exports = router;
