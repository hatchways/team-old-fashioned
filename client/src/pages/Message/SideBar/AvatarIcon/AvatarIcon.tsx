import { Avatar, Badge, Box, createStyles, makeStyles, Theme, withStyles } from '@material-ui/core';
import React from 'react';
import { Conversation } from '../../../../interface/Message';

export interface ConversationListProps {
  conversationItem: Conversation;
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
  }),
);

export default function ConversationItem({ conversationItem }: ConversationListProps): JSX.Element {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      {conversationItem.isOnline ? (
        <StyledBadge
          overlap="circle"
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          variant="dot"
        >
          <Avatar alt={conversationItem.fullName} src={conversationItem.imageURL.default} />
        </StyledBadge>
      ) : (
        <Badge
          overlap="circle"
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
        >
          <Avatar alt={conversationItem.fullName} src={conversationItem.imageURL.default} />
        </Badge>
      )}
    </Box>
  );
}
