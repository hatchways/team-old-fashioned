import { UserApiData } from '../../interface/User';
import { FetchOptions } from '../../interface/FetchOptions';

const updateProfilePicture = async (url: string): Promise<UserApiData> => {
  const fetchOptions: FetchOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url }),
    credentials: 'include',
  };
  return await fetch(`/users/profile-pic/`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};

export default updateProfilePicture;
