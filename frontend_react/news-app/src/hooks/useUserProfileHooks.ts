// src/hooks/useUserProfileHooks.ts
import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserProfileQuery, useHandleSignOut } from '@/hooks/useUserProfileQuery';

export const useUserProfile = () => {
  const navigate = useNavigate();
  const { data: user, isLoading, error } = useUserProfileQuery();
  const handleSignOut = useHandleSignOut();

  useEffect(() => {
    if (error) {
      if (error?.response?.status === 401 || error?.message === 'No access token available') {
        localStorage.removeItem('accessToken'); // 유효하지 않은 토큰 제거
        navigate('/signin');
      }
    }
  }, [error, navigate]);

  return { user, isLoading, error, handleSignOut };
};

export const useTabs = (initialTabs) => {
  const [activeTab, setActiveTab] = useState<string>(initialTabs[0].key);
  return { activeTab, setActiveTab };
};
