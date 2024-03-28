// src/components/RecentSearches.tsx
import React from 'react';
import { RecentSearchesProps } from '../types';
import { IoCloseCircleOutline } from 'react-icons/io5';

const RecentSearches: React.FC<RecentSearchesProps> = ({ recentSearches, setSearchQuery, setRecentSearches }) => {
  
  const handleDelete = (searchToDelete: string) => {
    // Filter out the term to delete and update the recent searches state
    const updatedSearches = recentSearches.filter(search => search !== searchToDelete);
    setRecentSearches(updatedSearches);

    // Also update this in localStorage if you're storing recent searches there
    localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));
  };

  return (
    <div className="flex overflow-x-auto mx-4 pb-2">
      {recentSearches.length > 0 && recentSearches.map((search, index) => (
        <div key={index} className="flex items-center mr-2 last:mr-0">
          <span
            className="text-xs text-blue-500 hover:text-blue-700 cursor-pointer whitespace-nowrap px-2 py-1 border border-blue-500 rounded-full"
            onClick={() => setSearchQuery(search)}
          >
            {search}
          </span>
          <IoCloseCircleOutline
            className="ml-2 text-gray-400 hover:text-gray-600 cursor-pointer"
            onClick={() => handleDelete(search)}
          />
        </div>
      ))}
    </div>
  );
};

export default RecentSearches;
