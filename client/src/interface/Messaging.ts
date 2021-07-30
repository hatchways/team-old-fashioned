interface userObj {
  _id: string;
  username: string;
}

export interface Conversation {
  _id: string;
  createdAt: string;
  updatedAt: string;
  last_msg: Message;
  from: userObj;
  to: userObj;
}

export interface Message {
  _id: string;
  conversation: string;
  sender: userObj;
  message: string;
  createdAt: string;
}

export interface MessagingAPIResponse {
  success?: string;
  error?: string;
  data?: Conversation[] | Message[];
}
