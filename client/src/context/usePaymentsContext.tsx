import { useState, useContext, createContext, FunctionComponent, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { IPaymentMethod } from '../interface/Payments';

interface IPaymentMethodContext {
  paymentMethods: IPaymentMethod[];
}

export const PaymentMethodContext = createContext<IPaymentMethodContext>({
  paymentMethods: [],
});

export const PaymentMethodsProvider: FunctionComponent = ({ children }): JSX.Element => {
  const [paymentMethods, setPaymentMethods] = useState<IPaymentMethod[]>([]);
  const location = useLocation().pathname;

  useEffect(() => {
    const getPaymentMethods = async () => {
      const response = await fetch('/payments/');
      if (response.ok) {
        const data = await response.json();
        setPaymentMethods(data as IPaymentMethod[]);
      }
    };

    if (location.endsWith('/profile') || location.endsWith('payment') || location.endsWith('/new-contest')) {
      getPaymentMethods();
    }
  }, [location]);

  return <PaymentMethodContext.Provider value={{ paymentMethods }}>{children}</PaymentMethodContext.Provider>;
};

export function usePayment(): IPaymentMethodContext {
  return useContext(PaymentMethodContext);
}
