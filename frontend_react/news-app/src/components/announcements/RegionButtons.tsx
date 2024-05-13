// src/components/announcements/RegionButtons.tsx
import React, { useState } from 'react';
import { Reorder } from 'framer-motion';
import { IoEllipsisVertical, IoArrowDown, IoLocationSharp } from 'react-icons/io5';
import RegionItem from './RegionItem'; // Import the RegionItem component

interface RegionButtonsProps {
  regions: string[];
  selectedRegion: string | null;
  onSelectRegion: (region: string) => void;
  setRegions: (regions: string[]) => void;
}

const RegionButtons: React.FC<RegionButtonsProps> = ({
  regions,
  selectedRegion,
  onSelectRegion,
  setRegions,
}) => {
  const [isEditMode, setIsEditMode] = useState(false);

  if (regions.length === 0) {
    return <div className="text-center py-4">No regions available.</div>;
  }

  return (
    <div className="w-full">
      <div className="flex justify-between items-center p-2">
        <span className="text-sm font-semibold"></span>
        <button
          onClick={() => setIsEditMode(!isEditMode)}
          className="text-gray-800 bg-gray-300 hover:bg-gray-200 font-bold py-2 px-4 rounded inline-flex items-center"
          aria-label={isEditMode ? "Finish editing" : "Edit list"}
        >
          {isEditMode ? "완료" : "리스트 정렬"}
        </button>
      </div>
      {isEditMode ? (
        <Reorder.Group axis="y" values={regions} onReorder={setRegions} className="flex flex-col items-center w-full">
            {regions.map((region: string) => (
            <Reorder.Item key={region} value={region} className="w-full mb-1">
                <div className="flex justify-start items-center text-white font-bold py-3 px-4 rounded-md cursor-pointer bg-gray-500">
                <IoLocationSharp className="text-xl" />
                <span className="ml-2">{region.charAt(0).toUpperCase() + region.slice(1)}</span>
                <IoEllipsisVertical className="ml-auto text-2xl" />
                </div>
            </Reorder.Item>
            ))}
        </Reorder.Group>
      ) : (
        regions.map((region) => (
          <RegionItem
            key={region}
            region={region}
            onSelect={() => onSelectRegion(region)}
            isSelected={selectedRegion === region}
          />
        ))
      )}
      <div className="text-center py-2">
        <IoArrowDown size={24} className="animate-bounce mx-auto" />
        <span className="text-sm">Scroll for more</span>
      </div>
    </div>
  );
};

export default RegionButtons;