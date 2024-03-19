// src/components/SearchBar.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoSearch } from 'react-icons/io5'; // Import the search icon

const SearchBar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <form onSubmit={handleSearchSubmit} className="relative mt-4 mx-4">
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearchChange}
        placeholder="Search..."
        className="w-full pl-10 pr-4 py-2 border rounded-full shadow-sm focus:outline-none focus:border-blue-300"
      />
      <button
        type="submit"
        className="absolute left-0 top-0 mt-2 ml-2"
        aria-label="Search"
      >
        <IoSearch className="w-6 h-6 text-gray-600" />
      </button>
    </form>
  );
};

export default SearchBar;

