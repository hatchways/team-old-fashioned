import React, { FunctionComponent } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { FormikHelpers } from 'formik';
import Typography from '@material-ui/core/Typography';
import useStyles from './useStyles';
import NewContestForm from './NewContestForm/NewContestForm';
import { createContestAPI } from '../../helpers/APICalls/contest';
import { useSnackBar } from '../../context/useSnackbarContext';

const NewContest: FunctionComponent = (): JSX.Element => {
  const classes = useStyles();
  const { updateSnackBarMessage } = useSnackBar();

  const handleSubmit = (
    {
      title,
      description,
      prizeAmount,
      deadline,
      time,
      timezone,
    }: {
      title: string;
      description: string;
      prizeAmount: string;
      deadline: Date;
      time: string;
      timezone: string;
    },
    {
      setSubmitting,
    }: FormikHelpers<{
      title: string;
      description: string;
      prizeAmount: string;
      deadline: Date;
      time: string;
      timezone: string;
    }>,
  ) => {
    createContestAPI(title, description, prizeAmount, deadline).then((data) => {
      if (data.error) {
        updateSnackBarMessage(data.error.message);
      } else if (data.success) {
        updateSnackBarMessage(data.success.message);
      } else {
        updateSnackBarMessage('An unexpected error occurred. Please try again');
      }
    });
    setSubmitting(false);
  };

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid container direction="column">
        <Grid container alignItems="center" justify="center">
          <Grid item xs={12} sm={10} md={8}>
            <Typography className={classes.welcome} component="h1" variant="h5">
              Create new contest
            </Typography>
            <Paper className={classes.formPaper} elevation={6} square>
              <NewContestForm handleSubmit={handleSubmit} />
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default NewContest;
