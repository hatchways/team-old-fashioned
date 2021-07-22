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
import { Notifications } from '../../interface/Notifications';
import { getNotifications } from '../../helpers/APICalls/getNotifications';
import { NotificationsList } from './NotificationsList';

export default function NotificationsPage(): JSX.Element {
  const [notifications, setNotifications] = useState<Notifications['notifications']>([]);

  const classes = useStyles();
  const { loggedInUser } = useAuth();
  const { initSocket } = useSocket();
  const [isLoading, setisLoading] = useState(false);

  const history = useHistory();
  // const { title, description, prizeAmount, user, submissions } = sampleContestData();

  useEffect(() => {
    initSocket();
    async function fetchNotifications() {
      setisLoading(true);
      const response = await getNotifications();
      if (response) {
        setNotifications(response['notifications']);
      } else {
        console.log(`Unable to fetch`);
      }
      setisLoading(false);
    }
    fetchNotifications();
  }, [initSocket]);

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
            Notifications {console.log(notifications)}
          </Box>
          <Grid className={classes.spacer}></Grid>
          {/* <NotificationsList notifications={notifications} /> */}
        </Grid>
      </Grid>
    </Grid>
  );
}
