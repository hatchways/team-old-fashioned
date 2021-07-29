import { FetchOptions } from '../../interface/FetchOptions';

export async function getAllSubmissions(id: string): Promise<any> {
  const SubmissionsFetchOptions: FetchOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  };

  return await fetch(`/submission/${id}`, SubmissionsFetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
}
