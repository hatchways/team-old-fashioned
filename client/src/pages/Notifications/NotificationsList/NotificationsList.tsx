import * as React from 'react';
import { Notification } from '../../../interface/Notifications';
import timeSince from '../RelativeTimes';
import useStyles from './useStyles';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

interface Props {
  notifications: Notification[];
  type: 'page' | 'dropdown';
}
export function NotificationsList({ notifications, type }: Props): JSX.Element {
  const classes = useStyles();
  // TODO: Mark notification as read when clicked
  // const [invisible, setInvisible] = React.useState(false);

  // const handleBadgeVisibility = () => {
  //   setInvisible(true);
  // };
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
          timeSent: Date;
          readStatus: boolean;
          photo: string;
        }) => (
          <>
            <ListItem
              button
              key={(notification.type, notification.photo, notification.senderId.username, notification.type)}
            >
              <Grid container={true} alignItems="center" justify="center" spacing={2} wrap="nowrap">
                <Grid item xs={2} container direction="column" justify="flex-end" alignItems="flex-end">
                  <Avatar alt="Notification Thumbnail" src={notification.photo} />
                </Grid>
                <Grid item xs={9}>
                  <Typography variant="body2" noWrap={type === 'dropdown' ? true : false}>
                    {notification.type === 'submission' ? (
                      <span>
                        <b>{notification.senderId.username}</b> submitted a design to your contest{' '}
                        <b>{notification.contestId.title}</b>.
                      </span>
                    ) : (
                      <span>
                        <b>{notification.senderId.username}</b> sent you a message.
                      </span>
                    )}
                    <br />
                    <i>{timeSince(notification.timeSent)} ago</i>
                  </Typography>
                </Grid>
                <Grid item xs={1} justify="flex-start" alignItems="flex-start">
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
