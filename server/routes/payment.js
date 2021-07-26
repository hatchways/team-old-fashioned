const express = require('express');
const router = express.Router();
const protect = require('../middleware/auth');
const { createPaymentIntent } = require('../controllers/payment');

router.route('/').post(protect, createPaymentIntent);

module.exports = router;
