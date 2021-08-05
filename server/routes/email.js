const express = require('express');
const router = express.Router();
const protect = require('../middleware/auth');
const { sendEmail, sendResetLink } = require('../controllers/email');

router.route('/send-email').post(protect, sendEmail);
router.post('/send-email/reset-password', sendResetLink);

module.exports = router;
