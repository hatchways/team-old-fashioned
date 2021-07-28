import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

import CardForm from './CardForm';

// const publicKey = process.env.REACT_APP_STRIPE_PUBLIC_KEY;

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY as string);

const PaymentsPage = (): JSX.Element => {
  return (
    <Elements stripe={stripePromise}>
      <CardForm />
    </Elements>
  );
};

export default PaymentsPage;
