import { useState, useContext, createContext, FunctionComponent, useEffect } from 'react';
import { IPaymentMethod } from '../interface/Payments';

interface IPaymentMethodContext {
  paymentMethods: IPaymentMethod[];
}

export const PaymentMethodContext = createContext<IPaymentMethodContext>({
  paymentMethods: [],
});

export const PaymentMethodsProvider: FunctionComponent = ({ children }): JSX.Element => {
  const [paymentMethods, setPaymentMethods] = useState<IPaymentMethod[]>([]);

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

  return <PaymentMethodContext.Provider value={{ paymentMethods }}>{children}</PaymentMethodContext.Provider>;
};

export function useContest(): IPaymentMethodContext {
  return useContext(PaymentMethodContext);
}
