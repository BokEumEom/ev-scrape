// src/pages/KakaoMapPage.tsx
import React, { useState } from 'react';
import KakaoMapComponent from '@/components/maps/KakaoMapComponent';
import SearchFilters from '@/components/maps/SearchFilters';
import ChargingStationList from '@/components/maps/ChargingStationList';
import FilterBottomSheet from '@/components/maps/FilterBottomSheet';
import { MarkerInfo } from '@/types';
import { useUIVisibility } from '@/hooks/useUIVisibility';

const KakaoMapPage: React.FC = () => {
  const [markers, setMarkers] = useState<MarkerInfo[]>([]);
  const [showList, setShowList] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  // Use the custom hook to hide the navigation bar and footer
  useUIVisibility('.navigation-bar, .footer-bar', false);

  const handleSearch = () => {
    const searchResults: MarkerInfo[] = [
      { id: 1, name: "Station 1", position: { lat: 37.5665, lng: 126.9780 } },
      { id: 2, name: "Station 2", position: { lat: 37.5655, lng: 126.9770 } },
      { id: 3, name: "Station 3", position: { lat: 37.5655, lng: 126.9770 } },
      { id: 4, name: "Station 4", position: { lat: 37.5655, lng: 126.9770 } },
      { id: 5, name: "Station 5", position: { lat: 37.5655, lng: 126.9770 } }
    ];
    setMarkers(searchResults);
    setShowList(true);
  };

  const handleCloseList = () => {
    setShowList(false);
  };

  const handleOpenFilters = () => {
    setShowFilters(true);
  };

  const handleCloseFilters = () => {
    setShowFilters(false);
  };

  return (
    <div className="relative w-full h-screen">
      <SearchFilters onSearch={handleSearch} onOpenFilters={handleOpenFilters} />
      <div className="absolute inset-0">
        <KakaoMapComponent markers={markers} />
      </div>
      <ChargingStationList markers={markers} open={showList} onClose={handleCloseList} />
      <FilterBottomSheet isOpen={showFilters} onClose={handleCloseFilters} />
    </div>
  );
};

export default KakaoMapPage;
