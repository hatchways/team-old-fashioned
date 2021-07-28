import { FC, useState } from 'react';
import {
  CardElement,
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { Button, Box, FormLabel, Grid, MenuItem, Select, TextField } from '@material-ui/core';

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

const PaymentForm: FC = (): JSX.Element => {
  const classes = useStyles();
  const stripe = useStripe();
  const elements = useElements();
  const [state, setState] = useState<string>('');

  const handleStateChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setState(event.target.value as string);
  };

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    // disables submission while stripe / elements haven't been loaded
    if (!stripe || !elements) {
      return;
    }
    // Ensures cardElement is not null
    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      return;
    }

    const response = await fetch('/payments/secret');
    const { client_secret: clientSecret } = await response.json();

    const payload = await stripe.confirmCardSetup(clientSecret, {
      payment_method: {
        card: cardElement,
      },
    });

    console.log('[PaymentMethod]', payload);
  };

  return (
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
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormLabel htmlFor="city">City</FormLabel>
          <TextField id="city" name="city" variant="outlined" fullWidth margin="none" />
        </Grid>
        <Grid item xs={12} md={3}>
          <FormLabel htmlFor="name">State</FormLabel>
          <Select
            id="state"
            name="state"
            variant="outlined"
            fullWidth
            margin="none"
            value={state}
            onChange={handleStateChange}
          >
            <MenuItem key="1" value="AL">
              Alaska
            </MenuItem>
            <MenuItem key="2" value="CO">
              Colorado
            </MenuItem>
          </Select>
        </Grid>
        <Grid item xs={12} md={3}>
          <FormLabel htmlFor="post_code">Postal Code</FormLabel>
          <TextField id="post_code" name="post_code" variant="outlined" fullWidth margin="none" />
        </Grid>
        {/* <Grid item xs={12}>
          <CardElement
            className={classes.foo}
            options={{
              classes: {
                base: classes.bar,
              },
            }}
            onReady={() => {
              console.log('CardElement [ready]');
            }}
            onChange={(event) => {
              console.log('CardElement [change]', event);
            }}
            onBlur={() => {
              console.log('CardElement [blur]');
            }}
            onFocus={() => {
              console.log('CardElement [focus]');
            }}
          />
        </Grid> */}
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
              {/* {isSubmitting ? <CircularProgress style={{ color: 'white' }} /> : 'SAVE'} */}
              SAVE
            </Button>
          </Box>
        </Grid>
      </Grid>
    </form>
  );
};

export default PaymentForm;
