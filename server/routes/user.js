const express = require('express');
const router = express.Router();
const protect = require('../middleware/auth');
const {
  searchUsers,
  updatePersonalInformation,
  updateProfilePhoto,
  getUserInfo,
  getContestsByUsername,
} = require('../controllers/user');

router.route('/').get(protect, searchUsers);
router.route('/info').post(protect, updatePersonalInformation);
router.route('/profile-photo').post(protect, updateProfilePhoto);
router.route('/:username').get(protect, getUserInfo);
router.route('/:username/contests').get(protect, getContestsByUsername);

module.exports = router;
