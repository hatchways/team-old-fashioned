import { Grid } from '@material-ui/core';
import ConversationList from './SideBar/ConversationList/ConversationList';
import { mockMessage } from '../../mocks/mockMessage';
import MessageWindow from './MessageWindow/MessageWindow';
import useStyles from './useStyles';

export default function Message(): JSX.Element {
  const classes = useStyles();
  return (
    <Grid container className={classes.root}>
      <Grid>
        <ConversationList conversationList={mockMessage} />
      </Grid>
      <Grid className={classes.messageContainer}>
        {/* using conversationId 1 as testing page */}
        <MessageWindow message={mockMessage.find((mock) => mock.conversationId === '1')} />
      </Grid>
    </Grid>
  );
}
