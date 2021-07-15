import React, { FunctionComponent } from 'react';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import DesignItem from './DesignItem/DesignItem';
import useStyles from './useStyles';

const PreferedDesigns: FunctionComponent = (): JSX.Element => {
  const classes = useStyles();
  const designItems = [...Array(12).keys()];

  return (
    <Box>
      <Box>
        <Typography className={classes.header}>Which designs do you like?</Typography>
      </Box>
      <Box>
        <Typography className={classes.subHeader}>
          Let&apos;s start by helping your designers understand which styles you prefer.
        </Typography>
      </Box>
      <Paper className={classes.imagePaper} elevation={6} square>
        <Grid container direction="row">
          {designItems.map((i) => (
            <DesignItem key={`di-${i}`} isSelected={false} imgSrc="foo" />
          ))}
        </Grid>
      </Paper>
    </Box>
  );
};

export default PreferedDesigns;
