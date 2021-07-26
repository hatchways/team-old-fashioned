import { Box, Paper, Typography } from '@material-ui/core';
import { Conversation } from '../../../../interface/Message';
import AvatarIcon from '../AvatarIcon/AvatarIcon';
import Content from '../Content/Content';
import useStyles from './useStyles';

export interface ConversationProps {
  conversationList: Conversation[];
}

export default function ConversationList({ conversationList }: ConversationProps): JSX.Element {
  const classes = useStyles();
  return (
    <Paper elevation={3} className={classes.root}>
      <Box className={classes.sideBarContainer}>
        <Typography className={classes.sideBarTitle}>Inbox Messages</Typography>
        {conversationList?.map((conversation) => (
          <Box key={conversation.conversationId} className={classes.sideBarValue}>
            <AvatarIcon conversationItem={conversation} />
            <Content conversationItem={conversation} />
          </Box>
        ))}
      </Box>
    </Paper>
  );
}