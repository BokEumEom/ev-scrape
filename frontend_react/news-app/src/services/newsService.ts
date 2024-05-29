// src/services/newsService.ts
import { axiosInstance } from './apiService';
import { NewsItem } from '@/types';
import { handleApiError } from '@/utils/handleApiError';

// 뉴스 관련 API의 기본 URL
const NEWS_BASE_URL = '/api/v1/news';
// 공지사항 관련 API의 기본 URL
const ANNOUNCEMENTS_BASE_URL = '/api/v1/announcements';
// 기본 페이지 당 항목 수
const DEFAULT_LIMIT = 10;

/**
 * 뉴스 항목을 페이지별로 가져오는 함수
 * @param {number} page - 가져올 페이지 번호 (기본값 1)
 * @param {number} limit - 페이지 당 항목 수 (기본값 10)
 * @returns {Promise<NewsItem[]>} - 뉴스 항목 배열
 */
export const fetchNewsItems = async (page = 1, limit = DEFAULT_LIMIT): Promise<NewsItem[]> => {
  const skip = (page - 1) * limit;
  const url = `${NEWS_BASE_URL}?skip=${skip}&limit=${limit}`;

  try {
    const { data } = await axiosInstance.get(url);
    return data;
  } catch (error) {
    handleApiError(error);
    return []; // 에러 발생 시 빈 배열 반환
  }
};

/**
 * 뉴스 항목을 검색하는 함수
 * @param {string} query - 검색어
 * @param {number} page - 페이지 번호 (기본값 1)
 * @param {number} limit - 페이지 당 항목 수 (기본값 10)
 * @returns {Promise<NewsItem[]>} - 검색된 뉴스 항목 배열
 */
export const searchNewsItems = async (query: string, page = 1, limit = DEFAULT_LIMIT): Promise<NewsItem[]> => {
  const effectiveQuery = query || "default_search_query";
  const skip = (page - 1) * limit;
  const url = `${NEWS_BASE_URL}/search?query=${encodeURIComponent(effectiveQuery)}&skip=${skip}&limit=${limit}`;

  try {
    const { data } = await axiosInstance.get(url);
    return data;
  } catch (error) {
    handleApiError(error);
    return []; // 에러 발생 시 빈 배열 반환
  }
};

/**
 * 뉴스 항목에 투표를 제출하는 함수
 * @param {number} newsId - 뉴스 항목 ID
 * @param {number} voteValue - 투표 값
 * @returns {Promise<NewsItem>} - 업데이트된 뉴스 항목
 * @throws {Error} - 투표 제출 실패 시 에러
 */
export const submitVote = async (newsId: number, voteValue: number): Promise<NewsItem> => {
  const accessToken = localStorage.getItem('accessToken');

  if (!accessToken) {
    throw new Error('No access token available');
  }

  const url = `${NEWS_BASE_URL}/${newsId}/vote`;

  try {
    const { data } = await axiosInstance.post(url, { vote_value: voteValue }, {
      headers: { 'Authorization': `Bearer ${accessToken}` }
    });
    return data;
  } catch (error) {
    handleApiError(error);
    throw new Error('Failed to submit vote');
  }
};

/**
 * 공지사항을 특정 엔드포인트에서 가져오는 함수
 * @param {string} endpoint - 공지사항 엔드포인트
 * @returns {Promise<any>} - 공지사항 데이터
 */
export const fetchAnnouncements = async (endpoint: string): Promise<any> => {
  const url = `${ANNOUNCEMENTS_BASE_URL}/${endpoint}`;
  
  try {
    const { data } = await axiosInstance.get(url);
    return data;
  } catch (error) {
    handleApiError(error);
    return {}; // 에러 발생 시 빈 객체 반환
  }
};
