import { FC, useEffect, useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from '../../../components/PaymentForm/PaymentForm';
import PageContainer from '../../../components/PageContainer/PageContainer';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY as string);

const PaymentDetails: FC = (): JSX.Element => {
  const [paymentMethods, setPaymentMethods] = useState();
  useEffect(() => {
    const getPaymentMethods = async () => {
      const response = await fetch('/payments/');
      if (response.ok) {
        const data = await response.json();
        return data;
      }
    };
    //setPaymentMethods(getPaymentMethods());
  }, [setPaymentMethods]);
  return (
    <Elements stripe={stripePromise}>
      <PageContainer titleEl="Payment Details">
        <PaymentForm />
      </PageContainer>
    </Elements>
  );
};

export default PaymentDetails;
