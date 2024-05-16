// src/pages/KakaoMapPage.tsx
import React from 'react';
import KakaoMapComponent from '@/components/maps/KakaoMapComponent';
import SearchFilters from '@/components/maps/SearchFilters';
import ChargingStationList from '@/components/maps/ChargingStationList';
import FilterBottomSheet from '@/components/maps/FilterBottomSheet';
import { useUIVisibility } from '@/hooks/useUIVisibility';
import { useKakaoMarkers } from '@/hooks/useKakaoMarkers';

const KakaoMapPage: React.FC = () => {
  const {
    markers,
    showList,
    showFilters,
    handleSearch,
    handleCloseList,
    handleOpenFilters,
    handleCloseFilters
  } = useKakaoMarkers();

  // Use the custom hook to hide the navigation bar and footer
  useUIVisibility('.navigation-bar, .footer-bar', false);

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
