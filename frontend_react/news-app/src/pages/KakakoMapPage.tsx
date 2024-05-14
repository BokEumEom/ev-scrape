// src/pages/KakaoMapPage.tsx
import React, { useState } from 'react';
import KakaoMapComponent from '../components/maps/KakaoMapComponent';
import SearchFilters from '../components/maps/SearchFilters';
import ChargingStationList from '../components/maps/ChargingStationList';
import { MarkerInfo } from '../types';
import { useUIVisibility } from '../hooks/useUIVisibility';

const KakaoMapPage: React.FC = () => {
  const [markers, setMarkers] = useState<MarkerInfo[]>([]);
  const [showList, setShowList] = useState(false);

  // Use the custom hook to hide the navigation bar and footer
  useUIVisibility('.navigation-bar, .footer-bar', false);

  const handleSearch = () => {
    const searchResults: MarkerInfo[] = [
      { id: 1, name: "Station 1", position: { lat: 37.5665, lng: 126.9780 } },
      { id: 2, name: "Station 2", position: { lat: 37.5655, lng: 126.9770 } }
    ];
    setMarkers(searchResults);
    setShowList(true);
  };

  const handleClose = () => {
    setShowList(false);
  };

  return (
    <div className="relative w-full h-screen">
      <SearchFilters onSearch={handleSearch} />
      <div className="absolute inset-0">
        <KakaoMapComponent markers={markers} />
      </div>
      <ChargingStationList markers={markers} open={showList} onClose={handleClose} />
    </div>
  );
};

export default KakaoMapPage;
