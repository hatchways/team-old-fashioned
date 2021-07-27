const express = require('express');
const router = express.Router();
const protect = require('../middleware/auth');
const { test, getPublicKey, setupPaymentIntent, listPaymentMethods } = require('../controllers/payment');

router.route('/test').post(protect, test);

router.route('/setup').post(protect, setupPaymentIntent);
router.route('/public-key').get(protect, getPublicKey);
router.route('/payment-methods').get(protect, listPaymentMethods);

module.exports = router;
