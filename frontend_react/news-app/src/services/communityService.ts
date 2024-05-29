// src/services/communityService.ts
import { axiosInstance } from './apiService';
import { PAGE_SIZE } from '@/constants/constants';
import { CommunityPost, CommunityPostCreate, CommunityPostsResponse, Comments } from '@/types';
import { handleApiError } from '@/utils/handleApiError';

// 커뮤니티 관련 API의 기본 URL
const COMMUNITY_BASE_URL = '/api/v1/community';

// 인증 헤더를 반환하는 함수
const AUTH_HEADER = () => {
  const accessToken = localStorage.getItem('accessToken');
  if (!accessToken) {
    throw new Error('No access token available');
  }
  return { 'Authorization': `Bearer ${accessToken}` };
};

/**
 * 커뮤니티 게시글 목록을 가져오는 함수
 * @param {number} page - 가져올 페이지 번호
 * @returns {Promise<CommunityPostsResponse>} - 커뮤니티 게시글 목록과 총 개수
 */
export const fetchCommunityPosts = async (page: number): Promise<CommunityPostsResponse> => {
  const skip = (page - 1) * PAGE_SIZE;
  const url = `${COMMUNITY_BASE_URL}?skip=${skip}&limit=${PAGE_SIZE}`;

  try {
    const { data } = await axiosInstance.get(url);
    return data;
  } catch (error) {
    handleApiError(error);
    return { items: [], total: 0 }; // 에러 발생 시 기본값 반환
  }
};

/**
 * 새로운 커뮤니티 게시글을 생성하는 함수
 * @param {CommunityPostCreate} post - 생성할 게시글 데이터
 * @returns {Promise<void>} - 생성된 게시글 데이터
 * @throws {Error} - 게시글 생성 실패 시 에러
 */
export const createCommunityPost = async (post: CommunityPostCreate): Promise<void> => {
  try {
    await axiosInstance.post(COMMUNITY_BASE_URL, post, {
      headers: AUTH_HEADER()
    });
  } catch (error) {
    handleApiError(error);
    throw new Error('Failed to create community post');
  }
};

/**
 * 특정 커뮤니티 게시글의 상세 정보를 가져오는 함수
 * @param {number} postId - 게시글 ID
 * @returns {Promise<CommunityPost>} - 커뮤니티 게시글 상세 정보
 * @throws {Error} - 게시글 정보 가져오기 실패 시 에러
 */
export const fetchCommunityPostDetails = async (postId: number): Promise<CommunityPost> => {
  const url = `${COMMUNITY_BASE_URL}/${postId}`;

  try {
    const { data } = await axiosInstance.get(url);
    return data;
  } catch (error) {
    handleApiError(error);
    throw new Error('Failed to fetch community post details');
  }
};

/**
 * 특정 커뮤니티 게시글을 업데이트하는 함수
 * @param {number} postId - 게시글 ID
 * @param {Partial<CommunityPost>} postData - 업데이트할 게시글 데이터
 * @returns {Promise<CommunityPost>} - 업데이트된 커뮤니티 게시글 데이터
 * @throws {Error} - 게시글 업데이트 실패 시 에러
 */
export const updateCommunityPost = async (postId: number, postData: Partial<CommunityPost>): Promise<CommunityPost> => {
  const url = `${COMMUNITY_BASE_URL}/${postId}`;

  try {
    const { data } = await axiosInstance.put(url, postData, {
      headers: AUTH_HEADER()
    });
    return data;
  } catch (error) {
    handleApiError(error);
    throw new Error('Failed to update community post');
  }
};

/**
 * 특정 커뮤니티 게시글을 좋아요 처리하는 함수
 * @param {number} postId - 게시글 ID
 * @returns {Promise<CommunityPost>} - 업데이트된 커뮤니티 게시글 데이터
 * @throws {Error} - 게시글 좋아요 실패 시 에러
 */
export const likeCommunityPost = async (postId: number): Promise<CommunityPost> => {
  const url = `${COMMUNITY_BASE_URL}/${postId}/like`;

  try {
    const { data } = await axiosInstance.post(url, {}, {
      headers: AUTH_HEADER()
    });
    return data;
  } catch (error) {
    handleApiError(error);
    throw new Error('Failed to like community post');
  }
};

/**
 * 특정 커뮤니티 게시글에 대한 댓글 목록을 가져오는 함수
 * @param {number} postId - 게시글 ID
 * @returns {Promise<Comment[]>} - 댓글 목록
 * @throws {Error} - 댓글 목록 가져오기 실패 시 에러
 */
export const fetchCommentsByPostId = async (postId: number): Promise<Comment[]> => {
  const url = `${COMMUNITY_BASE_URL}/${postId}/comments`;

  try {
    const { data } = await axiosInstance.get(url);
    return data;
  } catch (error) {
    handleApiError(error);
    return []; // 에러 발생 시 기본값 반환
  }
};

/**
 * 특정 커뮤니티 게시글에 댓글을 생성하는 함수
 * @param {number} postId - 게시글 ID
 * @param {string} content - 댓글 내용
 * @returns {Promise<Comment>} - 생성된 댓글 데이터
 * @throws {Error} - 댓글 생성 실패 시 에러
 */
export const createComment = async (postId: number, content: string): Promise<Comment> => {
  const url = `${COMMUNITY_BASE_URL}/${postId}/comments`;

  try {
    const { data } = await axiosInstance.post(url, { content }, {
      headers: AUTH_HEADER()
    });
    return data;
  } catch (error) {
    handleApiError(error);
    throw new Error('Failed to create comment');
  }
};
