import { UserApiData } from '../../interface/User';
import { FetchOptions } from '../../interface/FetchOptions';

const updatePersonalInformation = async (
  email: string,
  headline: string,
  bio: string,
  location: string,
): Promise<UserApiData> => {
  const fetchOptions: FetchOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, headline, bio, location }),
    credentials: 'include',
  };
  return await fetch(`/users/info/`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};

export default updatePersonalInformation;
