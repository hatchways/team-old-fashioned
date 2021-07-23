const express = require('express');
const router = express.Router();
const protect = require('../middleware/auth');
const {
  createConversation,
  getUserConversations,
  addMessage,
  getMessagesForConversation,
} = require('../controllers/conversation');

router.route(protect, '/all').get(getUserConversations);
router.route(protect, '/new-conversation').post(createConversation);
router.route(protect, '/add-message').post(addMessage);
router.route(protect, ':id/messages').get(getMessagesForConversation);

module.exports = router;
