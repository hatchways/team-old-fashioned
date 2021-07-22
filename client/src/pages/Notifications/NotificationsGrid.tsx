import * as React from 'react';
import useStyles from './useStyles';
import { NotificationsList } from '../../interface/Notifications';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Badge from '@material-ui/core/Badge';
import Box from '@material-ui/core/Box';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';

export function NotificationsGrid({ notifications }: NotificationsList): JSX.Element {
  const classes = useStyles();
  const [invisible, setInvisible] = React.useState(false);

  const handleBadgeVisibility = () => {
    setInvisible(!invisible);
  };
  return (
    <Grid container alignItems="center" justify="center">
      {notifications.map(
        (notification: {
          _id: string;
          type: string;
          senderId: {
            _id: string;
            username: string;
          };
          receiverId: string;
          contestId: {
            _id: string;
            title: string;
          };
          submissionId?: string;
          timeSent: Date | string;
          readStatus: boolean;
          photo: string;
        }) => (
          <>
            <Grid key={notification.photo} item xs={3}>
              <Avatar alt="Notification Thumbnail" src={notification.photo} />
            </Grid>

            {notification.type === 'submission' ? (
              <Grid key={(notification.senderId.username, notification.type, notification.contestId.title)} item xs={8}>
                {notification.senderId.username} submitted a design to your contest {notification.contestId.title}.
              </Grid>
            ) : (
              <Grid key={(notification.senderId.username, notification.type)} item xs={8}>
                {notification.senderId.username} sent you a message.
              </Grid>
            )}
            <Grid item xs={1}>
              <FiberManualRecordIcon className={classes.customBadge} />{' '}
            </Grid>
          </>
        ),
      )}
    </Grid>
  );
}
