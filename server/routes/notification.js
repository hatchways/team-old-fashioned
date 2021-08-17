const express = require('express');
const router = express.Router();
const protect = require('../middleware/auth');
const { getNotifications } = require('../controllers/notification');

router.route('/').get(protect, getNotifications);
module.exports = router;
