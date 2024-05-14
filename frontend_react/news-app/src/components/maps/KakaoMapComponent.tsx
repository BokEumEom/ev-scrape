// src/components/maps/KakaoMapComponent.tsx
import React, { useEffect } from 'react';
import { useAtom } from 'jotai';
import { kakaoScriptLoadedAtom } from '../../atoms/kakaomap';
import { MarkerInfo } from '../../types';
import { useKakaoScript } from '../../hooks/useKakaoScript';

interface KakaoMapProps {
  markers: MarkerInfo[];
}

const KakaoMapComponent: React.FC<KakaoMapProps> = ({ markers }) => {
  const [isLoaded, setIsLoaded] = useAtom(kakaoScriptLoadedAtom);
  const { isLoaded: scriptLoaded } = useKakaoScript(`https://dapi.kakao.com/v2/maps/sdk.js?appkey=${import.meta.env.VITE_KAKAO_MAP_KEY}&autoload=false`);
  const mapId = 'map';

  useEffect(() => {
    if (scriptLoaded && !isLoaded) {
      setIsLoaded(true);
    }
  }, [scriptLoaded, isLoaded, setIsLoaded]);

  useEffect(() => {
    if (isLoaded) {
      initializeMap();
    }
  }, [isLoaded, markers]);

  const initializeMap = () => {
    if (!window.kakao) {
      console.error('Kakao map script is not loaded');
      return;
    }

    window.kakao.maps.load(() => {
      const container = document.getElementById(mapId);
      if (!container) {
        console.error('Map container not found');
        return;
      }

      const options = {
        center: new window.kakao.maps.LatLng(37.5665, 126.9780),
        level: 3,
      };
      const map = new window.kakao.maps.Map(container, options);

      markers.forEach((markerInfo) => {
        const markerPosition = new window.kakao.maps.LatLng(markerInfo.position.lat, markerInfo.position.lng);
        const marker = new window.kakao.maps.Marker({
          position: markerPosition,
          title: markerInfo.name,
        });

        marker.setMap(map);
      });
    });
  };

  return <div id={mapId} className="w-full h-full"></div>;
};

export default KakaoMapComponent;
