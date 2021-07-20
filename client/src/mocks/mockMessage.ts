import { Conversation, Message } from '../interface/Message';

export const mockMessage: Conversation[] = [
  {
    conversationId: '1',
    imageURL: require('../Images/54ea9532e305d5f18e8aafb9992ea3990cf7073e.png'),
    imageAlt: 'Marry Wills',
    title: 'Marry Wills',
    createdAt: '10:22AM',
    lastMessageText: "I'll send you details",
    messages: [
      {
        imageURL: null,
        imageAlt: null,
        messageText: "Hey Kevin! I like tattoo sketch you've created!",
        createdAt: 'Apr 16',
        isMyMessage: true,
      },
    ],
  },
];
