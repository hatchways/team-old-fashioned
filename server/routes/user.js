const express = require('express');
const router = express.Router();
const protect = require('../middleware/auth');
const { searchUsers, getUserPersonalInformation } = require('../controllers/user');

router.route('/').get(protect, searchUsers);
router.route('/info/:id').get(getUserPersonalInformation);

module.exports = router;
