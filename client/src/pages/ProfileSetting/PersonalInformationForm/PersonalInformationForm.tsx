import { FunctionComponent } from 'react';
import { useAuth } from '../../../context/useAuthContext';
import { Button, TextField, Grid, CircularProgress, FormLabel, Box, Paper } from '@material-ui/core';
import { Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import updatePersonalInformation from '../../../helpers/APICalls/updatePersonalInformation';
import { useSnackBar } from '../../../context/useSnackbarContext';

import useStyles from './useStyles';

interface UserPersonalInformation {
  headline: string;
  bio: string;
  location: string;
}
const PersonalInformationForm: FunctionComponent = (): JSX.Element => {
  const classes = useStyles();
  const { loggedInUser, updateLoginContext } = useAuth();
  const { updateSnackBarMessage } = useSnackBar();

  const formSubmitHandler = (
    { headline, bio, location }: UserPersonalInformation,
    { setSubmitting }: FormikHelpers<UserPersonalInformation>,
  ) => {
    if (loggedInUser) {
      updatePersonalInformation(loggedInUser.email, headline, bio, location).then((data) => {
        if (data.error) {
          updateSnackBarMessage(data.error.message);
        } else if (data.success && data.user) {
          updateLoginContext({
            message: 'profile information updated',
            user: data.user,
          });
          updateSnackBarMessage('Saved');
        }
        setSubmitting(false);
      });
    }
  };

  return (
    <Formik
      initialValues={{
        headline: loggedInUser ? loggedInUser.headline : '',
        bio: loggedInUser ? loggedInUser.bio : '',
        location: loggedInUser ? loggedInUser.location : '',
      }}
      validationSchema={Yup.object().shape({
        headline: Yup.string().max(40).required('Headline is required'),
        bio: Yup.string().max(200).required('Biography is required'),
        location: Yup.string().max(40).required('Location is required'),
      })}
      onSubmit={formSubmitHandler}
    >
      {({ handleSubmit, handleChange, values, touched, errors, isSubmitting }) => (
        <form onSubmit={handleSubmit} className={classes.form} noValidate>
          <Box textAlign="center" className={classes.title}>
            Personal Information
          </Box>
          <Paper className={classes.paper} elevation={6} square>
            <Grid container direction="row" justifyContent="center" spacing={4}>
              <Grid item xs={11} md={9}>
                <FormLabel htmlFor="headline">Headline</FormLabel>
                <TextField
                  id="headline"
                  name="headline"
                  variant="outlined"
                  fullWidth
                  margin="none"
                  placeholder="One sentence that describes you"
                  autoFocus
                  helperText={touched.headline ? errors.headline : ''}
                  error={touched.headline && Boolean(errors.headline)}
                  value={values.headline}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={11} md={9}>
                <FormLabel htmlFor="bio">Biography</FormLabel>
                <TextField
                  id="bio"
                  name="bio"
                  variant="outlined"
                  multiline
                  rows={4}
                  fullWidth
                  margin="none"
                  placeholder="Some more details about yourself"
                  helperText={touched.bio ? errors.bio : ''}
                  error={touched.bio && Boolean(errors.bio)}
                  value={values.bio}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={11} md={9}>
                <FormLabel htmlFor="location">Location</FormLabel>
                <TextField
                  id="location"
                  name="location"
                  variant="outlined"
                  fullWidth
                  margin="none"
                  placeholder="Where you call home"
                  helperText={touched.location ? errors.location : ''}
                  error={touched.location && Boolean(errors.location)}
                  value={values.location}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
            <Box textAlign="center">
              <Button type="submit" size="large" variant="contained" color="primary" className={classes.submit}>
                {isSubmitting ? <CircularProgress style={{ color: 'white' }} /> : 'SAVE'}
              </Button>
            </Box>
          </Paper>
        </form>
      )}
    </Formik>
  );
};

export default PersonalInformationForm;
