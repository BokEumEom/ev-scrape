// src/utils/handleApiError.ts
export const handleApiError = (error: any) => {
  if (error.response) {
    // Server responded with a status other than 200 range
    console.error('API error response:', error.response.data);
  } else if (error.request) {
    // Request was made but no response received
    console.error('API error request:', error.request);
  } else {
    // Something else happened while setting up the request
    console.error('API error message:', error.message);
  }
};
