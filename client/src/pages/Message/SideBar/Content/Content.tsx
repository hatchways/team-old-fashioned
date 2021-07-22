import { Box, Typography } from '@material-ui/core';
import { Conversation } from '../../../../interface/Message';
import useStyles from './useStyles';

export interface ConversationListProps {
  conversationItem: Conversation;
}

export default function Content({ conversationItem }: ConversationListProps): JSX.Element {
  const classes = useStyles();
  return (
    <Box display="flex" justifyContent="space-between" flexGrow={1} className={classes.root}>
      <Box>
        <Typography className={classes.fullName}>{conversationItem.fullName}</Typography>
        <Typography className={classes.textPreview}>{conversationItem.lastMessageText}</Typography>
      </Box>
      <Box>
        <Typography className={classes.textPreview}>{conversationItem.createdAt}</Typography>
      </Box>
    </Box>
  );
}
