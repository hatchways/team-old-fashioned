const express = require('express');
const router = express.Router();
const protect = require('../middleware/auth');
const { searchUsers, updatePersonalInformation, updateProfilePicture } = require('../controllers/user');

router.route('/').get(protect, searchUsers);
router.route('/info').post(protect, updatePersonalInformation);
router.route('/profile-pic').post(protect, updateProfilePicture);

module.exports = router;
