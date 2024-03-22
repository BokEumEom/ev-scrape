// In src/services/userService.ts
import axios from 'axios';
import { UserProfile } from '../types';

// Mock user data
const mockUser: UserProfile = {
  name: 'John Doe',
  email: 'johndoe@example.com',
  avatarUrl: 'https://via.placeholder.com/150',
};

export const getUserProfile = async (): Promise<UserProfile> => {
  // Here you would make an actual API call
  // const response = await axios.get<UserProfile>('/api/user/profile');
  // return response.data;

  // For now, returning mock data
  return Promise.resolve(mockUser);
};

export const signOutUser = async (): Promise<void> => {
  // Here you would make an actual sign-out API call
  // await axios.post('/api/auth/signout');

  console.log('User signed out');
  // Perform further cleanup if necessary, like redirecting
};
