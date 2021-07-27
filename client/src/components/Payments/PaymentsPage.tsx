import React from 'react';
import Grid from '@material-ui/core/Grid';

import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
// import { BrowserRouter } from 'react-router-dom';

import CardForm from './CardForm';

const stripePromise = loadStripe('pk_test_6pRNASCoBOKtIshFeQd4XMUh');

const PaymentsPage = (): JSX.Element => {
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
