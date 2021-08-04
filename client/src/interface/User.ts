export interface User {
  email: string;
  username: string;
  headline: string;
  bio: string;
  location: string;
  profilePicUrl: string;
  payment_method_confirmed: boolean;
  coverPhoto: string;
}

export interface SearchUsersApiData {
  users?: User[];
  error?: { message: string };
}

export interface UserApiData {
  error?: { message: string };
  success?: boolean;
  user?: User;
}
