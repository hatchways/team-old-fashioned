import { FetchOptions } from '../../interface/FetchOptions';
import { ContestAPIResponse } from '../../interface/Contest';

export default async function contestImgSubmitAPI(id: string, data: any): Promise<any> {
  const S3FetchOptions: FetchOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({
      data,
    }),
  };
  return await fetch(`/contest/${id}/submission`, S3FetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: 'Unable to connect to server. Please try again',
    }));
}

export const getUserContests = async (): Promise<ContestAPIResponse> => {
  const fetchOptions: FetchOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  };
  return await fetch(`/contest/contests`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: 'Unable to connect to server. Please try again',
    }));
};
