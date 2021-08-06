import { Box } from '@material-ui/core';
import { Conversation } from '../../../interface/Message';
import Header from './Header/Header';
import InputField from './InputField/InputField';
import TextContent from './TextContent/TextContent';
import useStyles from './useStyles';

export interface MessageProps {
  message?: Conversation;
  newMessageHandler: (message: string) => void;
}
export default function MessageWindow({ message, newMessageHandler }: MessageProps): JSX.Element {
  const classes = useStyles();
  return (
    <Box>
      <Header header={message} />
      <Box className={classes.textContainer}>
        <TextContent text={message} />
      </Box>
      <InputField message={message} newMessageHandler={newMessageHandler} />
    </Box>
  );
}
