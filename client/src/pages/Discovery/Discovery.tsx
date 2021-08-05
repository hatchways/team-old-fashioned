import { useEffect, useState } from 'react';
import Grow from '@material-ui/core/Grow';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CircularProgress,
  Grid,
  Typography,
} from '@material-ui/core';
import useStyles from './useStyles';
import { Contest } from '../../interface/Contest';
import { getAllContests } from '../../helpers/APICalls/contest';
import { useSnackBar } from '../../context/useSnackbarContext';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../context/useAuthContext';
import { FormikHelpers } from 'formik';
import AdvanceSearch from './SearchForm/AdvanceSearch/AdvanceSearch';
import SimpleSearch from './SearchForm/SimpleSearch/SimpleSearch';

export default function Discovery(): JSX.Element {
  const classes = useStyles();
  const [contestObj, setContestObj] = useState<Contest[]>();
  const { updateSnackBarMessage } = useSnackBar();
  const { loggedInUser } = useAuth();
  const history = useHistory();

  useEffect(() => {
    const fetchAllcontests = () => {
      getAllContests(null, null, null, null).then((data) => {
        if (data.error) {
          updateSnackBarMessage(data.error.message);
        } else {
          setContestObj(data.contest);
        }
      });
    };
    fetchAllcontests();
  }, [updateSnackBarMessage, history]);

  const handleSimpleSubmit = (
    {
      search,
    }: {
      search: string;
    },
    {
      setSubmitting,
    }: FormikHelpers<{
      search: string;
    }>,
  ) => {
    history.push(`?search=${search}`);
    getAllContests(search, null, null, null).then((data) => {
      if (data.success) {
        setContestObj(data.success.contest);
      } else {
        updateSnackBarMessage(data.error);
      }
    });
    setSubmitting(false);
  };

  const handleSubmit = (
    {
      title,
      startTime,
      endTime,
    }: {
      title: string;
      startTime: Date;
      endTime: Date;
    },
    {
      setSubmitting,
    }: FormikHelpers<{
      title: string;
      startTime: Date;
      endTime: Date;
    }>,
  ) => {
    history.push(`?title=${title}&startTime=${startTime}&endTime=${endTime}`);
    getAllContests(null, title, startTime, endTime).then((data) => {
      if (data.success) {
        setContestObj(data.success.contest);
      } else {
        updateSnackBarMessage(data.error);
      }
    });
    setSubmitting(false);
  };

  const handleClick = (contestId: string) => {
    if (loggedInUser === undefined) return <CircularProgress />;
    if (!loggedInUser) {
      history.push('/login');
      // loading for a split seconds until history.push works
      return <CircularProgress />;
    }
    history.push(`/contest-details/${contestId}`);
  };

  return (
    <div className={classes.root}>
      <Box display="flex" justifyContent="flex-end" height="75%" className={classes.formContainer}>
        <SimpleSearch handleSimpleSubmit={handleSimpleSubmit} />
        <AdvanceSearch handleSubmit={handleSubmit} />
      </Box>
      <Grid container alignItems="center" alignContent="space-around" spacing={6} className={classes.cardContainer}>
        {contestObj?.map((contest, index) => (
          <Grid item xl={3} md={4} xs={12} key={contest._id}>
            <Grow in={true} style={{ transformOrigin: '0 0 0' }} {...{ timeout: 1000 * index }}>
              <Card className={classes.card}>
                <CardActionArea>
                  <Box display="flex" flexDirection="column" alignItems="center" className={classes.avatar}>
                    <Avatar alt="Remy Sharp" src={contest.profileImg} className={classes.large} />
                  </Box>
                  <CardContent>
                    <Typography align="center">{contest.ownerName}</Typography>
                    <Typography gutterBottom variant="h5" component="h2">
                      {contest.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p" display="block" noWrap>
                      {contest.description}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button variant="contained" color="primary" className={classes.prize} disableElevation>
                    ${contest.prizeAmount}
                  </Button>
                  <Button size="small" color="primary" onClick={() => handleClick(contest._id)}>
                    Learn More
                  </Button>
                </CardActions>
              </Card>
            </Grow>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
