import { useState, useContext, createContext, FC, useEffect, useCallback } from 'react';
import { Conversation, Message } from '../interface/Message';
import { Conversation as APIConversation } from '../interface/Messaging';
import { fetchConversations, createConversation } from '../helpers/APICalls/messaging';
import { AuthContext } from '../context/useAuthContext';

interface IMessagingContext {
  conversations: Conversation[];
  addMessage: (conversationId: string, message: string, myMessage: boolean) => void;
  newConversation: (to: string) => void;
}

export const MessagingContext = createContext<IMessagingContext>({
  conversations: [],
  addMessage: () => null,
  newConversation: () => null,
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
            let imageUrl = con.to.profilePicUrl;
            let fullName = con.to.username;
            let toUserEmail = con.to.email;
            const messages = con.messages.map<Message>((msg) => {
              return {
                messageId: msg._id,
                messageText: msg.message,
                createdAt: msg.createdAt,
                isMyMessage: msg.sender.email === loggedInUser?.email,
              };
            });
            // user can be to or from in any conversation
            // need to switch which info gets shown
            if (loggedInUser) {
              if (loggedInUser.email === con.to.email) {
                imageUrl = con.from.profilePicUrl;
                fullName = con.from.username;
                toUserEmail = con.from.email;
              }
            }
            return {
              conversationId: con._id,
              imageURL: imageUrl,
              fullName: fullName,
              toUserEmail: toUserEmail,
              title: '',
              createdAt: con.createdAt,
              lastMessageText: con.last_msg ? con.last_msg.message : '',
              messages: messages,
              isOnline: false,
            };
          });
          setConversations(transformedCons);
        }
      }
    };
    getConversations();
  }, [loggedInUser]);

  const addMessage = useCallback(
    (conversationId: string, message: string, myMessage: boolean) => {
      const conIndex = conversations.findIndex((c) => c.conversationId === conversationId);
      if (conIndex >= 0) {
        const newMessage = {
          messageId: Date.now().toString(),
          messageText: message,
          createdAt: new Date().toString(),
          isMyMessage: myMessage,
        };
        const updatedConversations = conversations.slice();
        //TODO: Update top level message
        updatedConversations[conIndex].lastMessageText = newMessage.messageText;
        updatedConversations[conIndex].createdAt = newMessage.createdAt;
        updatedConversations[conIndex].messages.push(newMessage);
        setConversations(updatedConversations);
      }
    },
    [conversations],
  );

  const newConversation = async (to: string): Promise<string | undefined> => {
    // if conversation exists return
    const conversation = conversations.find((con) => con.toUserEmail === to);
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
        toUserEmail: rawConversation.to.email,
        title: '',
        createdAt: rawConversation.createdAt,
        lastMessageText: '',
        messages: [],
        isOnline: false,
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
