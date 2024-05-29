// src/components/SearchBar.tsx
import React, { useState, forwardRef } from 'react';
import { IoSearch } from 'react-icons/io5';
import { SearchBarProps } from '@/types';

const SearchBar = forwardRef<HTMLInputElement, SearchBarProps>(
  ({ searchQuery, setSearchQuery }, ref) => {
    const [inputValue, setInputValue] = useState(searchQuery);

    const handleSearchSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (inputValue.trim()) {
        setSearchQuery(inputValue.trim()); // Use the inputValue to perform the search
      }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value);
    };

    return (
      <form onSubmit={handleSearchSubmit} className="relative mt-4 mx-4">
        <input
          ref={ref}
          type="search"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Search..."
          className="w-full pl-10 pr-4 py-2 border rounded-full shadow-sm focus:outline-none focus:border-blue-300"
        />
        <button type="submit" className="absolute left-0 top-0 mt-2 ml-2" aria-label="Search">
          <IoSearch className="w-6 h-6 text-gray-600" />
        </button>
      </form>
    );
  }
);

export default SearchBar;
