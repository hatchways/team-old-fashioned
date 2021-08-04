import { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MessagingContext } from '../../context/useMessagingContext';
import { Grid } from '@material-ui/core';
import ConversationList from './SideBar/ConversationList/ConversationList';
import MessageWindow from './MessageWindow/MessageWindow';
import useStyles from './useStyles';

export default function Message(): JSX.Element {
  const { id: conversationParamId } = useParams<{ id: string }>();
  const { conversations, addMessage } = useContext(MessagingContext);
  const [loadedConversation, setLoadedConversation] = useState(conversationParamId);
  const classes = useStyles();

  const conversationClickHandler = (conId: string) => {
    setLoadedConversation(conId);
  };

  const messageSubmitHandler = (message: string) => {
    addMessage(loadedConversation, message);
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
