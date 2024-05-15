import React, { useState } from 'react';
import { Reorder } from 'framer-motion';
import { IoEllipsisVertical, IoArrowDown, IoLocationSharp } from 'react-icons/io5';
import RegionItem from './RegionItem';

interface RegionButtonsProps {
  regions: string[];
  selectedRegion: string | null;
  onSelectRegion: (region: string) => void;
  setRegions: (regions: string[]) => void;
}

const sortIcon = (
  <svg className="fill-current text-blue-600 w-6 h-6" viewBox="0 0 24 24">
    <path d="M12 5l6 6H6l6-6zm0 14l-6-6h12l-6 6z" />
  </svg>
);

const completeIcon = (
  <svg className="fill-current text-green-500 w-6 h-6" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414L8.414 15l-4.707-4.707a1 1 0 111.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
  </svg>
);


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
          className="bg-gray-300 hover:bg-gray-200 rounded-full p-2 transition-colors"
          aria-label={isEditMode ? "Finish editing" : "Edit list"}
        >
          {isEditMode ? completeIcon : sortIcon}
        </button>
      </div>
      {isEditMode ? (
        <Reorder.Group axis="y" values={regions} onReorder={setRegions} className="flex flex-col items-center w-full">
            {regions.map((region) => (
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
      <div className="text-center pt-6">
        <span className="text-sm">Scroll for more</span>
        <IoArrowDown size={12} className="animate-bounce mx-auto mt-4" />
      </div>
    </div>
  );
};

export default RegionButtons;