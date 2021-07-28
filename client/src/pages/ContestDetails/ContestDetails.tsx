import { useEffect, useState } from 'react';
import { useHistory, RouteComponentProps } from 'react-router-dom';
import { Link } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import CircularProgress from '@material-ui/core/CircularProgress';
import FullWidthTabs from './ContestDetailTabs/ContestDetailTabs';
import { useAuth } from '../../context/useAuthContext';
import useStyles from './useStyles';
import demoProfilePhoto from '../../Images/demo-profile-photo.png';
import sampleContestData from './SampleContestData';
import { getAllSubmissions } from '../../helpers/APICalls/submission';
import { Submission } from '../../interface/Submission';

export default function ContestDetails({ match }: RouteComponentProps): JSX.Element {
  const classes = useStyles();
  const [submissionObj, setSubmissionObj] = useState<Submission[]>(Object);
  const [contestId, setContestId] = useState<string>('');
  const { loggedInUser } = useAuth();

  const history = useHistory();
  const { title, description, prizeAmount, user } = sampleContestData();

  useEffect(() => {
    const params = match.params as { id: string };
    setContestId(params.id);
    getAllSubmissions(params.id).then((data) => {
      setSubmissionObj(data.submission);
    });
  }, [match]);

  if (loggedInUser === undefined) return <CircularProgress />;
  if (!loggedInUser) {
    history.push('/login');
    // loading for a split seconds until history.push works
    return <CircularProgress />;
  }

  return (
    <>
      {submissionObj.length ? (
        <Grid container component="main" className={classes.root} direction="column">
          <CssBaseline />
          <Grid container alignItems="center" justify="center">
            <Grid item xs={12} sm={10} md={8}>
              <Link to="/contest/all" className={classes.breadcrumb}>
                <ArrowBackIosIcon fontSize="inherit" /> Back to contests list
              </Link>
            </Grid>
            <Grid item xs={12} sm={10} md={8} className={classes.titleColumn}>
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
                <div>
                  <Button
                    component={Link}
                    to={`/file-upload/${contestId}`}
                    variant="outlined"
                    color="primary"
                    className={classes.winnerButton}
                  >
                    submit design
                  </Button>
                </div>
              </Box>
              <Grid item xs={12} sm={10} md={8} className={classes.ownerColumn}>
                <Box display="flex" alignItems="center">
                  <Box>
                    <Avatar src={demoProfilePhoto} alt="Profile Photo" />
                  </Box>
                  <Box className={classes.userText}>By {user}</Box>
                </Box>
              </Grid>
              <Grid className={classes.spacer}></Grid>
              <FullWidthTabs submissionList={submissionObj} description={description} />
            </Grid>
          </Grid>
        </Grid>
      ) : null}
    </>
  );
}
