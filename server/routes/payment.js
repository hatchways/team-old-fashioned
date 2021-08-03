const express = require('express');
const router = express.Router();
const protect = require('../middleware/auth');
const { getSecret, listPaymentMethods, chargeCard } = require('../controllers/payment');

router.route('/').get(protect, listPaymentMethods);
router.route('/secret').get(protect, getSecret);
router.route('/pay').post(protect, chargeCard);

module.exports = router;
