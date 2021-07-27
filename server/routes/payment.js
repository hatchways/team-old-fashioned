const express = require('express');
const router = express.Router();
const protect = require('../middleware/auth');
const {
  test,
  getPublicKey,
  getSecret,
  setupUserForPayments,
  listPaymentMethods,
  getPaymentIntent,
  chargeCard,
} = require('../controllers/payment');

router.route('/').get(protect, listPaymentMethods);
router.route('/test').post(protect, test);
router.route('/public-key').get(protect, getPublicKey);
router.route('/secret').get(protect, getSecret);
router.route('/setup').post(protect, setupUserForPayments);
router.route('/pay').post(protect, chargeCard);

module.exports = router;
