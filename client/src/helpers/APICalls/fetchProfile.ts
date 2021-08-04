import { FetchOptions } from '../../interface/FetchOptions';
import { User } from '../../interface/User';

export async function fetchProfile(username: string): Promise<User> {
  const fetchOptions: FetchOptions = {
    method: 'GET',
    credentials: 'include',
  };
  return await fetch(`/users/${username}`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
}
