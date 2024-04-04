// src/components/RegionButtons.tsx
import React, { useState } from 'react';
import { Reorder, motion } from 'framer-motion';
import { IoLocationSharp, IoEllipsisVertical, IoCheckmarkDoneSharp, IoPencil, IoArrowDown } from 'react-icons/io5';

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

  const handleReorder = (newOrder: string[]) => {
    setRegions(newOrder);
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center p-2">
        <span className="text-lg font-semibold">지역 공고</span>
        <button
          onClick={() => setIsEditMode(!isEditMode)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-flex items-center"
        >
          {isEditMode ? (
            <>
              <IoCheckmarkDoneSharp size={20} className="mr-2" />
              Done
            </>
          ) : (
            <>
              <IoPencil size={20} className="mr-2" />
              Edit
            </>
          )}
        </button>
      </div>
      {isEditMode ? (
        <Reorder.Group axis="y" values={regions} onReorder={setRegions} className="flex flex-col items-center w-full">
            {regions.map((region: string) => (
            <Reorder.Item key={region} value={region} className="w-full mb-1">
                {/* Left-aligned items in edit mode */}
                <div className="flex justify-start items-center text-white font-bold py-4 px-4 rounded-md shadow cursor-pointer w-full bg-gray-600">
                <IoLocationSharp className="text-2xl" />
                <span className="ml-2">{region.charAt(0).toUpperCase() + region.slice(1)}</span>
                <IoEllipsisVertical className="ml-auto text-2xl" /> {/* Moves to the far right */}
                </div>
            </Reorder.Item>
            ))}
        </Reorder.Group>
      ) : (
        <>
          {regions.map((region) => (
            <button
              key={region}
              onClick={() => onSelectRegion(region)}
              className={`w-full mb-1 text-white font-bold py-4 px-4 rounded-md shadow cursor-pointer transition ease-in-out duration-300 ${
                selectedRegion === region ? 'bg-blue-500' : 'bg-gray-600'
              } flex items-center justify-between`}
            >
              <IoLocationSharp size={24} />
              <span className="flex-1 text-left ml-2">{region.charAt(0).toUpperCase() + region.slice(1)}</span>
              {selectedRegion === region && <IoCheckmarkDoneSharp size={24} />}
            </button>
          ))}
          {/* 스크롤 인디케이터 추가 */}
          <motion.div
            className="text-center py-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          ></motion.div>
          <div className="text-center py-2">
            <IoArrowDown size={24} className="animate-bounce mx-auto" />
            <span className="text-sm">Scroll for more</span>
          </div>
        </>
      )}
    </div>
  );
};

export default RegionButtons;
