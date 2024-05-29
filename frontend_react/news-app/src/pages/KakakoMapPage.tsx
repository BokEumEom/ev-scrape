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

  // 커스텀 훅을 사용하여 네비게이션 바와 푸터를 숨김
  useUIVisibility('.navigation-bar, .footer-bar', false);

  return (
    <div className="relative w-full h-screen">
      <SearchFilters onSearch={handleSearch} onOpenFilters={handleOpenFilters} />
      <div className="absolute inset-0">
        <KakaoMapComponent markers={markers} />
      </div>
      <ChargingStationList markers={markers} isOpen={showList} onClose={handleCloseList} />
      <FilterBottomSheet isOpen={showFilters} onClose={handleCloseFilters} />
    </div>
  );
};

export default KakaoMapPage;
