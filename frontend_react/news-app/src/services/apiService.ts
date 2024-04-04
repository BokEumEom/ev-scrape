// src/services/apiService.ts
import axios from 'axios';
import { NewsItem, CommunityPost, CommunityPostCreate } from '../types';

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
  const limit = 10;
  const skip = (page - 1) * limit;
  const url = `${API_BASE_URL}/api/v1/news/search?query=${encodeURIComponent(query)}&skip=${skip}&limit=${limit}`;
  console.log("Requesting URL:", url); // Add this line to log the URL
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Search API error:", error);
    throw error;
  }
};  

export const fetchCommunityPosts = async (page: number, limit: number = PAGE_SIZE): Promise<CommunityPost[]> => {
  const skip = (page - 1) * limit;
  const url = `${API_BASE_URL}/api/v1/community?skip=${skip}&limit=${limit}`;
  const response = await axios.get<CommunityPost[]>(url);
  return response.data;
};

// In your apiService.ts
export const createCommunityPost = async (post: CommunityPostCreate): Promise<void> => {
  const url = `${API_BASE_URL}/api/v1/community`;
  try {
    await axios.post(url, post);
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