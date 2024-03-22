// src/components/RecentSearches.tsx
import React from 'react';

const RecentSearches: React.FC<{ recentSearches: string[], setSearchQuery: React.Dispatch<React.SetStateAction<string>> }> = ({ recentSearches, setSearchQuery }) => {
  return (
    <div className="flex overflow-x-auto mx-4 mt-2 pb-2">
      {recentSearches.length > 0 && recentSearches.map((search, index) => (
        <span
          key={index}
          className="text-sm text-blue-500 hover:text-blue-700 cursor-pointer whitespace-nowrap px-3 py-1 border border-blue-500 rounded-full mr-2 last:mr-0"
          onClick={() => setSearchQuery(search)}
        >
          {search}
        </span>
      ))}
    </div>
  );
};

export default RecentSearches;
