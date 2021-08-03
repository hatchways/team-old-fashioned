import { useContext, useState } from 'react';
import { MessagingContext } from '../../context/useMessagingContext';
import { Grid } from '@material-ui/core';
import ConversationList from './SideBar/ConversationList/ConversationList';
import MessageWindow from './MessageWindow/MessageWindow';
import useStyles from './useStyles';

export default function Message(): JSX.Element {
  const { conversations } = useContext(MessagingContext);
  const [loadedConversation, setLoadedConversation] = useState('');
  const classes = useStyles();

  const conversationClickHandler = (conId: string) => {
    setLoadedConversation(conId);
  };

  return (
    <Grid container className={classes.root}>
      <Grid>
        <ConversationList conversationList={conversations} conversationClick={conversationClickHandler} />
      </Grid>
      <Grid className={classes.messageContainer}>
        <MessageWindow message={conversations.find((con) => con.conversationId === loadedConversation)} />
      </Grid>
    </Grid>
  );
}
