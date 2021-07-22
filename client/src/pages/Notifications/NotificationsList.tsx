import * as React from 'react';
// import useStyles from './useStyles';
import { Notifications } from '../../interface/Notifications';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';

export function NotificationsList({ notifications }: Notifications): JSX.Element {
  // const classes = useStyles();
  return (
    <Grid container alignItems="center" justify="center">
      {notifications.map(
        (notification: {
          _id: string;
          type: string;
          senderId: string;
          receiverId: string;
          contestId?: string;
          submissionId?: string;
          timeSent: Date | string;
          readStatus: boolean;
          photo: string;
        }) => (
          <>
            <Grid key={notification.photo} item xs={3} sm={10} md={8}>
              <Avatar alt="Notification Thumbnail" src={notification.photo} />
            </Grid>
            <Grid key={(notification.senderId, notification.type, notification.contestId)} item xs={7} sm={10} md={8}>
              {notification.type === 'submission'
                ? `${notification.senderId} submitted a design to your context ${notification.contestId}`
                : notification.type === 'message'
                ? `${notification.senderId} sent you a message`
                : 'Invalid message'}
            </Grid>
            <Grid
              key={(notification.senderId, notification.type, notification.contestId)}
              item
              xs={8}
              sm={10}
              md={8}
            ></Grid>
          </>
        ),
      )}
    </Grid>
  );
}
