// src/services/userService.ts
import { axiosInstance } from './apiService';
import { API_BASE_URL, PAGE_SIZE } from '@/constants/constants';
import { User, CommunityPostsResponse, CommunityPost, SignInParams, SignUpParams } from '@/types';
import { handleApiError } from '@/utils/handleApiError';

// 상수 정의
const GITHUB_AUTH_URL = `${API_BASE_URL}/api/v1/users/auth/github`;
const GITHUB_CALLBACK_URL = '/api/v1/users/auth/github/callback?code=';
const SIGNUP_URL = '/api/v1/users/signup';
const LOGIN_URL = '/api/v1/users/login';
const LOGOUT_URL = '/api/v1/users/logout';
const PROFILE_URL = '/api/v1/users/profile';
const USER_POSTS_URL = '/api/v1/community/user/posts';

/**
 * GitHub 로그인 URL을 반환하는 함수
 * @returns {string} - GitHub 로그인 URL
 */
export const getGitHubLoginUrl = (): string => GITHUB_AUTH_URL;

/**
 * GitHub 인증 콜백을 처리하는 함수
 * @param {string} code - GitHub에서 제공된 인증 코드
 * @returns {Promise<User>} - 인증된 사용자 정보
 * @throws {Error} - GitHub 인증 실패 시 에러
 */
export const handleGitHubCallback = async (code: string): Promise<User> => {
  try {
    const response = await axiosInstance.get(`${GITHUB_CALLBACK_URL}${code}`);
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw new Error('GitHub authentication failed');
  }
};

/**
 * 사용자를 등록하는 함수
 * @param {SignUpParams} param0 - 이메일, 비밀번호, 사용자명
 * @returns {Promise<User>} - 등록된 사용자 정보
 * @throws {Error} - 사용자 등록 실패 시 에러
 */
export const signUpUser = async ({ email, password, username }: SignUpParams): Promise<User> => {
  try {
    const response = await axiosInstance.post(SIGNUP_URL, { email, password, username });
    return response.data;
  } catch (error) {
    handleApiError(error);
    const errorData = error.response?.data;
    throw new Error(errorData?.detail || 'Failed to sign up');
  }
};

/**
 * 사용자를 로그인하는 함수
 * @param {SignInParams} param0 - 이메일, 비밀번호
 * @returns {Promise<User>} - 로그인된 사용자 정보
 * @throws {Error} - 로그인 실패 시 에러
 */
export const signInUser = async ({ email, password }: SignInParams): Promise<User> => {
  try {
    const formData = new URLSearchParams();
    formData.append('username', email);
    formData.append('password', password);

    const response = await axiosInstance.post(LOGIN_URL, formData.toString(), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    if (response.data.access_token) {
      localStorage.setItem('accessToken', response.data.access_token);
    }

    return response.data;
  } catch (error) {
    handleApiError(error);
    throw new Error('Failed to sign in');
  }
};

/**
 * 사용자를 로그아웃하는 함수
 * @returns {Promise<void>}
 * @throws {Error} - 로그아웃 실패 시 에러
 */
export const signOutUser = async (): Promise<void> => {
  try {
    await axiosInstance.post(LOGOUT_URL);
    localStorage.removeItem('accessToken');
  } catch (error) {
    handleApiError(error);
    throw new Error('Failed to sign out');
  }
};

/**
 * 사용자 프로필을 가져오는 함수
 * @returns {Promise<User>} - 사용자 프로필 정보
 * @throws {Error} - 사용자 프로필 가져오기 실패 시 에러
 */
export const getUserProfile = async (): Promise<User> => {
  const accessToken = localStorage.getItem('accessToken');
  if (!accessToken) {
    throw new Error('No access token available');
  }

  try {
    const response = await axiosInstance.get(PROFILE_URL, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    if (error.response?.status === 401) {
      localStorage.removeItem('accessToken');
      window.location.href = '/signin'; // 로그인 페이지로 리다이렉트
    }
    handleApiError(error);
    throw new Error('Failed to fetch user profile');
  }
};

/**
 * 사용자가 작성한 게시글 목록을 가져오는 함수
 * @param {number} page - 페이지 번호 (기본값 1)
 * @returns {Promise<CommunityPostsResponse>} - 게시글 목록과 총 개수
 * @throws {Error} - 게시글 목록 가져오기 실패 시 에러
 */
export const fetchUserPosts = async (page = 1): Promise<CommunityPostsResponse> => {
  const skip = (page - 1) * PAGE_SIZE;
  const url = `${USER_POSTS_URL}?skip=${skip}&limit=${PAGE_SIZE}`;
  const accessToken = localStorage.getItem('accessToken');

  if (!accessToken) {
    throw new Error('No access token available');
  }

  try {
    const response = await axiosInstance.get<{ items: CommunityPost[], total: number }>(url, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    handleApiError(error);
    return { items: [], total: 0 }; // 에러 발생 시 기본값 반환
  }
};
