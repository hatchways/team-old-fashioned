import { useEffect, useState } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import useStyles from './useStyles';
import { Notification } from '../../interface/Notifications';
import Paper from '@material-ui/core/Paper';
import { NotificationsList } from './NotificationsList/NotificationsList';

import { FetchOptions } from '../../interface/FetchOptions';

export default function NotificationsPage(): JSX.Element {
  const classes = useStyles();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const saveNotifications = (notifications: Notification[]) => {
    setNotifications(notifications);
  };

  useEffect(() => {
    let active = true;

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

  return (
    <Grid container component="main" className={classes.root} direction="column">
      <CssBaseline />
      <Grid container alignItems="center" justify="center">
        <Grid item xs={12} sm={10} md={8}></Grid>
        <Grid item xs={12} sm={10} md={8} className={classes.titleColumn}>
          <Box display="flex" flexWrap="nowrap" alignItems="center" bgcolor="transparent">
            Notifications
            {console.log(notifications)}
            {/* {isLoading ? <CircularProgress /> : notifications} */}
          </Box>
          <Grid className={classes.spacer}></Grid>
          <Paper elevation={6} square className={classes.notificationsPaper}>
            <NotificationsList notifications={notifications} />
          </Paper>
        </Grid>
      </Grid>
    </Grid>
  );
}
