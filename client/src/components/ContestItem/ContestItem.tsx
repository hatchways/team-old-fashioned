import { FC } from 'react';
import { Button, Grid, Box, ImageList, ImageListItem, ImageListItemBar, Typography } from '@material-ui/core';
import useStyles from './useStyles';
import { Link } from 'react-router-dom';

interface Props {
  id: string;
  imgSrc: string;
  imgCount: number;
  headline: string;
  deadline: Date;
  byline: string;
  prizeAmt: number;
  completed?: boolean;
}

const ContestItem: FC<Props> = ({
  id,
  imgSrc,
  imgCount,
  headline,
  deadline,
  byline,
  prizeAmt,
  completed = false,
}: Props): JSX.Element => {
  const classes = useStyles();
  const formatedDeadline =
    (new Date(deadline) > new Date() ? 'ends ' : 'ended ') +
    new Date(deadline).toLocaleDateString() +
    ' ' +
    new Date(deadline).toLocaleTimeString();
  return (
    <Grid container className={classes.contestItemContainer}>
      <Grid item component={Link} to={`/contest-details/${id}`}>
        <ImageList cols={1}>
          <ImageListItem key={1} classes={{ item: classes.item }}>
            <img src={imgSrc} alt={headline} className={classes.contestImg} />
            <ImageListItemBar title={imgCount + ' SKETCH' + (imgCount === 0 || imgCount > 1 ? 'ES' : '')} />
          </ImageListItem>
        </ImageList>
      </Grid>
      <Grid item className={classes.infoContainer}>
        <Typography className={classes.headline}>{headline}</Typography>
        <Typography className={classes.byline}>{byline}</Typography>
        <Box>
          <Button className={classes.btn}>{completed ? 'COMPLETED' : `$${prizeAmt}`}</Button>
        </Box>
        <Typography className={classes.deadline}>{formatedDeadline}</Typography>
      </Grid>
    </Grid>
  );
};

export default ContestItem;
