// src/components/maps/SearchFilters.tsx
import React from 'react';
import { IoChevronDownOutline } from "react-icons/io5";

const SearchFilters: React.FC<{ onSearch: () => void, onOpenFilters: () => void }> = ({ onSearch, onOpenFilters }) => {
  return (
    <div className="absolute top-10 left-1/2 transform -translate-x-1/2 p-2 bg-white shadow-md rounded-lg w-11/12 max-w-md z-10">
      <div className="flex items-center gap-2 mb-2">
        <button className="text-gray-700" onClick={() => window.history.back()}>
          ←
        </button>
        <input 
          type="text" 
          placeholder="충전소를 검색해 주세요" 
          className="flex-1 p-2"
        />
        <button 
          onClick={onSearch} 
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          검색
        </button>
      </div>
      <hr className="my-2 border-gray-300" />
      <div className="flex items-center gap-2">
        <div className="flex-1">
          <button onClick={onOpenFilters} className="w-full flex items-center justify-between text-xs px-2 py-2 border rounded">
            충전소
            <IoChevronDownOutline className="text-gray-500" />
          </button>
        </div>
        <div className="flex-1">
          <button onClick={onOpenFilters} className="w-full flex items-center justify-between text-xs px-2 py-2 border rounded">
            결제방법
            <IoChevronDownOutline className="text-gray-500" />
          </button>
        </div>
        <div className="flex-1">
          <button onClick={onOpenFilters} className="w-full flex items-center justify-between text-xs px-2 py-2 border rounded">
            커넥터
            <IoChevronDownOutline className="text-gray-500" />
          </button>
        </div>
        <div className="flex-1">
          <button onClick={onOpenFilters} className="w-full flex items-center justify-between text-xs px-2 py-2 border rounded">
            운영기관
            <IoChevronDownOutline className="text-gray-500" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchFilters;
