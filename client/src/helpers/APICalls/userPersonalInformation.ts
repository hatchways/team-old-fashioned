import { UserPersonalInformation } from '../../interface/User';
import { FetchOptions } from '../../interface/FetchOptions';

const userPersonalInformation = async (): Promise<UserPersonalInformation> => {
  const fetchOptions: FetchOptions = {
    method: 'GET',
    credentials: 'include',
  };
  return await fetch(`/users/info/1`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};

export default userPersonalInformation;
