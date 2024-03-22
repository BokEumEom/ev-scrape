// src/components/SearchBar.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoSearch } from 'react-icons/io5';
import RecentSearches from './RecentSearches';

const MAX_RECENT_SEARCHES = 5; // Maximum number of recent searches to store

const SearchBar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState<string[]>([]); // This state will manage the recent searches
  const navigate = useNavigate();

  useEffect(() => {
    // This should be replaced with the actual logic to load recent searches
    const loadedRecentSearches: string[] = JSON.parse(localStorage.getItem('recentSearches') || '[]');
    setRecentSearches(loadedRecentSearches);
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Save the new search to the recent searches list
    const updatedSearches = [searchQuery, ...recentSearches.filter(s => s !== searchQuery).slice(0, MAX_RECENT_SEARCHES - 1)];
    localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));
    setRecentSearches(updatedSearches);
    // Navigate to the search page with the query
    navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <>
      <form onSubmit={handleSearchSubmit} className="relative mt-4 mx-4">
        <input
          type="search"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search..."
          className="w-full pl-10 pr-4 py-2 border rounded-full shadow-sm focus:outline-none focus:border-blue-300"
        />
        <button type="submit" className="absolute left-0 top-0 mt-2 ml-2" aria-label="Search">
          <IoSearch className="w-6 h-6 text-gray-600" />
        </button>
      </form>
      <div className="mx-4 mt-2">
        <RecentSearches recentSearches={recentSearches} setSearchQuery={setSearchQuery} />
      </div>
    </>
  );
};

export default SearchBar;
