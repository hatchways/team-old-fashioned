const express = require('express');
const router = express.Router();
const { sendEmail } = require('../controllers/email');

router.route('/send-email').post(sendEmail);

module.exports = router;
