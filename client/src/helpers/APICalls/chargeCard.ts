import { FetchOptions } from '../../interface/FetchOptions';
import { IPaymentIntent } from '../../interface/Payments';

export default async function chargeCard(contestId: string, cardId: string): Promise<IPaymentIntent> {
  const fetchOptions: FetchOptions = {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ contestId, cardId }),
  };
  return await fetch(`/payments/pay`, fetchOptions)
    .then((res) => res.json())
    .catch((error) => ({ error }));
}
