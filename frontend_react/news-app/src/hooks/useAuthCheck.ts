// src/hooks/useAuthCheck.ts
import { useNavigate } from 'react-router-dom';

const useAuthCheck = (error: any) => {
  const navigate = useNavigate();

  if (error?.response?.status === 401 || error?.message === 'No access token available') {
    localStorage.removeItem('accessToken'); // Clear any invalid token
    navigate('/signin');
  }
};

export default useAuthCheck;
