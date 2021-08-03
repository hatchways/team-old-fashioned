import { useState, useContext, createContext, FC, useEffect } from 'react';
import { Conversation, Message } from '../interface/Message';
import { Conversation as APIConversation } from '../interface/Messaging';
import { fetchConversations } from '../helpers/APICalls/messaging';
import { AuthContext } from '../context/useAuthContext';

interface IMessagingContext {
  conversations: Conversation[];
}

export const MessagingContext = createContext<IMessagingContext>({
  conversations: [],
});

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
              lastMessageText: con.last_msg.message,
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

  return <MessagingContext.Provider value={{ conversations }}>{children}</MessagingContext.Provider>;
};

export function useMessaging(): IMessagingContext {
  return useContext(MessagingContext);
}
