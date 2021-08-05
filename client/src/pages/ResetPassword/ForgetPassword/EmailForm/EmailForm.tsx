import { Typography, TextField, Box, Grid, Button, CircularProgress, FormLabel } from '@material-ui/core';
import { FormikHelpers, Formik } from 'formik';
import useStyles from './useStyles';
import * as Yup from 'yup';
interface Props {
  handleSubmit: (
    {
      email,
    }: {
      email: string;
    },
    {
      setStatus,
      setSubmitting,
    }: FormikHelpers<{
      email: string;
    }>,
  ) => void;
}

export default function EmailForm({ handleSubmit }: Props): JSX.Element {
  const classes = useStyles();
  return (
    <Formik
      initialValues={{
        email: '',
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string().required('Email is required').email('Email is not valid'),
      })}
      onSubmit={handleSubmit}
    >
      {({ handleSubmit, handleChange, values, touched, errors, isSubmitting }) => (
        <form onSubmit={handleSubmit} className={classes.form} noValidate>
          <FormLabel>Email</FormLabel>
          <TextField
            id="email"
            fullWidth
            variant="outlined"
            margin="none"
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              classes: { input: classes.inputs },
            }}
            name="email"
            autoComplete="email"
            placeholder="Enter email address"
            autoFocus
            helperText={touched.email ? errors.email : ''}
            error={touched.email && Boolean(errors.email)}
            value={values.email}
            onChange={handleChange}
          />
          <Box textAlign="center">
            <Button type="submit" size="large" variant="contained" color="primary" className={classes.submit}>
              {isSubmitting ? <CircularProgress style={{ color: 'white' }} /> : 'SEND'}
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  );
}
