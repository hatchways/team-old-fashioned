import React from 'react';
import Grid from '@material-ui/core/Grid';

import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

import CardForm from './CardForm';

const PaymentsPage = (): JSX.Element => {
  const makeStripePromise = async () => {
    const response = await fetch('/payments/public-key');
    const { public_key: publicKey } = await response.json();
    return await loadStripe(publicKey.toString());
  };

  const stripePromise = makeStripePromise();
  return (
    <Grid container component="main">
      <Grid item xs={12} sm={10} md={8}>
        <Elements stripe={stripePromise}>
          <CardForm />
        </Elements>
      </Grid>
    </Grid>
  );
};

// const rootElement = document.getElementById('root');

// ReactDOM.render(<App />, rootElement);

export default PaymentsPage;
