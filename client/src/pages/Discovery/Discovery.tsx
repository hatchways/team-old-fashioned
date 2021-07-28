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
  Grid,
  Typography,
} from '@material-ui/core';
import useStyles from './useStyles';
import { Contest } from '../../interface/Contest';
import { getAllContests } from '../../helpers/APICalls/contest';
import { useSnackBar } from '../../context/useSnackbarContext';

export default function Discovery(): JSX.Element {
  const classes = useStyles();
  const [contestObj, setContestObj] = useState<Contest[]>();
  const { updateSnackBarMessage } = useSnackBar();

  useEffect(() => {
    getAllContests().then((data) => {
      if (data.error) {
        updateSnackBarMessage(data.error.message);
      } else {
        setContestObj(data.contest);
      }
    });
  }, [updateSnackBarMessage]);

  return (
    <div className={classes.root}>
      <Grid container alignItems="center" alignContent="center" spacing={6}>
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
                  <Button size="small" color="primary">
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
