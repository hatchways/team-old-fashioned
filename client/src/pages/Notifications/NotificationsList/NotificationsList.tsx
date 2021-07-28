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
      {notifications.map((notification: Notification) => (
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
                        {notification.contestId.title}.
                      </Typography>
                    </>
                  ) : (
                    <Typography display="inline" variant="body2" className={classes.regularText}>
                      <>&nbsp; sent you a message.</>
                    </Typography>
                  )}
                  {/* </Box> */}
                  <Typography variant="body2" className={classes.italicText}>
                    {timeSince(notification.createdAt)} ago
                  </Typography>
                </Typography>
              </Grid>
              <Grid item xs={1} justify="flex-start" alignItems="flex-start">
                {notification.readStatus ? '  ' : <FiberManualRecordIcon className={classes.readIndicator} />}
              </Grid>
            </Grid>
          </ListItem>
          <Divider />
        </>
      ))}
    </List>
  );
}
