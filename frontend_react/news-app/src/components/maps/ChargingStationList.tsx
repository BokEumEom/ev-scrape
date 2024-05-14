// src/components/maps/ChargingStationList.tsx
import React from 'react';
import { MarkerInfo } from '../../types';
import BottomSheet from '../BottomSheet';

interface ChargingStationListProps {
  markers: MarkerInfo[];
  open: boolean;
  onClose: () => void;
}

const ChargingStationList: React.FC<ChargingStationListProps> = ({ markers, open, onClose }) => {
  return (
    <BottomSheet open={open} onClose={onClose}>
      <div className="overflow-y-auto max-h-[calc(100vh-64px)]"> {/* Ensure the content is scrollable */}
        {markers.map(marker => (
          <div key={marker.id} className="flex justify-between items-center p-4 border border-gray-300 rounded mb-4">
            <div>
              <h3 className="text-lg font-semibold">{marker.name}</h3>
              <p className="text-sm text-gray-600">{marker.position.lat}km 서울특별시 종로구 {marker.name}</p>
            </div>
            <button className="px-4 py-2 bg-pink-500 text-white rounded-lg">이동</button>
          </div>
        ))}
      </div>
    </BottomSheet>
  );
};

export default ChargingStationList;
