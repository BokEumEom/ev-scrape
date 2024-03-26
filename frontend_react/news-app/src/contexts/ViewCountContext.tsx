// src/contexts/ViewCountContext.tsx
import React, { createContext, useState, useEffect, ReactNode } from 'react';

interface ViewCounts {
  [key: number]: number;
}

interface ViewCountContextValue {
  viewCounts: ViewCounts;
  incrementViewCount: (newsItemId: number) => void;
}

const defaultContextValue: ViewCountContextValue = {
  viewCounts: {},
  incrementViewCount: () => {}, // 아무 작업도 하지 않는 함수
};

const ViewCountContext = createContext<ViewCountContextValue>(defaultContextValue);

interface ViewCountProviderProps {
  children: ReactNode; // children에 대한 타입 선언
}

const ViewCountProvider: React.FC<ViewCountProviderProps> = ({ children }) => {
  const [viewCounts, setViewCounts] = useState<ViewCounts>(() => {
    const loadedViewCounts = JSON.parse(localStorage.getItem('viewCounts') || '{}');
    return loadedViewCounts;
  });

  useEffect(() => {
    localStorage.setItem('viewCounts', JSON.stringify(viewCounts));
  }, [viewCounts]);

  const incrementViewCount = (newsItemId: number) => {
    setViewCounts(prevViewCounts => {
      const newCount = (prevViewCounts[newsItemId] || 0) + 1;
      const updatedViewCounts = { ...prevViewCounts, [newsItemId]: newCount };
      return updatedViewCounts;
    });
  };

  const value: ViewCountContextValue = {
    viewCounts,
    incrementViewCount,
  };

  return <ViewCountContext.Provider value={value}>{children}</ViewCountContext.Provider>;
};

export { ViewCountContext, ViewCountProvider };