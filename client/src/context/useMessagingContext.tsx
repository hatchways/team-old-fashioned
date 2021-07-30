import { useState, useContext, createContext, FC, useEffect } from 'react';
import { Conversation, Message } from '../interface/Messaging';
import { fetchConversations, fetchMessages } from '../helpers/APICalls/messaging';

interface IMessagingContext {
  conversations: Conversation[];
  messages: Message[];
  getUserConversations: () => void;
  getConversationMessages: (conversationId: string) => void;
}

export const MessagingContext = createContext<IMessagingContext>({
  conversations: [],
  messages: [],
  getUserConversations: () => null,
  getConversationMessages: () => null,
});

export const MessagingProvider: FC = ({ children }): JSX.Element => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);

  const getUserConversations = async () => {
    const response = await fetchConversations();
    if (response.success) {
      if (response.data) {
        setConversations(response.data as Conversation[]);
      }
    }
  };

  const getConversationMessages = async (conversationId: string) => {
    const response = await fetchMessages(conversationId);
    if (response.success) {
      if (response.data) {
        setMessages(response.data as Message[]);
      }
    }
  };

  // useEffect(() => {
  //   const getConversations = async () => {
  //     const response = await fetchConversations();
  //     if (response.success) {
  //       if (response.data) {
  //         setConversations(response.data as Conversation[]);
  //       }
  //     }
  //   };
  //   const getMessages = async () => {
  //     const response = await fetchMessages('6103446761a9c856bcb560de');
  //     if (response.success) {
  //       if (response.data) {
  //         setMessages(response.data as Message[]);
  //       }
  //     }
  //   };

  //   getConversations();
  //   getMessages();
  // }, []);

  return (
    <MessagingContext.Provider value={{ conversations, messages, getUserConversations, getConversationMessages }}>
      {children}
    </MessagingContext.Provider>
  );
};

export function useMessaging(): IMessagingContext {
  return useContext(MessagingContext);
}
