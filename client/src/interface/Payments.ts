export interface IPaymentMethod {
  id: string;
  card: { brand: string; last4: string; exp_month: number; exp_year: number };
}

export interface IPaymentIntent {
  id: string;
  amount: number;
  amount_received: number;
  currency: string;
  payment_method: string;
  status: string;
}
