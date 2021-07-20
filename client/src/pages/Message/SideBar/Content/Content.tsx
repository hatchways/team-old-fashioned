import { Box, Typography } from '@material-ui/core';
import { parseISO } from 'date-fns';
import { format } from 'path';
import React from 'react';
import { Conversation } from '../../../../interface/Message';
import useStyles from './useStyles';

export interface ConversationListProps {
  conversationItem: Conversation;
}

export default function Content({ conversationItem }: ConversationListProps): JSX.Element {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
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
