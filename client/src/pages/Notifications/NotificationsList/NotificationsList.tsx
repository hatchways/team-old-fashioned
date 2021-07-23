import * as React from 'react';
import useStyles from './useStyles';
import { NotificationsArray } from '../../../interface/Notifications';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';

export function NotificationsList({ notifications }: NotificationsArray): JSX.Element {
  const classes = useStyles();
  const [invisible, setInvisible] = React.useState(false);

  //if notification is read
  const handleBadgeVisibility = () => {
    setInvisible(true);
  };
  return (
    <List component="nav" className={classes.root} aria-label="notifications">
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
            <ListItem
              button
              key={
                (notification.type,
                notification.photo,
                notification.senderId.username,
                notification.type,
                notification.contestId.title)
              }
            >
              <Grid container alignItems="center" justify="center">
                <Grid item xs={3}>
                  <Avatar alt="Notification Thumbnail" src={notification.photo} />
                </Grid>

                {notification.type === 'submission' ? (
                  <Grid item xs={8}>
                    <b>{notification.senderId.username}</b> submitted a design to your contest{' '}
                    <b>{notification.contestId.title}</b>.
                  </Grid>
                ) : (
                  <Grid item xs={8}>
                    <b>{notification.senderId.username}</b> sent you a message.
                  </Grid>
                )}
                <Grid item xs={1}>
                  {notification.readStatus ? '  ' : <FiberManualRecordIcon className={classes.readIndicator} />}
                </Grid>
              </Grid>
            </ListItem>
            <Divider />
          </>
        ),
      )}
    </List>
  );
}
