import { Conversation, Message } from '../interface/Message';

export const mockMessage: Conversation[] = [
  {
    conversationId: '1',
    imageURL: require('../Images/54ea9532e305d5f18e8aafb9992ea3990cf7073e.png'),
    fullName: 'Marry Wills',
    title: 'Marry Wills',
    createdAt: '10:22AM',
    lastMessageText: "I'll send you details",
    isOnline: true,
    messages: [
      {
        messageId: '1',
        messageText: "Hey Kevin! I like tattoo sketch you've created! Can I ask you to draw one more sketch?",
        createdAt: 'Apr 18',
        isMyMessage: true,
      },

      {
        messageId: '2',
        messageText: 'Hey Kenneth! Sure!',
        createdAt: 'Apr 16',
        isMyMessage: false,
      },
      {
        messageId: '3',
        messageText: "I'll send you details",
        createdAt: 'July 19',
        isMyMessage: true,
      },
    ],
  },
  {
    conversationId: '2',
    imageURL: require('../Images/83132f827cc5c0996e497b242bb0a6af317cf97d.png'),
    fullName: 'Scott Mackey',
    title: 'Scott Mackey',
    createdAt: 'Yesterday',
    lastMessageText: 'One more thing I would like ...',
    messages: [],
    isOnline: false,
  },
  {
    conversationId: '3',
    imageURL: require('../Images/19b5e340689b123a75e75b861d284c151c6b0942.png'),
    fullName: 'Dorothy Irwin',
    title: 'Dorothy Irwin',
    createdAt: 'Yesterday',
    lastMessageText: "What I'm thinking is wo just ...",
    messages: [],
    isOnline: true,
  },
  {
    conversationId: '4',
    imageURL: require('../Images/b1f0e680702e811aa8ba333cb19c0e0ea95e8e31.png'),
    fullName: 'Daniel Wilson',
    title: 'Daniel Wilson',
    createdAt: 'Saturday',
    lastMessageText: 'Hi Kenneth!',
    messages: [],
    isOnline: false,
  },
  {
    conversationId: '5',
    imageURL: require('../Images/c8823b21f856e7d71f7d2e10fbfd9795e7a9e4fb.png'),
    fullName: 'Christina Johnson',
    title: 'Christina Johnson',
    createdAt: '29/06/2019',
    lastMessageText: 'Good morning',
    messages: [],
    isOnline: false,
  },
];
