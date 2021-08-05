import { Box, Avatar, Typography } from '@material-ui/core';
import useStyles from './useStyles';

export interface UserTextProps {
  userName: string;
  text: string;
  imageUrl: string;
}
export default function UserBubble({ userName, text, imageUrl }: UserTextProps): JSX.Element {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <Avatar className={classes.avatar} alt={userName} src={imageUrl}></Avatar>
      <Box className={classes.bubbleContainer}>
        <Typography className={classes.text}>{text}</Typography>
      </Box>
    </Box>
  );
}
