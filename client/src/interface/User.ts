export interface User {
  email: string;
  username: string;
}

export interface SearchUsersApiData {
  users?: User[];
  error?: { message: string };
}

export interface UserPersonalInformation {
  headline: string;
  bio: string;
  location: string;
}
