//for mock data UI testing, will change back to correct type with real data
export interface Conversation {
  conversationId: string;
  imageURL: string | any;
  fullName: string;
  title: string;
  createdAt: string;
  messages: Message[];
  lastMessageText: string;
  isOnline: boolean;
}

export interface Message {
  imageURL: string | null;
  fullName: string | null;
  messageText: string;
  createdAt: string;
  isMyMessage: boolean;
}
