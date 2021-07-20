const express = require('express');
const router = express.Router();
const protect = require('../middleware/auth');
const { searchUsers, updatePersonalInformation } = require('../controllers/user');

router.route('/').get(protect, searchUsers);
router.route('/info').post(updatePersonalInformation);

module.exports = router;
