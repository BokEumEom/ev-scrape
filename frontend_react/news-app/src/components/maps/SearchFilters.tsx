// src/components/maps/SearchFilters.tsx
import React from 'react';
import { IoArrowBackOutline } from "react-icons/io5";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"; // Adjust this path as necessary

const SearchFilters: React.FC<{ onSearch: () => void }> = ({ onSearch }) => {
  return (
    <div className="absolute top-10 left-1/2 transform -translate-x-1/2 p-2 bg-white shadow-md rounded-lg w-11/12 max-w-md z-10">
      <div className="flex items-center gap-2 mb-2">
        <button className="text-gray-700" onClick={() => window.history.back()}>
          <IoArrowBackOutline />
        </button>
        <input 
          type="text" 
          placeholder="충전소를 검색해 주세요" 
          className="flex-1 p-2"
        />
        <button 
          onClick={onSearch} 
          className="px-4 py-2 bg-blue-500 text-white rounded-lg"
        >
          검색
        </button>
      </div>
      <hr className="my-2 border-gray-300" />
      <div className="flex items-center gap-2">
        <div className="flex-1">
          <Select>
            <SelectTrigger className="w-full text-xs">
              <SelectValue placeholder="충전소 전체" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>충전소</SelectLabel>
                <SelectItem value="all">전체</SelectItem>
                {/* Add more options as needed */}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="flex-1">
          <Select>
            <SelectTrigger className="w-full text-xs">
              <SelectValue placeholder="결제방법 전체" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>결제방법</SelectLabel>
                <SelectItem value="all">전체</SelectItem>
                {/* Add more options as needed */}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="flex-1">
          <Select>
            <SelectTrigger className="w-full text-xs">
              <SelectValue placeholder="커넥터 전체" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>커넥터</SelectLabel>
                <SelectItem value="all">전체</SelectItem>
                {/* Add more options as needed */}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="flex-1">
          <Select>
            <SelectTrigger className="w-full text-xs">
              <SelectValue placeholder="운영기관 전체" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>운영기관</SelectLabel>
                <SelectItem value="all">전체</SelectItem>
                {/* Add more options as needed */}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default SearchFilters;
