const express = require('express');
const router = express.Router();
const { createNotification, markAsRead } = require('../controllers/notification');

router.route('/').post(createNotification);
router.route('/:id').post(markAsRead);
module.exports = router;
