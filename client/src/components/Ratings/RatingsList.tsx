import { Fragment } from 'react';
import { Rating } from '../../interface/Ratings';
import relativeTime from '../../pages/Notifications/RelativeTime';
import useStyles from './useStyles';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import { useAuth } from '../../context/useAuthContext';
import { Rating as StarRating } from '@material-ui/lab/';

interface Props {
  ratings: Rating[];
}
export function RatingsList({ ratings }: Props): JSX.Element {
  const classes = useStyles();
  const { loggedInUser } = useAuth();

  return (
    <List component="nav" className={classes.root} aria-label="ratings">
      {ratings.map((rating: Rating) => (
        <Fragment key={rating._id}>
          <ListItem>
            <Grid container={true} alignItems="center" justifyContent="center" spacing={2} wrap="nowrap">
              <Grid item xs={2} container direction="column">
                <Avatar alt="rating Thumbnail" src={rating.raterId.profilePicUrl} />
              </Grid>
              <Grid item xs={9}>
                <StarRating name="star rating" value={rating.numericalRating} readOnly />
                <Typography variant="body2" className={classes.boldText}>
                  {rating.raterId.username} rated {rating.artistId.username} with {rating.numericalRating} stars for
                  contest {rating.contestId.title}.
                </Typography>
                <Typography variant="body2" className={classes.regularText}>
                  {rating.textRating}
                </Typography>
                <Typography variant="body2" className={classes.italicText}>
                  {relativeTime(rating.createdAt, 'since')} ago
                </Typography>
              </Grid>
              <img
                src={`${rating.submissionId.files[0]}?w=164&h=164&fit=crop&auto=format`}
                srcSet={`${rating.submissionId.files[0]}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                alt="submission"
                loading="lazy"
              />
            </Grid>
          </ListItem>
          <Divider />
        </Fragment>
      ))}
    </List>
  );
}
