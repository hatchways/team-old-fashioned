import { Grid, CssBaseline, Paper, Box, Typography } from '@material-ui/core';
import { FormikHelpers } from 'formik';
import { useSnackBar } from '../../../context/useSnackbarContext';
import sendResetEmailAPI from '../../../helpers/APICalls/resetPassword';
import EmailForm from './EmailForm/EmailForm';
import { useHistory } from 'react-router-dom';
import useStyles from './useStyles';

export default function ForgetPassword(): JSX.Element {
  const classes = useStyles();
  const history = useHistory();
  const { updateSnackBarMessage } = useSnackBar();
  const handleSubmit = ({ email }: { email: string }, { setSubmitting }: FormikHelpers<{ email: string }>) => {
    sendResetEmailAPI(email).then((data) => {
      if (data.error) {
        updateSnackBarMessage(data.error.message);
      } else {
        updateSnackBarMessage(data.success.message);
        setTimeout(() => {
          history.push(`/email/reset-password/${data.success.token}`);
        }, 2000);
      }
    });
    setSubmitting(false);
  };

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={12} elevation={6} component={Paper} square>
        <Box display="flex" alignItems="center" justifyContent="center" flexDirection="columu" paddingTop="23px">
          <Box width="100%" maxWidth={450} p={3} alignSelf="center">
            <Grid container>
              <Grid item xs component={Paper} elevation={3} square className={classes.authCard}>
                <Typography className={classes.welcome} component="h1" variant="h5">
                  Enter your email
                </Typography>
                <EmailForm handleSubmit={handleSubmit} />
              </Grid>
            </Grid>
          </Box>
          <Box p={1} alignSelf="center" />
        </Box>
      </Grid>
    </Grid>
  );
}
