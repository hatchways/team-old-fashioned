import React from 'react';
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
    <Elements stripe={stripePromise}>
      <CardForm />
    </Elements>
  );
};

export default PaymentsPage;
