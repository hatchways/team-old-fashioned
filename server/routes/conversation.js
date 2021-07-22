const express = require('express');
const router = express.Router();
const protect = require('../middleware/auth');
const {
  createConversation,
  getUserConversations,
  addMessage,
  getMessagesForConversation,
} = require('../controllers/conversation');

router.route('/all').post(getUserConversations);
router.route('/new-conversation').post(createConversation);
router.route('/add-message').post(addMessage);
router.route('/messages').post(getMessagesForConversation);

module.exports = router;
