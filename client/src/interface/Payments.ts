export interface IPaymentMethod {
  id: string;
  card: { brand: string; last4: string; exp_month: number; exp_year: number };
}
