import { FC, useEffect, useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from '../../../components/PaymentForm/PaymentForm';
import PaymentMethods from '../../../components/PaymentMethods/PaymentMethods';
import PageContainer from '../../../components/PageContainer/PageContainer';
import { IPaymentMethod } from '../../../interface/Payments';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY as string);

const PaymentDetails: FC = (): JSX.Element => {
  const [paymentMethods, setPaymentMethods] = useState<IPaymentMethod[]>();
  useEffect(() => {
    const getPaymentMethods = async () => {
      const response = await fetch('/payments/');
      if (response.ok) {
        const data = await response.json();
        setPaymentMethods(data as IPaymentMethod[]);
      }
    };
    getPaymentMethods();
  }, [setPaymentMethods]);
  return (
    <Elements stripe={stripePromise}>
      <PageContainer titleEl="Payment Details">
        {paymentMethods && paymentMethods.length > 0 ? (
          <PaymentMethods paymentMethods={paymentMethods} />
        ) : (
          <PaymentForm />
        )}
      </PageContainer>
    </Elements>
  );
};

export default PaymentDetails;
