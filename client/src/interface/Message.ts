//for mock data UI testing, will change back to correct type with real data
export interface Conversation {
  conversationId: string;
  imageURL: string | any;
  imageAlt: string;
  title: string;
  createdAt: string;
  messages: Message[];
  lastMessageText: string;
}

export interface Message {
  imageURL: string | null;
  imageAlt: string | null;
  messageText: string;
  createdAt: string;
  isMyMessage: boolean;
}
