import { User } from '../interface/User';

const mockLoggedInUser: User = {
  email: 'mockLoggedInUser@gmail.com',
  username: 'mock LoggedIn user',
  headline: 'headline',
  bio: 'bio',
  location: 'location',
  profilePicUrl: 'foo',
  payment_method_confirmed: false,
  coverPhoto: 'foo',
};

const mockOtherUser1: User = {
  username: 'Mock test user 1',
  email: 'mockTestUser1@gmail.com',
  headline: 'headline 1',
  bio: 'bio 1',
  location: 'location 1',
  profilePicUrl: 'foo',
  payment_method_confirmed: false,
  coverPhoto: 'foo',
};
const mockOtherUser2: User = {
  username: 'Mock test user 2',
  email: 'mockTestUser2@gmail.com',
  headline: 'headline 2',
  bio: 'bio 2',
  location: 'location 2',
  profilePicUrl: 'foo',
  payment_method_confirmed: true,
  coverPhoto: 'foo',
};
const mockOtherUser3: User = {
  username: 'Mock test user 3',
  email: 'mockTestUser3@gmail.com',
  headline: 'headline 3',
  bio: 'bio 3',
  location: 'location 3',
  profilePicUrl: 'foo',
  payment_method_confirmed: true,
  coverPhoto: 'foo',
};

const mockOtherUsers: User[] = [mockOtherUser1, mockOtherUser2, mockOtherUser3];

export { mockLoggedInUser, mockOtherUsers };
