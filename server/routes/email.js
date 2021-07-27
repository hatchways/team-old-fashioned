const express = require('express');
const router = express.Router();
const protect = require('../middleware/auth');
const { sendEmail } = require('../controllers/email');

router.route('/send-email').post(protect, sendEmail);

module.exports = router;
