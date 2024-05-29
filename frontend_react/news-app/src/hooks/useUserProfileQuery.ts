// src/hooks/useUserProfileQuery.ts
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { getUserProfile, signOutUser } from '@/services/userService';
import { UserProfile as UserProfileType, User } from '@/types';

const USER_PROFILE_QUERY_KEY = 'userProfile';

// 사용자 프로필을 변환하는 함수
const transformUserProfile = (user: User): UserProfileType => ({
  avatarUrl: user.avatarUrl,
  name: user.username,  // username을 name으로 매핑
  joinDate: user.joinDate,
  postsCount: user.postsCount,
  followersCount: user.followersCount,
  followingCount: user.followingCount,
});

// 사용자 프로필을 가져오는 커스텀 훅
const useUserProfileQuery = (): UseQueryResult<UserProfileType, Error> => {
  return useQuery<UserProfileType, Error>({
    queryKey: [USER_PROFILE_QUERY_KEY],
    queryFn: async (): Promise<UserProfileType> => {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        throw new Error('No access token available');
      }
      const userProfile = await getUserProfile();
      return transformUserProfile(userProfile);
    },
    onError: (error: Error) => {
      console.error('Error fetching user profile:', error);
    },
    retry: false,
  });
};

// 로그아웃을 처리하는 커스텀 훅
const useHandleSignOut = () => {
  const navigate = useNavigate(); // useNavigate 훅 사용
  return () => {
    signOutUser();
    localStorage.removeItem('accessToken');
    navigate('/signin'); // 로그아웃 후 로그인 페이지로 이동
  };
};

export { useUserProfileQuery, useHandleSignOut };
