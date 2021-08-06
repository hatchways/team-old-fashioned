//for mock data UI testing, will change back to correct type with real data
export interface Conversation {
  conversationId: string;
  imageURL: string | any;
  fullName: string;
  toUserEmail: string;
  title: string;
  createdAt: string;
  messages: Message[];
  lastMessageText: string;
  isOnline: boolean;
}

export interface Message {
  messageId: string;
  messageText: string;
  createdAt: string;
  isMyMessage: boolean;
}
