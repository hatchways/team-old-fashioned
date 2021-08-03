import { AuthApiData } from '../../interface/AuthApiData';
import { FetchOptions } from '../../interface/FetchOptions';
import { ContestAPIResponse } from '../../interface/Contest';

export async function createContestAPI(
  title: string,
  description: string,
  prizeAmount: string,
  deadline: Date,
): Promise<any> {
  const ContestfetchOptions: FetchOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, description, prizeAmount, deadline }),
    credentials: 'include',
  };

  return await fetch(`/contest`, ContestfetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
}

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

export async function getAllContests(): Promise<any> {
  const ContestfetchOptions: FetchOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  };
  return await fetch(`/contest/all/contests`, ContestfetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
}

export const getUserContests = async (): Promise<ContestAPIResponse> => {
  const fetchOptions: FetchOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  };
  return await fetch(`/contest/user-contests`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: 'Unable to connect to server. Please try again',
    }));
};

export async function getAllContestsByAdvanceSearch(
  search: string | null,
  title: string | null,
  startTime: Date | null,
  endTime: Date | null,
): Promise<any> {
  const ContestfetchOptions: FetchOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({
      search,
      title,
      startTime,
      endTime,
    }),
  };
  return await fetch(`/contest/all/contests/advanceSearch`, ContestfetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
}
