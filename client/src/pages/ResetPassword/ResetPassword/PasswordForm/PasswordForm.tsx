import { Typography, TextField, Box, Grid, Button, CircularProgress, FormLabel } from '@material-ui/core';
import { FormikHelpers, Formik } from 'formik';
import useStyles from './useStyles';
import * as Yup from 'yup';
interface Props {
  handleSubmit: (
    {
      password,
    }: {
      password: string;
    },
    {
      setStatus,
      setSubmitting,
    }: FormikHelpers<{
      password: string;
    }>,
  ) => void;
}

export default function EmailForm({ handleSubmit }: Props): JSX.Element {
  const classes = useStyles();
  return (
    <Formik
      initialValues={{
        password: '',
      }}
      validationSchema={Yup.object().shape({
        password: Yup.string()
          .required('Password is required')
          .max(100, 'Password is too long')
          .min(6, 'Password too short'),
      })}
      onSubmit={handleSubmit}
    >
      {({ handleSubmit, handleChange, values, touched, errors, isSubmitting }) => (
        <form onSubmit={handleSubmit} className={classes.form} noValidate>
          <FormLabel>Password</FormLabel>
          <TextField
            id="password"
            fullWidth
            variant="outlined"
            margin="none"
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              classes: { input: classes.inputs },
            }}
            type="password"
            autoComplete="current-password"
            placeholder="Enter password"
            helperText={touched.password ? errors.password : ''}
            error={touched.password && Boolean(errors.password)}
            value={values.password}
            onChange={handleChange}
          />
          <Box textAlign="center">
            <Button type="submit" size="large" variant="contained" color="primary" className={classes.submit}>
              {isSubmitting ? <CircularProgress style={{ color: 'white' }} /> : 'COMFIRMED'}
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  );
}
