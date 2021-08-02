import { AuthApiDataSuccess } from '../../interface/AuthApiData';
import { FetchOptions } from '../../interface/FetchOptions';

const updateProfilePhoto = async (imageType: string, url: string): Promise<AuthApiDataSuccess> => {
  const fetchOptions: FetchOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ imageType, url }),
    credentials: 'include',
  };
  return await fetch(`/users/profile-photo/`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};

export default updateProfilePhoto;
