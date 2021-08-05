import { Grid, CssBaseline, Paper, Box, Typography } from '@material-ui/core';
import { FormikHelpers } from 'formik';
import { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { useSnackBar } from '../../../context/useSnackbarContext';
import { resetPasswordAPI } from '../../../helpers/APICalls/resetPassword';
import PasswordForm from './PasswordForm/PasswordForm';
import useStyles from './useStyles';

export default function ResetPassword({ match }: RouteComponentProps): JSX.Element {
  const classes = useStyles();
  const [token, setToken] = useState<string>('');
  const { updateSnackBarMessage } = useSnackBar();

  useEffect(() => {
    const params = match.params as { token: string };
    setToken(params.token);
  }, [match]);

  const handleSubmit = ({ password }: { password: string }, { setSubmitting }: FormikHelpers<{ password: string }>) => {
    resetPasswordAPI(token, password).then((data) => {
      if (data.error) {
        updateSnackBarMessage(data.error.message);
      } else {
        updateSnackBarMessage(data.success.message);
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
                  Enter your new password
                </Typography>
                <PasswordForm handleSubmit={handleSubmit} />
              </Grid>
            </Grid>
          </Box>
          <Box p={1} alignSelf="center" />
        </Box>
      </Grid>
    </Grid>
  );
}
