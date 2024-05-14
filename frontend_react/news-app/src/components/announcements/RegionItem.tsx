// src/components/announcements/RegionItem.tsx
import React from 'react';
import { IoCheckmarkDoneSharp, IoLocationSharp } from 'react-icons/io5';
import { regionMapping } from '../../utils/regionMapping';

interface RegionItemProps {
  region: string;
  onSelect: () => void;
  isSelected: boolean;
}

const RegionItem: React.FC<RegionItemProps> = ({ region, onSelect, isSelected }) => (
  <button
    onClick={onSelect}
    className={`w-full mb-1 border py-3 px-4 rounded-md cursor-pointer transition ease-in-out duration-300 ${
      isSelected ? 'bg-blue-500' : ''
    } flex items-center justify-between`}
    aria-label={`Select ${region}`}
  >
    <IoLocationSharp size={20} />
    <span className="flex-1 text-left ml-2">{regionMapping[region]}</span>
    {isSelected && <IoCheckmarkDoneSharp size={24} />}
  </button>
);

export default RegionItem;
