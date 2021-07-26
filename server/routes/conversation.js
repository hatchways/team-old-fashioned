const express = require('express');
const router = express.Router();
const protect = require('../middleware/auth');
const {
  createConversation,
  getUserConversations,
  addMessage,
  getMessagesForConversation,
} = require('../controllers/conversation');

router.route('/all').get(protect, getUserConversations);
router.route('/new-conversation').post(protect, createConversation);
router.route('/add-message').post(protect, addMessage);
router.route('/:id/messages').get(protect, getMessagesForConversation);

module.exports = router;
