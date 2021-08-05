import { Box, Typography } from '@material-ui/core';
import { Conversation } from '../../../../interface/Message';
import useStyles from './useStyles';

export interface ConversationListProps {
  conversationItem: Conversation;
}

export default function Content({ conversationItem }: ConversationListProps): JSX.Element {
  const classes = useStyles();
  let createdAt = new Date(conversationItem.createdAt).toLocaleDateString();
  const secs = (new Date().getTime() - new Date(conversationItem.createdAt).getTime()) / 1000;

  if (secs < 86400) {
    createdAt = new Date(conversationItem.createdAt).toLocaleTimeString();
  } else if (secs < 172800) {
    createdAt = 'Yesterday';
  } else if (secs < 604800) {
    switch (new Date(conversationItem.createdAt).getDay()) {
      case 0:
        createdAt = 'Sunday';
        break;
      case 0:
        createdAt = 'Monday';
        break;
      case 0:
        createdAt = 'Tuesday';
        break;
      case 0:
        createdAt = 'Wednesday';
        break;
      case 0:
        createdAt = 'Thursday';
        break;
      case 0:
        createdAt = 'Friday';
        break;
      case 0:
        createdAt = 'Saturday';
        break;
    }
  }

  return (
    <Box display="flex" justifyContent="space-between" flexGrow={1} className={classes.root}>
      <Box>
        <Typography className={classes.fullName}>{conversationItem.fullName}</Typography>
        <Typography className={classes.textPreview}>{conversationItem.lastMessageText}</Typography>
      </Box>
      <Box>
        <Typography className={classes.textPreview}>{createdAt}</Typography>
      </Box>
    </Box>
  );
}
