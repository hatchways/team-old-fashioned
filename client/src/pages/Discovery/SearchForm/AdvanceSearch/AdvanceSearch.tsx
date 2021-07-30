import {
  InputBase,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  DialogActions,
  Grid,
} from '@material-ui/core';
import { FormikHelpers, Formik } from 'formik';
import * as Yup from 'yup';
import useStyles from './useStyles';
import SearchIcon from '@material-ui/icons/Search';
import { useState } from 'react';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';

interface Props {
  handleSubmit: (
    {
      title,
      startTime,
      endTime,
    }: {
      title: string;
      startTime: Date;
      endTime: Date;
    },
    {
      setSubmitting,
    }: FormikHelpers<{
      title: string;
      startTime: Date;
      endTime: Date;
    }>,
  ) => void;
}

export default function AdvanceSearch({ handleSubmit }: Props): JSX.Element {
  const classes = useStyles();
  const [open, setOpen] = useState<boolean>(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Formik
      initialValues={{ title: '', startTime: new Date(), endTime: new Date() }}
      validationSchema={Yup.object().shape({
        search: Yup.string(),
      })}
      onSubmit={handleSubmit}
    >
      {({ handleSubmit, handleChange, values, touched, errors, isSubmitting, setFieldValue }) => (
        <div>
          <Button variant="outlined" color="primary" onClick={handleClickOpen}>
            Advance Search
          </Button>
          <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <form onSubmit={handleSubmit} noValidate>
              <DialogTitle id="form-dialog-title">Advance Search</DialogTitle>
              <DialogContent>
                <TextField
                  id="title"
                  fullWidth
                  margin="none"
                  name="title"
                  placeholder="title"
                  autoFocus
                  error={touched.title && Boolean(errors.title)}
                  value={values.title}
                  onChange={handleChange}
                />
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <Grid container justifyContent="space-around">
                    <KeyboardDatePicker
                      disableToolbar
                      variant="inline"
                      format="MM/dd/yyyy"
                      margin="normal"
                      id="startTime"
                      name="startTime"
                      label="Start Date"
                      fullWidth
                      value={values.startTime}
                      KeyboardButtonProps={{
                        'aria-label': 'change date',
                      }}
                      onChange={(date) => setFieldValue('startTime', date)}
                    />
                    <KeyboardDatePicker
                      disableToolbar
                      variant="inline"
                      format="MM/dd/yyyy"
                      margin="normal"
                      id="endTime"
                      name="endTime"
                      label="End Date"
                      fullWidth
                      value={values.endTime}
                      KeyboardButtonProps={{
                        'aria-label': 'change date',
                      }}
                      onChange={(date) => setFieldValue('endTime', date)}
                    />
                  </Grid>
                </MuiPickersUtilsProvider>
              </DialogContent>
              <DialogActions>
                <Box>
                  <Button type="submit" variant="contained" color="primary">
                    {isSubmitting ? <CircularProgress style={{ color: 'white' }} /> : 'Search'}
                  </Button>
                </Box>
              </DialogActions>
            </form>
          </Dialog>
        </div>
      )}
    </Formik>
  );
}
