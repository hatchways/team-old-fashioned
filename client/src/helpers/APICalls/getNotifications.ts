import { FetchOptions } from '../../interface/FetchOptions';
import { Notifications } from '../../interface/Notifications';

export async function getNotifications(): Promise<Notifications> {
  const fetchOptions: FetchOptions = {
    method: 'GET',
    credentials: 'include',
  };
  return await fetch(`/notifications`, fetchOptions)
    .then((res) => {
      return res.json();
    })
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
}
