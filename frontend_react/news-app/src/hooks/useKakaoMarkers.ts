// src/hooks/useMarkers.ts
import { useState } from 'react';
import { MarkerInfo } from '@/types';

export const useKakaoMarkers = () => {
  const [markers, setMarkers] = useState<MarkerInfo[]>([]);
  const [showList, setShowList] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

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