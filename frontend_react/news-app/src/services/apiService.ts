// src/services/apiService.ts
import axios from 'axios';
import { NewsItem } from '../types';

export const API_BASE_URL = 'http://localhost:8000';
export const PUBLIC_API_BASE_URL = 'https://fastapi.watercharging.com';

export const fetchNewsItems = async (page: number = 1, limit: number = 10): Promise<NewsItem[]> => {
  const skip = (page - 1) * limit; // Calculate the correct skip value
  const url = `${PUBLIC_API_BASE_URL}/news?skip=${skip}&limit=${limit}`;
  
  try {
      const response = await fetch(url);
      
      if (!response.ok) {
          // Provide a more specific message with status code and status text
          throw new Error(`HTTP error ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      return data;
      
  } catch (error) {
      console.error("Failed to fetch news items:", error.message);
      // Depending on how you want to handle errors,
      // you might want to re-throw the error or handle it accordingly
      throw error;
  }
};

export const fetchAnnouncements = async (endpoint: string) => {
    const url = `${PUBLIC_API_BASE_URL}/announcements/${endpoint}/`;
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
  try {
    const response = await axios.get(`${PUBLIC_API_BASE_URL}/news/search/`, {
      params: { query, skip, limit }
    });
    return response.data;
  } catch (error) {
    console.error("Search API error:", error);
    // handle the error appropriately
    throw error;
  }
};

export const submitVote = async (newsId: number, voteValue: number): Promise<NewsItem> => {
  try {
    const response = await axios.post(`${PUBLIC_API_BASE_URL}/news/${newsId}/vote`, {
      vote_value: voteValue,
    });
    // Assuming the response data is a NewsItem object
    return response.data;
  } catch (error) {
    console.error(`Error submitting vote to ${PUBLIC_API_BASE_URL}/news/${newsId}/vote:`, error);
    throw error;
  }
};