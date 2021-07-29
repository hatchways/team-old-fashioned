import { FC } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from '../../../components/PaymentForm/PaymentForm';
import PageContainer from '../../../components/PageContainer/PageContainer';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY as string);

const PaymentDetails: FC = (): JSX.Element => {
  return (
    <Elements stripe={stripePromise}>
      <PageContainer titleEl="Payment Details">
        <PaymentForm />
      </PageContainer>
    </Elements>
  );
};

export default PaymentDetails;
