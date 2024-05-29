// src/components/maps/ChargingStationList.tsx
import React from 'react';
import { MarkerInfo } from '@/types';
import BottomSheet from '@/components/BottomSheet';

interface ChargingStationListProps {
  markers: MarkerInfo[];
  isOpen: boolean;
  onClose: () => void;
}

const ChargingStationList: React.FC<ChargingStationListProps> = ({ markers, isOpen, onClose }) => {
  return (
    <BottomSheet open={isOpen} onClose={onClose} minHeight={100} maxHeight={window.innerHeight * 0.8}>
      <div className="overflow-y-auto max-h-[calc(100vh-200px)]">
        {markers.length === 0 ? (
          <div className="p-4 text-center">
            <p className="text-gray-600">No charging stations found.</p>
          </div>
        ) : (
          markers.map((marker) => (
            <div key={marker.id} className="flex items-center py-4 border-b border-gray-300">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gray-200 rounded-full mr-4"></div>
                <div className="flex flex-col">
                  <h3 className="text-lg font-semibold truncate">{marker.name}</h3>
                  <p className="text-sm text-gray-600 truncate">{marker.position.lat}km 서울특별시 종로구</p>
                </div>
              </div>
              <button className="px-4 py-2 bg-blue-500 text-white rounded ml-auto" aria-label={`Navigate to ${marker.name}`}>
                이동
              </button>
            </div>
          ))
        )}
      </div>
    </BottomSheet>
  );
};

export default ChargingStationList;
