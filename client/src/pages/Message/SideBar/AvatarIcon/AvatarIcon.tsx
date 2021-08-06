import { useEffect, useState } from 'react';
import { useSocket } from '../../../../context/useSocketContext';
import { Avatar, Badge, Box, createStyles, makeStyles, Theme, withStyles } from '@material-ui/core';
import { Conversation } from '../../../../interface/Message';

export interface ConversationListProps {
  conversationItem?: Conversation;
}

const StyledBadge = withStyles((theme: Theme) =>
  createStyles({
    badge: {
      backgroundColor: '#44b700',
      color: '#44b700',
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      '&::after': {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        animation: '$ripple 1.2s infinite ease-in-out',
        border: '1px solid currentColor',
        content: '""',
      },
    },
    '@keyframes ripple': {
      '0%': {
        transform: 'scale(.8)',
        opacity: 1,
      },
      '100%': {
        transform: 'scale(2.4)',
        opacity: 0,
      },
    },
  }),
)(Badge);

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    avatar: {
      height: 40,
      width: 40,
      marginRight: 11,
    },
  }),
);

export default function ConversationItem({ conversationItem }: ConversationListProps): JSX.Element {
  const { loggedInUsers } = useSocket();
  const classes = useStyles();
  const [isOnline, setIsOnline] = useState(false);

  useEffect(() => {
    const loggedIn = loggedInUsers ? loggedInUsers.some((user) => user.email === conversationItem?.toUserEmail) : false;
    setIsOnline(loggedIn);
  }, [loggedInUsers, conversationItem]);

  return (
    <Box className={classes.root}>
      {isOnline ? (
        <StyledBadge
          overlap="circular"
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          variant="dot"
        >
          <Avatar className={classes.avatar} alt={conversationItem?.fullName} src={conversationItem?.imageURL} />
        </StyledBadge>
      ) : (
        <Badge
          overlap="circular"
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
        >
          <Avatar className={classes.avatar} alt={conversationItem?.fullName} src={conversationItem?.imageURL} />
        </Badge>
      )}
    </Box>
  );
}
