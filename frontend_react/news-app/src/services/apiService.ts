// src/services/apiService.ts
import axios from 'axios';
import { API_BASE_URL } from '@/constants/constants';
import { handleApiError } from '@/utils/handleApiError';

// Axios 인스턴스를 생성하고 기본 URL을 설정합니다.
export const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

// 응답 인터셉터를 설정합니다. 
// 성공적인 응답은 그대로 반환하고, 에러가 발생한 경우 handleApiError 함수를 호출하여 에러를 처리합니다.
axiosInstance.interceptors.response.use(
  response => response, // 응답 성공 시 그대로 반환
  error => {
    handleApiError(error); // 에러 처리
    return Promise.reject(error); // 에러를 다시 던져서 호출한 곳에서 처리할 수 있게 합니다.
  }
);
