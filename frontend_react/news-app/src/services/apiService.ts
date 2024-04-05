// src/services/apiService.ts
import axios from 'axios';
import { NewsItem, CommunityPost, CommunityPostCreate, CommunityPostsResponse } from '../types';

export const PAGE_SIZE = 10;

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const fetchNewsItems = async (page = 1, limit = 10) => {
  // Ensure 'page' and 'limit' are positive integers
  page = Math.max(Number(page), 1);
  limit = Math.max(Number(limit), 1);

  const skip = (page - 1) * limit;

  const url = `${API_BASE_URL}/api/v1/news?skip=${skip}&limit=${limit}`;

  try {
    const { data } = await axios.get(url);
    console.log(url); // API 응답 구조 확인
    console.log(data); // API 응답 구조 확인
    return data;
  } catch (error) {
    console.error("Failed to fetch news items:", error);
    throw error;
  }
};

export const fetchAnnouncements = async (endpoint: string) => {
    const url = `${API_BASE_URL}/api/v1/announcements/${endpoint}`;
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.error(`Failed to fetch announcements for ${endpoint}:`, error);
      throw error;
    }
  };

export const searchNewsItems = async (query: string, page: number): Promise<NewsItem[]> => {
  // 검색 쿼리가 빈 문자열인 경우 기본 검색 쿼리를 사용하도록 설정
  const effectiveQuery = query || "default_search_query"; // "default_search_query"는 기본 검색 쿼리로, 실제 사용 사례에 맞게 조정해야 합니다.
  const limit = 10;
  const skip = (page - 1) * limit;
  const url = `${API_BASE_URL}/api/v1/news/search?query=${encodeURIComponent(effectiveQuery)}&skip=${skip}&limit=${limit}`;
  console.log("Requesting URL:", url);

  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Search API error:", error.response?.data || error.message);
    throw error;
  }
};
  
export const fetchCommunityPosts = async (page: number): Promise<CommunityPostsResponse> => {
  const skip = (page - 1) * PAGE_SIZE;
  const url = `${API_BASE_URL}/api/v1/community?skip=${skip}&limit=${PAGE_SIZE}`;
  console.log("Requesting URL:", url);
  const response = await axios.get<{items: CommunityPost[], total: number}>(url);
  return response.data;
};

export const createCommunityPost = async (post: CommunityPostCreate): Promise<void> => {
  const url = `${API_BASE_URL}/api/v1/community`;
  try {
    await axios.post(url, post);
    console.log("Requesting URL:", url);
    // You might want to handle the response here if needed
  } catch (error) {
    console.error('Failed to create community post:', error);
    throw error; // It's good practice to re-throw the error so that it can be caught and handled by the caller
  }
};

export const submitVote = async (newsId: number, voteValue: number): Promise<NewsItem> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/v1/news/${newsId}/vote`, {
      vote_value: voteValue,
    });
    // Assuming the response data is a NewsItem object
    return response.data;
  } catch (error) {
    console.error(`Error submitting vote to ${API_BASE_URL}/api/v1/news/${newsId}/vote:`, error);
    throw error;
  }
};