import { Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import SearchIcon from '@material-ui/icons/Search';
import { Box, Button, CircularProgress, InputBase, TextField } from '@material-ui/core';
import useStyles from './useStyles';
interface Props {
  handleSimpleSubmit: (
    {
      search,
    }: {
      search: string;
    },
    {
      setSubmitting,
    }: FormikHelpers<{
      search: string;
    }>,
  ) => void;
}
export default function SimpleSearch({ handleSimpleSubmit }: Props): JSX.Element {
  const classes = useStyles();
  return (
    <Formik
      initialValues={{ search: '' }}
      validationSchema={Yup.object().shape({
        search: Yup.string(),
      })}
      onSubmit={handleSimpleSubmit}
    >
      {({ handleSubmit, handleChange, values, touched, errors, isSubmitting }) => (
        <form onSubmit={handleSubmit} noValidate>
          <Box display="flex" flexGrow={1}>
            <Box position="relative" display="flex" alignItems="center">
              <Box position="absolute" justifyContent="center">
                <SearchIcon />
              </Box>
              <InputBase
                id="search"
                fullWidth
                margin="none"
                name="search"
                placeholder="Search title..."
                autoFocus
                error={touched.search && Boolean(errors.search)}
                value={values.search}
                onChange={handleChange}
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
              />
            </Box>
            <Box textAlign="center">
              <Button type="submit" variant="outlined">
                {isSubmitting ? <CircularProgress style={{ color: 'white' }} /> : 'Search'}
              </Button>
            </Box>
          </Box>
        </form>
      )}
    </Formik>
  );
}
