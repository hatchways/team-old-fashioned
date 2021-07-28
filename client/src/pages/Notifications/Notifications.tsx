import { useContext } from 'react';
import { NotificationsList } from './NotificationsList/NotificationsList';
import { NotificationsContext } from '../../context/useNotificationsContext';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import useStyles from './useStyles';

export default function NotificationsPage(): JSX.Element {
  const classes = useStyles();
  const { notifications } = useContext(NotificationsContext);

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
