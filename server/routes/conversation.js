const express = require('express');
const router = express.Router();
const protect = require('../middleware/auth');
const { createConversation } = require('../controllers/conversation');

router.route('/new-conversation').post(createConversation);

module.exports = router;
