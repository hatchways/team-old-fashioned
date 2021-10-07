import { FetchOptions } from '../../interface/FetchOptions';
import { Rating } from '../../interface/Ratings';

export async function fetchRatings(artistUsername: string): Promise<Rating[]> {
  const fetchOptions: FetchOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  };
  return await fetch(`/ratings/${artistUsername}`, fetchOptions)
    .then((res) => res.json())
    .catch((error) => {
      console.log(error);
    });
}
