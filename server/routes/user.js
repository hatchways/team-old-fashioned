const express = require('express');
const router = express.Router();
const protect = require('../middleware/auth');
const { searchUsers, getUserPersonalInformation } = require('../controllers/user');

router.route('/').get(protect, searchUsers);
router.route('/personal-information/:id').get(getUserPersonalInformation);

module.exports = router;
