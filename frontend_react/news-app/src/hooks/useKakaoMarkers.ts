// src/hooks/useKakaoMarkers.ts
import { useState } from 'react';
import { MarkerInfo } from '@/types';

export const useKakaoMarkers = () => {
  // 마커 정보를 저장하는 상태
  const [markers, setMarkers] = useState<MarkerInfo[]>([]);
  // 마커 리스트의 가시성을 제어하는 상태
  const [showList, setShowList] = useState(false);
  // 필터 옵션의 가시성을 제어하는 상태
  const [showFilters, setShowFilters] = useState(false);

  // 검색 작업을 처리하고 마커 리스트를 설정하는 함수
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

  // 마커 리스트를 닫는 함수
  const handleCloseList = () => {
    setShowList(false);
  };

  // 필터 옵션을 여는 함수
  const handleOpenFilters = () => {
    setShowFilters(true);
  };

  // 필터 옵션을 닫는 함수
  const handleCloseFilters = () => {
    setShowFilters(false);
  };

  return {
    markers,
    showList,
    showFilters,
    handleSearch,
    handleCloseList,
    handleOpenFilters,
    handleCloseFilters
  };
};
