import { FetchOptions } from '../../interface/FetchOptions';

export default async function sendResetEmailAPI(email: string): Promise<any> {
  const emailFetchOptions: FetchOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({
      email,
    }),
  };
  return await fetch(`/email/send-email/reset-password`, emailFetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: 'Unable to connect to server. Please try again',
    }));
}

export async function resetPasswordAPI(token: string, password: string): Promise<any> {
  const emailFetchOptions: FetchOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({
      token,
      password,
    }),
  };
  return await fetch(`/auth/reset-password`, emailFetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: 'Unable to connect to server. Please try again',
    }));
}
