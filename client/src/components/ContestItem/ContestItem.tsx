import { FC } from 'react';
import { Button, Grid, Box, ImageList, ImageListItem, ImageListItemBar } from '@material-ui/core';
import useStyles from './useStyles';

interface Props {
  imgSrc: string;
  imgCount: number;
  headline: string;
  byline: string;
  prizeAmt: number;
  completed?: boolean;
}

const ContestItem: FC<Props> = ({
  imgSrc,
  imgCount,
  headline,
  byline,
  prizeAmt,
  completed = false,
}: Props): JSX.Element => {
  const classes = useStyles();
  return (
    <Grid container className={classes.contestItemContainer}>
      <Grid item>
        <ImageList cols={1}>
          <ImageListItem key={1}>
            <img src={imgSrc} alt={headline} className={classes.contestImg} />
            <ImageListItemBar title={imgCount + ' SKETCH' + (imgCount > 1 ? 'ES' : '')} />
          </ImageListItem>
        </ImageList>
      </Grid>
      <Grid item className={classes.infoContainer}>
        <Box className={classes.headline}>{headline}</Box>
        <Box className={classes.byline}>{byline}</Box>
        <Box>
          <Button className={classes.btn}>{completed ? 'COMPLETED' : `$${prizeAmt}`}</Button>
        </Box>
      </Grid>
    </Grid>
  );
};

export default ContestItem;
