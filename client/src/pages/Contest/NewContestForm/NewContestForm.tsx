import { useState } from 'react';
import { FunctionComponent } from 'react';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import { Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import Box from '@material-ui/core/Box';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import Grid from '@material-ui/core/Grid';
import { CircularProgress, FormLabel } from '@material-ui/core';
import PreferedDesigns from '../PreferedDesigns/PreferedDesigns';

import useStyles from './useStyles';

interface Props {
  handleSubmit: (
    {
      title,
      description,
      prizeAmount,
      deadline,
      time,
      timezone,
    }: {
      title: string;
      description: string;
      prizeAmount: string;
      deadline: Date;
      time: string;
      timezone: string;
    },
    {
      setSubmitting,
    }: FormikHelpers<{
      title: string;
      description: string;
      prizeAmount: string;
      deadline: Date;
      time: string;
      timezone: string;
    }>,
  ) => void;
}

const NewContestForm: FunctionComponent<Props> = ({ handleSubmit }: Props): JSX.Element => {
  const classes = useStyles();

  const times = [
    '12:00 am',
    '1:00 am',
    '2:00 am',
    '3:00 am',
    '4:00 am',
    '5:00 am',
    '6:00 am',
    '7:00 am',
    '8:00 am',
    '9:00 am',
    '10:00 am',
    '11:00 am',
    '12:00 pm',
    '1:00 pm',
    '2:00 pm',
    '3:00 pm',
    '4:00 pm',
    '5:00 pm',
    '6:00 pm',
    '7:00 pm',
    '8:00 pm',
    '9:00 pm',
    '10:00 pm',
    '11:00 pm',
  ];

  return (
    <Formik
      initialValues={{
        title: '',
        description: '',
        prizeAmount: '',
        deadline: new Date(),
        time: '',
        timezone: '',
      }}
      validationSchema={Yup.object().shape({
        title: Yup.string().required('Title is required'),
        description: Yup.string().required('Description is required'),
        prizeAmount: Yup.number().required('Prize amount is required').min(1).max(1000000),
        deadline: Yup.date().required('Date is required'),
      })}
      onSubmit={handleSubmit}
    >
      {({ handleSubmit, handleChange, values, touched, errors, isSubmitting, setFieldValue }) => (
        <form onSubmit={handleSubmit} className={classes.form} noValidate>
          <Grid container direction="row" justify="center" spacing={4}>
            <Grid item xs={11} md={9}>
              <FormLabel htmlFor="title">What do you need designed?</FormLabel>
              <TextField
                id="title"
                variant="outlined"
                fullWidth
                margin="none"
                name="title"
                placeholder="Write a descriptive contest title"
                autoFocus
                helperText={touched.title ? errors.title : ''}
                error={touched.title && Boolean(errors.title)}
                value={values.title}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={11} md={9}>
              <FormLabel htmlFor="description">Description</FormLabel>
              <TextField
                id="description"
                multiline
                variant="outlined"
                fullWidth
                margin="none"
                name="description"
                placeholder="Details about what type of tattoo you want"
                rows={4}
                helperText={touched.description ? errors.description : ''}
                error={touched.description && Boolean(errors.description)}
                value={values.description}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={11} md={9}>
              <Grid container spacing={4}>
                <Grid item xs={12} md={4}>
                  <FormLabel htmlFor="prizeAmount">Prize amount</FormLabel>
                  <OutlinedInput
                    id="prizeAmount"
                    fullWidth
                    type="number"
                    inputProps={{
                      min: '1',
                      max: '1000000',
                    }}
                    margin="none"
                    name="prizeAmount"
                    placeholder="100.00"
                    startAdornment={<InputAdornment position="start">$</InputAdornment>}
                    error={touched.prizeAmount && Boolean(errors.prizeAmount)}
                    value={values.prizeAmount}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} md={8}>
                  <FormLabel htmlFor="date">Deadline</FormLabel>
                  <Grid container spacing={4}>
                    <Grid item xs={12} md={6}>
                      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                          disableToolbar
                          variant="inline"
                          format="dd MMM yyyy"
                          margin="none"
                          id="date"
                          name="date"
                          fullWidth
                          inputVariant="outlined"
                          value={values.deadline}
                          KeyboardButtonProps={{
                            'aria-label': 'change date',
                          }}
                          onChange={(date) => setFieldValue('deadline', date)}
                        />
                      </MuiPickersUtilsProvider>
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <Select fullWidth id="time" margin="none" name="time" variant="outlined" defaultValue="">
                        {times.map((t) => (
                          <MenuItem key={t} value={t}>
                            {t}
                          </MenuItem>
                        ))}
                      </Select>
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <Select fullWidth id="timezone" margin="none" name="timezone" variant="outlined" defaultValue="">
                        <MenuItem key="EST" value="EST">
                          EST
                        </MenuItem>
                        <MenuItem key="MST" value="MST">
                          MST
                        </MenuItem>
                        <MenuItem key="PDT" value="PDT">
                          PDT
                        </MenuItem>
                      </Select>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={11} md={9}>
              <PreferedDesigns />
            </Grid>
          </Grid>
          <Box textAlign="center">
            <Button type="submit" size="large" variant="contained" color="primary" className={classes.submit}>
              {isSubmitting ? <CircularProgress style={{ color: 'white' }} /> : 'CREATE CONTEST'}
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default NewContestForm;
