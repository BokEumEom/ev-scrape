// src/services/apiService.ts
import axios from 'axios';
import { 
  NewsItem, 
  CommunityPost, 
  CommunityPostCreate, 
  CommunityPostsResponse,
  VehicleSpec,
  ApiError,
  CarDetails
} from '../types';

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

export const fetchCommunityPostDetails = async (postId: number) => {
  const url = `${API_BASE_URL}/api/v1/community/${postId}`;
  try {
    const response = await axios.get(url);
    console.log("Requesting URL:", url);
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch community post details for post ${postId}:`, error);
    throw error;
  }
};

/**
 * Updates a community post by sending a PUT request to the server.
 *
 * @param {number} postId - The ID of the post to update.
 * @param {object} postData - The data to update the post with, containing title and content.
 */
export const updateCommunityPost = async ({ postId, postData }: { postId: number; postData: Partial<CommunityPost> }) => {
  // Validation checks for postId and postData
  if (typeof postId !== 'number' || isNaN(postId)) {
    console.error('Invalid postId:', postId);
    throw new Error('Invalid post ID: must be a valid number.');
  }
  if (!postData || typeof postData !== 'object' || Object.keys(postData).length === 0) {
    console.error('Invalid postData:', postData);
    throw new Error('Invalid post data: must be a non-empty object.');
  }

  try {
    console.log('Updating post with ID:', postId);  // Should display a number
    console.log('Post Data:', postData);  // Should display the object with title and content
    const url = `${API_BASE_URL}/api/v1/community/${postId}`;
    console.log('Making PUT request to:', url);  // Check the full URL
    const response = await axios.put(url, postData);
    return response.data;
  } catch (error) {
    console.error('Failed to update post:', error);
    throw error;
  }
};

export const likeCommunityPost = async (postId: number) => {
  try {
      console.log('Liking post with ID:', postId);  // Debug log
      const url = `${API_BASE_URL}/api/v1/community/${postId}/like`;
      const response = await axios.post(url);
      return response.data;
  } catch (error) {
      console.error('Failed to like post:', error);
      throw error;  // Rethrow the error after logging for further handling by caller
  }
};

export const fetchCommentsByPostId = async (postId: number) => {
  const url = `${API_BASE_URL}/api/v1/community/${postId}/comments`;
  try {
      const response = await axios.get(url);
      console.log("Requesting URL:", url);
      return response.data;
  } catch (error) {
      console.error(`Failed to fetch comments for post ${postId}:`, error);
      throw error;
  }
};

export const createComment = async (postId: number, content: string) => {
  const url = `${API_BASE_URL}/api/v1/community/${postId}/comments`;
  try {
    // Ensure that both postId and content are included in the body of the POST request
    const response = await axios.post(url, { content });
    console.log("Requesting URL:", url);
    console.log("Post ID:", postId, "Content:", content);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error('Failed to create comment:', error.response.data);
      alert('Error: ' + JSON.stringify(error.response.data));
    } else {
      console.error('An unexpected error occurred:', error);
    }
    throw new Error(`Failed to create comment on post ${postId}`);
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

export const createVehicleSpec = async (vehicleSpec: VehicleSpec): Promise<VehicleSpec> => {
  const url = `${API_BASE_URL}/api/v1/vehicles`;
  try {
      const response = await axios.post<VehicleSpec>(url, vehicleSpec);
      return response.data;
  } catch (error) {
      if (axios.isAxiosError(error)) {
          console.error('Failed to create vehicle specification:', error.response?.data || error.message);
          // Assuming the API error response is in a specific format you can adjust the typing accordingly
          throw new ApiError(
              error.response?.status || 500,
              error.response?.data.message || 'Unexpected error occurred',
              error.response?.data.errors
          );
      } else {
          // Handling unexpected errors that might not be AxiosError
          console.error('An unexpected error occurred:', error);
          throw new ApiError(500, 'Internal Server Error');
      }
  }
};

// VehicleSpec
export const fetchVehicleSpecifications = async (): Promise<CarDetails[]> => {
  try {
      const response = await axios.get<CarDetails[]>(`${API_BASE_URL}/api/v1/vehicles/`);
      return response.data;
  } catch (error) {
      if (axios.isAxiosError(error)) {
          console.error('Failed to fetch vehicle specifications:', error.response?.data || error.message);
          throw new Error(error.response?.data.message || 'Failed to fetch data');
      } else {
          console.error('An unexpected error occurred:', error);
          throw new Error('An unexpected error occurred');
      }
  }
};
