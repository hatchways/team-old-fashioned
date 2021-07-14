import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import { Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import Typography from '@material-ui/core/Typography';
import useStyles from './useStyles';
import { CircularProgress } from '@material-ui/core';
import { demoValues } from '../../../helpers/demovalues';
import login from '../../../helpers/APICalls/login';
import { useAuth } from '../../../context/useAuthContext';
import { useSnackBar } from '../../../context/useSnackbarContext';

interface Props {
  handleSubmit: (
    {
      username,
      email,
      password,
    }: {
      email: string;
      password: string;
      username: string;
    },
    {
      setStatus,
      setSubmitting,
    }: FormikHelpers<{
      email: string;
      password: string;
      username: string;
    }>,
  ) => void;
}

const SignUpForm = ({ handleSubmit }: Props): JSX.Element => {
  const classes = useStyles();
  const { updateLoginContext } = useAuth();
  const { updateSnackBarMessage } = useSnackBar();
  let demo = false;
  const demoLogin = () => {
    login(demoValues.email, demoValues.password).then((data) => {
      if (data.error) {
        updateSnackBarMessage(data.error.message);
      } else if (data.success) {
        updateLoginContext(data.success);
        demo = true;
      } else {
        // Catchall for unknown issues
        console.error({ data });
        updateSnackBarMessage('An unexpected error occurred. Please try again');
      }
    });
  };

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
        username: '',
      }}
      validationSchema={Yup.object().shape({
        username: Yup.string().required('Username is required').max(40, 'Username is too long'),
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
          <label htmlFor="username">{<Typography className={classes.label}>E-mail</Typography>}</label>
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
          <label htmlFor="username">{<Typography className={classes.label}>Name</Typography>}</label>
          <TextField
            id="username"
            fullWidth
            variant="outlined"
            margin="none"
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              classes: { input: classes.inputs },
            }}
            name="username"
            autoComplete="username"
            placeholder="Enter your name"
            helperText={touched.username ? errors.username : ''}
            error={touched.username && Boolean(errors.username)}
            value={values.username}
            onChange={handleChange}
          />
          <label htmlFor="username">{<Typography className={classes.label}>Password</Typography>}</label>
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
              {!demo && isSubmitting ? <CircularProgress style={{ color: 'white' }} /> : 'SIGN UP'}
            </Button>
            <Button
              // disables formik validation
              type="button"
              size="large"
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={demoLogin}
            >
              {demo ? <CircularProgress style={{ color: 'white' }} /> : 'Use Demo'}
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default SignUpForm;
