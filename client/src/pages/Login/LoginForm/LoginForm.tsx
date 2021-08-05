import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import { Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import Typography from '@material-ui/core/Typography';
import useStyles from './useStyles';
import { CircularProgress, Grid, Link } from '@material-ui/core';
import { demoValues } from '../../../helpers/demovalues';
import { Link as RouterLink } from 'react-router-dom';

interface Props {
  handleSubmit: (
    {
      email,
      password,
    }: {
      email: string;
      password: string;
    },
    {
      setStatus,
      setSubmitting,
    }: FormikHelpers<{
      email: string;
      password: string;
    }>,
  ) => void;
}

export default function Login({ handleSubmit }: Props): JSX.Element {
  const classes = useStyles();
  let demo = false;

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string().required('Email is required').email('Email is not valid'),
        password: Yup.string()
          .required('Password is required')
          .max(100, 'Password is too long')
          .min(6, 'Password too short'),
      })}
      onSubmit={handleSubmit}
    >
      {({ handleSubmit, handleChange, values, touched, errors, isSubmitting }) => (
        <form onSubmit={handleSubmit} className={classes.form} noValidate>
          <label htmlFor="email">{<Typography className={classes.label}>E-mail</Typography>}</label>
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
            placeholder="Enter e-mail address"
            autoFocus
            helperText={touched.email ? errors.email : ''}
            error={touched.email && Boolean(errors.email)}
            value={values.email}
            onChange={handleChange}
          />
          <label htmlFor="password">{<Typography className={classes.label}>Password</Typography>}</label>
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
            <Grid item xs>
              <Link component={RouterLink} to="/forget-password" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Button type="submit" size="large" variant="contained" color="primary" className={classes.submit}>
              {!demo && isSubmitting ? <CircularProgress style={{ color: 'white' }} /> : 'SIGN IN'}
            </Button>
            <Button
              type="submit"
              size="large"
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={() => {
                values.email = demoValues.email;
                values.password = demoValues.password;
                demo = true;
              }}
            >
              {demo && isSubmitting ? <CircularProgress style={{ color: 'white' }} /> : 'Use Demo'}
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  );
}
