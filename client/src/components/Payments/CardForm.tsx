import React from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';

const CardForm = (): JSX.Element => {
  const stripe = useStripe();
  const elements = useElements();

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
    <form onSubmit={handleSubmit}>
      <label>
        Card details
        <CardElement
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
      </label>
      <button type="submit" disabled={!stripe}>
        Save
      </button>
    </form>
  );
};

export default CardForm;
