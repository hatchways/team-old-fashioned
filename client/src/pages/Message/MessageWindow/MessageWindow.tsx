import { Box } from '@material-ui/core';
import { Conversation } from '../../../interface/Message';
import Header from './Header/Header';
import InputField from './InputField/InputField';
import TextContent from './TextContent/TextContent';
import useStyles from './useStyles';

export interface MessageProps {
  message?: Conversation;
}
export default function MessageWindow({ message }: MessageProps): JSX.Element {
  const classes = useStyles();
  return (
    <Box>
      <Header header={message} />
      <Box className={classes.textContainer}>
        <TextContent text={message} />
      </Box>
      <InputField text={message} />
    </Box>
  );
}
