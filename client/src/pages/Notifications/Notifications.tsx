import { useEffect, useState } from 'react';
import { Notification } from '../../interface/Notifications';
import { FetchOptions } from '../../interface/FetchOptions';
import { NotificationsList } from './NotificationsList/NotificationsList';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import useStyles from './useStyles';

export default function NotificationsPage(): JSX.Element {
  const classes = useStyles();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const saveNotifications = (notifications: Notification[]) => {
    setNotifications(notifications);
  };

  useEffect(() => {
    let active = true;

    // APICall currently inlined. Receiving null array in 'notifications' when importing APICall, although response shows receipt of notifications array.
    const getNotifications = async () => {
      const fetchOptions: FetchOptions = {
        method: 'GET',
        credentials: 'include',
      };
      try {
        const response = await fetch(`/notifications`, fetchOptions);
        const json = await response.json();
        if (active && json) {
          console.log(json);
          saveNotifications(json);
        }
      } catch (error) {
        console.log('Unable to connect to server. Please try again.', error);
      }
    };

    getNotifications();

    return () => {
      active = false;
    };
  }, []);

  // Filter since notifications also includes message notifications
  const notificationsOnly = notifications.filter(function (notif) {
    return notif.type === 'submission';
  });

  return (
    <Grid container component="main" className={classes.root} direction="column">
      <CssBaseline />
      <Grid container alignItems="center" justify="center">
        <Grid item xs={12} sm={10} md={8} className={classes.titleColumn}>
          <Box display="flex" flexWrap="nowrap" alignItems="center" bgcolor="transparent">
            <Typography className={classes.pageTitle} component="h1" variant="h5">
              Notifications
            </Typography>
          </Box>
          <Grid className={classes.spacer}></Grid>
          <Paper elevation={6} square className={classes.notificationsPaper}>
            <NotificationsList notifications={notificationsOnly} type="page" />
          </Paper>
        </Grid>
      </Grid>
    </Grid>
  );
}
