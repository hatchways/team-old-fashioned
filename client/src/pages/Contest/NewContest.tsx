import React, { FunctionComponent, Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { FormikHelpers } from 'formik';
import Typography from '@material-ui/core/Typography';
import useStyles from './useStyles';
import AuthHeader from '../../components/AuthHeader/AuthHeader';
import NewContestForm from './NewContestForm/NewContestForm';
//import { useAuth } from '../../context/useAuthContext';
//import { useSnackBar } from '../../context/useSnackbarContext';

const NewContest: FunctionComponent = (): JSX.Element => {
  const classes = useStyles();

  const handleSubmit = (
    {
      title,
      description,
      prizeAmount,
      date,
      time,
      timezone,
    }: {
      title: string;
      description: string;
      prizeAmount: string;
      date: string;
      time: string;
      timezone: string;
    },
    {
      setSubmitting,
    }: FormikHelpers<{
      title: string;
      description: string;
      prizeAmount: string;
      date: string;
      time: string;
      timezone: string;
    }>,
  ) => {
    console.log('form sub', title.replace, description, prizeAmount, date, time, timezone);
    setSubmitting(false);
  };

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid container direction="column">
        {/* <Grid container direction="row" alignItems="center" justify="space-between" className={classes.navigation}>
          <Grid item xs={3}>
            <NavLink className={classes.logo} to="/">
              TATTOO ART
            </NavLink>
          </Grid>
          <Grid item xs={9}>
            <Grid container justify="flex-end">
              <Grid item>
                <NavLink activeClassName={classes.active} className={classes.link} to="/discover">
                  Discover
                </NavLink>
              </Grid>
              <Grid item>
                <NavLink activeClassName={classes.active} className={classes.link} to="/messages">
                  Messages
                </NavLink>
              </Grid>
              <Grid item>
                <NavLink activeClassName={classes.active} className={classes.link} to="/notifications">
                  Notifications
                </NavLink>
              </Grid>
              <Grid item>
                <NavLink activeClassName={classes.active} className={classes.link} to="/new-contest">
                  Create Contest
                </NavLink>
              </Grid>
              <Grid item>
                <NavLink activeClassName={classes.active} className={classes.link} to="/account">
                  Account
                </NavLink>
              </Grid>
            </Grid>
          </Grid>
        </Grid> */}
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
