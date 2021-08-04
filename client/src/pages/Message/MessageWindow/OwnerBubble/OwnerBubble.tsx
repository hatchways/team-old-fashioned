import { Box, Typography } from '@material-ui/core';
import useStyles from './useStyles';

export interface OwnerTextProps {
  text: string;
}

export default function OwnerBubble({ text }: OwnerTextProps): JSX.Element {
  const classes = useStyles();
  return (
    <Box display="flex" flexDirection="column" alignItems="flex-end" className={classes.root}>
      <Box className={classes.bubbleContainer}>
        <Typography className={classes.text}>{text}</Typography>
      </Box>
    </Box>
  );
}
