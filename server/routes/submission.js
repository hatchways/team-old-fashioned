const express = require('express');
const router = express.Router();

const protect = require('../middleware/auth');
const { getAllSubmissions } = require('../controllers/submission');

router.get('/:id', protect, getAllSubmissions);

module.exports = router;
