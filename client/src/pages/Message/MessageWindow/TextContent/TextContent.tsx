import { Box } from '@material-ui/core';
import { Conversation } from '../../../../interface/Message';
import OwnerBubble from '../OwnerBubble/OwnerBubble';
import UserBubble from '../UserBubble/UserBubble';
import useStyles from './useStyles';

export interface MessageProps {
  text?: Conversation;
}

export default function TextContent({ text }: MessageProps): JSX.Element {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      {text?.messages.map((message) => {
        return (
          <div key={message.messageId}>
            {message.isMyMessage ? (
              <OwnerBubble text={message.messageText} />
            ) : (
              <UserBubble userName={text.fullName} text={message.messageText} imageUrl={text.imageURL} />
            )}
          </div>
        );
      })}
    </Box>
  );
}
