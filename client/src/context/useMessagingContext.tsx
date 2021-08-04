import { useState, useContext, createContext, FC, useEffect } from 'react';
import { Conversation, Message } from '../interface/Message';
import { Conversation as APIConversation } from '../interface/Messaging';
import { fetchConversations, createConversation } from '../helpers/APICalls/messaging';
import { AuthContext } from '../context/useAuthContext';

interface IMessagingContext {
  conversations: Conversation[];
  addMessage: (conversationId: string, message: string) => void;
  newConversation: (to: string) => void;
}

export const MessagingContext = createContext<IMessagingContext>({
  conversations: [],
  addMessage: () => null,
  newConversation: () => null,
});

// const newConversation = (conversations: APIConversation[], loggedInUserEmail: string): Conversation[] =>
//   conversations.map<Conversation>((con) => {
//     const messages = con.messages.map<Message>((msg) => {
//       return {
//         messageId: msg._id,
//         messageText: msg.message,
//         createdAt: msg.createdAt,
//         isMyMessage: msg.sender.email === loggedInUserEmail,
//       };
//     });
//     return {
//       conversationId: con._id,
//       imageURL: con.to.profilePicUrl,
//       fullName: con.to.username,
//       title: '',
//       createdAt: con.createdAt,
//       lastMessageText: con.last_msg ? con.last_msg.message : '',
//       messages: messages,
//       isOnline: true,
//     };
//   });

export const MessagingProvider: FC = ({ children }): JSX.Element => {
  const { loggedInUser } = useContext(AuthContext);
  const [conversations, setConversations] = useState<Conversation[]>([]);

  useEffect(() => {
    const getConversations = async () => {
      const response = await fetchConversations();
      if (response.success) {
        if (response.data) {
          const rawConversations = response.data as APIConversation[];
          const transformedCons = rawConversations.map<Conversation>((con) => {
            const messages = con.messages.map<Message>((msg) => {
              return {
                messageId: msg._id,
                messageText: msg.message,
                createdAt: msg.createdAt,
                isMyMessage: msg.sender.email === loggedInUser?.email,
              };
            });
            return {
              conversationId: con._id,
              imageURL: con.to.profilePicUrl,
              fullName: con.to.username,
              title: '',
              createdAt: con.createdAt,
              lastMessageText: con.last_msg ? con.last_msg.message : '',
              messages: messages,
              isOnline: true,
            };
          });
          setConversations(transformedCons);
        }
      }
    };
    getConversations();
  }, [loggedInUser]);

  const addMessage = (conversationId: string, message: string) => {
    const conIndex = conversations.findIndex((c) => c.conversationId === conversationId);
    if (conIndex >= 0) {
      const newMessage = {
        messageId: Date.now().toString(),
        messageText: message,
        createdAt: new Date().toString(),
        isMyMessage: true,
      };
      const updatedConversations = conversations.slice();
      updatedConversations[conIndex].messages.push(newMessage);
      setConversations(updatedConversations);
    }
  };

  const newConversation = async (to: string): Promise<string | undefined> => {
    // if conversation exists return
    const conversation = conversations.find((con) => con.fullName === to);
    if (conversation) {
      return conversation.conversationId;
    }
    const response = await createConversation(to);
    if (response.success && response.data) {
      const rawConversation = response.data as APIConversation;
      const updatedConversations = conversations.slice();
      updatedConversations.push({
        conversationId: rawConversation._id,
        imageURL: rawConversation.to.profilePicUrl,
        fullName: rawConversation.to.username,
        title: '',
        createdAt: rawConversation.createdAt,
        lastMessageText: '',
        messages: [],
        isOnline: true,
      });
      setConversations(updatedConversations);
      return rawConversation._id;
    }
    return undefined;
  };

  return (
    <MessagingContext.Provider value={{ conversations, addMessage, newConversation }}>
      {children}
    </MessagingContext.Provider>
  );
};

export function useMessaging(): IMessagingContext {
  return useContext(MessagingContext);
}
