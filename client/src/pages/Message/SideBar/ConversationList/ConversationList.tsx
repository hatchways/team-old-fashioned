import { Box, Paper, Typography } from '@material-ui/core';
import { Conversation } from '../../../../interface/Message';
import AvatarIcon from '../AvatarIcon/AvatarIcon';
import Content from '../Content/Content';
import useStyles from './useStyles';

export interface ConversationProps {
  conversationList: Conversation[];
  conversationClick: (conId: string) => void;
  loadedConversation: string;
}

export default function ConversationList({
  conversationList,
  conversationClick,
  loadedConversation,
}: ConversationProps): JSX.Element {
  const classes = useStyles();
  return (
    <Paper elevation={3} className={classes.root}>
      <Box className={classes.sideBarContainer}>
        <Typography className={classes.sideBarTitle}>Inbox Messages</Typography>
        {conversationList?.map((conversation) => {
          const conversationClasses = [classes.sideBarValue];
          if (loadedConversation === conversation.conversationId) {
            conversationClasses.push(classes.selectedConversation);
          }
          return (
            <Box
              key={conversation.conversationId}
              className={conversationClasses.join(' ')}
              onClick={conversationClick.bind(null, conversation.conversationId)}
            >
              <AvatarIcon conversationItem={conversation} />
              <Content conversationItem={conversation} />
            </Box>
          );
        })}
      </Box>
    </Paper>
  );
}
