import { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { MessagingContext } from '../../context/useMessagingContext';
import { Grid } from '@material-ui/core';
import ConversationList from './SideBar/ConversationList/ConversationList';
import MessageWindow from './MessageWindow/MessageWindow';
import { addMessage as APIAddMessage } from '../../helpers/APICalls/messaging';
import { useSocket } from '../../context/useSocketContext';

import useStyles from './useStyles';

export default function Message(): JSX.Element {
  const { socket } = useSocket();
  const { id: conversationParamId } = useParams<{ id: string }>();
  const { conversations, addMessage } = useContext(MessagingContext);
  const [loadedConversation, setLoadedConversation] = useState(conversationParamId);
  const classes = useStyles();
  useEffect(() => {
    if (socket) {
      socket.on('GET_MESSAGE', ({ conversationId, message }) => {
        addMessage(conversationId, message, false);
      });
      return () => {
        socket.off('GET_MESSAGE');
      };
    }
  }, [socket, addMessage]);

  const conversationClickHandler = (conId: string) => {
    setLoadedConversation(conId);
  };

  const messageSubmitHandler = (message: string) => {
    addMessage(loadedConversation, message, true);
    APIAddMessage(loadedConversation, message);
    if (socket) {
      const receiver = conversations.find((con) => con.conversationId === loadedConversation)?.toUserEmail;
      socket.emit('SEND_MESSAGE', {
        receiver,
        conversationId: loadedConversation,
        message: message,
      });
    }
  };

  return (
    <Grid container className={classes.root}>
      <Grid>
        <ConversationList
          conversationList={conversations}
          loadedConversation={loadedConversation}
          conversationClick={conversationClickHandler}
        />
      </Grid>
      <Grid className={classes.messageContainer}>
        <MessageWindow
          message={conversations.find((con) => con.conversationId === loadedConversation)}
          newMessageHandler={messageSubmitHandler}
        />
      </Grid>
    </Grid>
  );
}
