import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useAuth } from '../../context/useAuthContext';
import { useSocket } from '../../context/useSocketContext';
import useStyles from './useStyles';
import { Notification, NotificationsList } from '../../interface/Notifications';
// import { getNotifications } from '../../helpers/APICalls/getNotifications';
import { NotificationsGrid } from './NotificationsGrid';

import { FetchOptions } from '../../interface/FetchOptions';

export default function NotificationsPage(): JSX.Element {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const classes = useStyles();
  const { loggedInUser } = useAuth();
  const { initSocket } = useSocket();
  // const [loading, setLoading] = useState(false);

  const history = useHistory();

  useEffect(() => {
    const saveNotifications = (notifications: Notification[]) => {
      setNotifications(notifications);
    };
    // initSocket();
    let active = true;
    // async function fetchNotifications() {
    //   // setLoading(true);
    //   const response = await getNotifications();
    //   if (active && response.notifications) {
    //     saveNotifications(response.notifications);
    //   } else {
    //     console.log(response);
    //   }
    //   // setLoading(false);
    // }
    // fetchNotifications();
    const getNotifications = async () => {
      const fetchOptions: FetchOptions = {
        method: 'GET',
        credentials: 'include',
      };
      try {
        const response = await fetch(`/notifications`, fetchOptions);
        const json = await response.json();
        console.log(json);
        saveNotifications(json);
      } catch (error) {
        console.log('error', error);
      }
    };
    getNotifications();

    return () => {
      active = false;
    };
  }, []);

  if (loggedInUser === undefined) return <CircularProgress />;
  if (!loggedInUser) {
    history.push('/login');
    // loading for a split seconds until history.push works
    return <CircularProgress />;
  }

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
          <NotificationsGrid notifications={notifications} />
        </Grid>
      </Grid>
    </Grid>
  );
}
