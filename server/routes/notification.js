const express = require('express');
const router = express.Router();
const protect = require('../middleware/auth');
const { createNotification, markAsRead, getNotifications } = require('../controllers/notification');

router.route('/').post(protect, createNotification);
router.route('/').get(protect, getNotifications);
router.route('/:id').post(markAsRead);
module.exports = router;
