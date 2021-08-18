import { Fragment } from 'react';
import { useHistory } from 'react-router-dom';
import { Notification } from '../../../interface/Notifications';
import relativeTime from '../RelativeTime';
import useStyles from './useStyles';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import { useSocket } from '../../../context/useSocketContext';
import { useAuth } from '../../../context/useAuthContext';

interface Props {
  notifications: Notification[];
  type: 'page' | 'dropdown';
}
export function NotificationsList({ notifications, type }: Props): JSX.Element {
  const classes = useStyles();
  const history = useHistory();
  const { socket } = useSocket();
  const { loggedInUser } = useAuth();

  const handleClick = (notification: Notification) => {
    if (socket) {
      socket.emit('read notification', { notificationId: notification._id, receiverId: loggedInUser?.id });
      notification.readStatus = true;
    }
    // Linking to conversation by Id is not supported yet
    const link = notification.type === 'submission' ? `/contest-details/${notification.contestId?._id}` : '/messages';
    history.push(link);
  };

  return (
    <List component="nav" className={classes.root} aria-label="notifications">
      {notifications.map((notification: Notification) => (
        <Fragment key={notification._id}>
          <ListItem
            button
            onClick={(e) => {
              handleClick(notification);
            }}
          >
            <Grid container={true} alignItems="center" justifyContent="center" spacing={2} wrap="nowrap">
              <Grid item xs={2} container direction="column">
                <Avatar alt="Notification Thumbnail" src={notification.photo} />
              </Grid>
              <Grid item xs={9}>
                <Typography noWrap={type === 'dropdown' ? true : false}>
                  <Typography display="inline" variant="body2" className={classes.boldText}>
                    {notification.senderId.username}
                  </Typography>
                  {notification.type === 'submission' ? (
                    <>
                      <Typography display="inline" variant="body2" className={classes.regularText}>
                        &nbsp; submitted a design to your contest &nbsp;
                      </Typography>
                      <Typography display="inline" variant="body2" className={classes.boldText}>
                        {notification.contestId?.title}.
                      </Typography>
                    </>
                  ) : (
                    <Typography display="inline" variant="body2" className={classes.regularText}>
                      <>&nbsp; sent you a message.</>
                    </Typography>
                  )}
                  <Typography variant="body2" className={classes.italicText}>
                    {relativeTime(notification.createdAt, 'since')} ago
                  </Typography>
                </Typography>
              </Grid>
              <Grid item xs={1}>
                {notification.readStatus ? '  ' : <FiberManualRecordIcon className={classes.readIndicator} />}
              </Grid>
            </Grid>
          </ListItem>
          <Divider />
        </Fragment>
      ))}
    </List>
  );
}
