import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useAuth } from '../../context/useAuthContext';
import { useSocket } from '../../context/useSocketContext';
import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import useStyles from './useStyles';
import { Link } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import demoProfilePhoto from '../../Images/demo-profile-photo.png';
import FullWidthTabs from './ContestDetailTabs/ContestDetailTabs';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import Button from '@material-ui/core/Button';
import sampleContestData from './SampleContestData';

export default function ContestDetails(): JSX.Element {
  const classes = useStyles();
  const { loggedInUser } = useAuth();
  const { initSocket } = useSocket();

  const history = useHistory();
  const { title, description, prizeAmount, user, submissions } = sampleContestData();

  useEffect(() => {
    initSocket();
  }, [initSocket]);

  if (loggedInUser === undefined) return <CircularProgress />;
  if (!loggedInUser) {
    history.push('/login');
    // loading for a split seconds until history.push works
    return <CircularProgress />;
  }

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid container direction="column">
        <Grid container alignItems="center" justify="center">
          <Grid item xs={12} sm={10} md={8}>
            <Link to="/contest/all" className={classes.breadcrumb}>
              <ArrowBackIosIcon fontSize="inherit" /> Back to contests list
            </Link>
          </Grid>
          <Grid item xs={12} sm={10} md={8} style={{ paddingTop: 32 }}>
            <Box display="flex" flexWrap="nowrap" alignItems="center" bgcolor="transparent">
              <Box>
                <Typography className={classes.contestTitle} component="h1" variant="h5">
                  {title}
                </Typography>
              </Box>
              <Box flexGrow={1}>
                <Button variant="contained" color="primary" disableElevation className={classes.prize}>
                  {prizeAmount}
                </Button>
              </Box>
              <Box>
                <Button variant="outlined" color="primary" style={{ borderRadius: 0 }}>
                  SELECT WINNER
                </Button>
              </Box>
            </Box>
            <Grid item xs={12} sm={10} md={8} style={{ paddingTop: 8 }}>
              <Box display="flex" alignItems="center">
                <Box>
                  <Avatar className={classes.profilePhoto} src={demoProfilePhoto} alt="Profile Photo" />
                </Box>
                <Box style={{ paddingLeft: 8, fontWeight: 600 }}>By {user}</Box>
              </Box>
            </Grid>
            <Grid style={{ paddingTop: 32 }}></Grid>
            <FullWidthTabs submissionList={submissions} description={description} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
