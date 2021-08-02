const express = require('express');
const router = express.Router();
const protect = require('../middleware/auth');
const { searchUsers, updatePersonalInformation, updateProfilePhoto, getUserInfo } = require('../controllers/user');

router.route('/').get(protect, searchUsers);
router.route('/info').post(protect, updatePersonalInformation);
router.route('/profile-photo').post(protect, updateProfilePhoto);
router.route('/:username').get(protect, getUserInfo);

module.exports = router;
