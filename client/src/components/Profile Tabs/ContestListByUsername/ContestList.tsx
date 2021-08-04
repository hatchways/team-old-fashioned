import * as React from 'react';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import { ContestAPIData } from '../../../interface/Contest';
import useStyles from './useStyles';
import relativeTime from '../../../pages/Notifications/RelativeTime';

interface Props {
  contests: ContestAPIData[];
}
export function ContestList({ contests }: Props): JSX.Element {
  const classes = useStyles();

  return (
    <List component="nav" className={classes.root} aria-label="contests">
      {contests.map((contest: ContestAPIData) => (
        <>
          <ListItem button key={contest._id}>
            <Grid
              component={Link}
              to={`/contest-details/${contest._id}`}
              container={true}
              alignItems="center"
              justify="center"
              spacing={2}
              wrap="nowrap"
              className={classes.link}
            >
              <Grid item xs={3} container direction="column" justify="flex-end" alignItems="flex-end">
                <Typography variant="body2" className={classes.boldText}>
                  {contest.title}
                </Typography>
              </Grid>
              <Grid item xs={6} container direction="column" justify="center" alignItems="center">
                <Typography variant="body2" className={classes.regularText}>
                  {contest.description}
                </Typography>
                <Typography variant="body2" className={classes.italicText}>
                  Ends in {relativeTime(contest.deadline, 'until')}
                </Typography>
              </Grid>
              <Grid item xs={3} justify="flex-start" alignItems="flex-start">
                <Button variant="contained" color="primary" disableElevation className={classes.prize}>
                  {contest.prizeAmount}
                </Button>
              </Grid>
            </Grid>
          </ListItem>
          <Divider />
        </>
      ))}
    </List>
  );
}
