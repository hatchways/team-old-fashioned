import React, { FC, useContext } from 'react';
import { CardNumberElement, CardCvcElement, CardExpiryElement, useStripe, useElements } from '@stripe/react-stripe-js';
import {
  Button,
  Box,
  FormHelperText,
  FormLabel,
  Grid,
  MenuItem,
  Select,
  TextField,
  CircularProgress,
  Typography,
} from '@material-ui/core';
import { useSnackBar } from '../../context/useSnackbarContext';
import { Formik, FormikHelpers } from 'formik';
import setPaymentMethodConfirmed from '../../helpers/APICalls/setPaymentMethodConfirmed';
import { AuthContext } from '../../context/useAuthContext';
import * as Yup from 'yup';

import useStyles from './useStyles';

const STRIPE_ELEMENT_OPTIONS = {
  showIcon: true,
  iconStyle: 'solid',
  style: {
    base: {
      fontSize: '14px',
      color: '#000',
    },
  },
};

interface IPayment {
  name: string;
  line1: string;
  city: string;
  state: string;
  postal_code: string;
}

const PaymentForm: FC = (): JSX.Element => {
  const classes = useStyles();
  const stripe = useStripe();
  const elements = useElements();
  const { updateSnackBarMessage } = useSnackBar();
  const { loggedInUser } = useContext(AuthContext);

  const handleSubmit = async (
    { name, line1, city, state, postal_code }: IPayment,
    { setSubmitting }: FormikHelpers<IPayment>,
  ) => {
    if (!stripe || !elements) {
      return;
    }
    const cardNumberElement = elements.getElement(CardNumberElement);
    if (!cardNumberElement) {
      return;
    }

    const response = await fetch('/payments/secret');
    const { client_secret: clientSecret } = await response.json();
    const result = await stripe.confirmCardSetup(clientSecret, {
      payment_method: {
        card: cardNumberElement,
        billing_details: {
          name: name,
          address: {
            line1,
            city,
            state,
            postal_code,
          },
        },
      },
    });

    if (result.error) {
      const confirmed = await setPaymentMethodConfirmed(false);
      updateSnackBarMessage(result.error.message as string);
    }
    if (result.setupIntent) {
      const confirmed = await setPaymentMethodConfirmed(true);
      updateSnackBarMessage('Payment method accepted');
    }
    setSubmitting(false);
  };

  return loggedInUser && loggedInUser?.payment_method_confirmed ? (
    <Typography>You have confirmed your payment information.</Typography>
  ) : (
    <Formik
      initialValues={{
        name: '',
        line1: '',
        city: '',
        state: '',
        postal_code: '',
      }}
      validationSchema={Yup.object().shape({
        name: Yup.string().required('Name is required'),
        line1: Yup.string().required('Address is required'),
        city: Yup.string().required('City is required'),
        state: Yup.string().required('State is required'),
        postal_code: Yup.string().required('Postal code is required'),
      })}
      onSubmit={handleSubmit}
    >
      {({ handleSubmit, handleChange, values, touched, errors, isSubmitting }) => (
        <form onSubmit={handleSubmit} className={classes.form}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormLabel htmlFor="name">Name</FormLabel>
              <TextField
                id="name"
                name="name"
                variant="outlined"
                fullWidth
                margin="none"
                placeholder="As it appears on card"
                helperText={touched.name ? errors.name : ''}
                error={touched.name && Boolean(errors.name)}
                value={values.name}
                onChange={handleChange}
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <FormLabel htmlFor="line1">Address</FormLabel>
              <TextField
                id="line1"
                name="line1"
                variant="outlined"
                fullWidth
                margin="none"
                placeholder="card billing address"
                helperText={touched.line1 ? errors.line1 : ''}
                error={touched.line1 && Boolean(errors.line1)}
                value={values.line1}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormLabel htmlFor="city">City</FormLabel>
              <TextField
                id="city"
                name="city"
                variant="outlined"
                fullWidth
                margin="none"
                helperText={touched.city ? errors.city : ''}
                error={touched.city && Boolean(errors.city)}
                value={values.city}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <FormLabel htmlFor="name">State</FormLabel>
              <Select
                id="state"
                name="state"
                variant="outlined"
                fullWidth
                margin="none"
                error={touched.state && Boolean(errors.state)}
                value={values.state}
                onChange={handleChange}
              >
                <MenuItem key="1" value="AL">
                  Alaska
                </MenuItem>
                <MenuItem key="2" value="CO">
                  Colorado
                </MenuItem>
              </Select>
              <FormHelperText className={classes.helperTextError}>{touched.state ? errors.state : ''}</FormHelperText>
            </Grid>
            <Grid item xs={12} md={3}>
              <FormLabel htmlFor="postal_code">Postal Code</FormLabel>
              <TextField
                id="postal_code"
                name="postal_code"
                variant="outlined"
                fullWidth
                margin="none"
                helperText={touched.postal_code ? errors.postal_code : ''}
                error={touched.postal_code && Boolean(errors.postal_code)}
                value={values.postal_code}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <FormLabel>Card Details</FormLabel>
              <CardNumberElement
                className={classes.stripeInputContainer}
                options={{
                  showIcon: true,
                  iconStyle: 'solid',
                  style: {
                    base: {
                      fontSize: '14px',
                      color: '#000',
                    },
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CardExpiryElement className={classes.stripeInputContainer} options={STRIPE_ELEMENT_OPTIONS} />
            </Grid>
            <Grid item xs={12} md={6}>
              <CardCvcElement className={classes.stripeInputContainer} options={STRIPE_ELEMENT_OPTIONS} />
            </Grid>
            <Grid item xs={12}>
              <Box textAlign="center">
                <Button
                  type="submit"
                  disabled={!stripe}
                  size="large"
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  {isSubmitting ? <CircularProgress style={{ color: 'white' }} /> : 'SAVE'}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      )}
    </Formik>
  );
};

export default PaymentForm;
