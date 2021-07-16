import { FetchOptions } from '../../interface/FetchOptions';

export default async function submissionAPI(data: any): Promise<any> {
  const S3FetchOptions: FetchOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({
      data,
    }),
  };
  return await fetch(`/submission`, S3FetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: 'Unable to connect to server. Please try again',
    }));
}
