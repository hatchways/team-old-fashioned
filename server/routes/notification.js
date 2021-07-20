const express = require('express');
const router = express.Router();
const { createNotification } = require('../controllers/notification');

router.route('/').post(createNotification);

module.exports = router;
