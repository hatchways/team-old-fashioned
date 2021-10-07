const express = require('express');
const router = express.Router();
const protect = require('../middleware/auth');
// const { rateArtist, getRatings, updateRating, deleteRating } = require('../controllers/payment');
const { rateArtist, getRatings } = require('../controllers/rating');

router.route('/').post(protect, rateArtist);
router.route('/:username').get(protect, getRatings);
// router.route('/:id').put(protect, updateRating);
// router.route('/:id').delete(protect, deleteRating);

module.exports = router;
