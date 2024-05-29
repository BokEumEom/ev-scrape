// src/components/maps/KakaoMapComponent.tsx
import React, { useEffect } from 'react';
import { useAtom } from 'jotai';
import { kakaoScriptLoadedAtom } from '@/atoms/kakaomap';
import { MarkerInfo } from '@/types';
import { useKakaoScript } from '@/hooks/useKakaoScript';
import { initializeKakaoMap } from '@/utils/kakaoMapUtils';

interface KakaoMapProps {
  markers: MarkerInfo[];
}

const KakaoMapComponent: React.FC<KakaoMapProps> = ({ markers }) => {
  const [isLoaded, setIsLoaded] = useAtom(kakaoScriptLoadedAtom);
  const { isLoaded: scriptLoaded, error } = useKakaoScript(`https://dapi.kakao.com/v2/maps/sdk.js?appkey=${import.meta.env.VITE_KAKAO_MAP_KEY}&autoload=false`);
  const mapId = 'map';

  // Kakao 스크립트가 로드되면 loaded 상태를 업데이트하는 효과
  useEffect(() => {
    if (scriptLoaded && !isLoaded) {
      setIsLoaded(true);
    }
  }, [scriptLoaded, isLoaded, setIsLoaded]);

  // 스크립트가 로드되고 마커가 사용 가능해지면 Kakao 지도를 초기화하는 효과
  useEffect(() => {
    if (isLoaded) {
      try {
        if (Array.isArray(markers)) {
          initializeKakaoMap(mapId, markers);
        } else {
          console.error('Markers should be an array');
        }
      } catch (error) {
        console.error('KakaoMap initialization error:', error.message);
      }
    }
  }, [isLoaded, markers]);

  if (error) {
    return <div>Error loading Kakao Map script</div>;
  }

  return <div id={mapId} className="w-full h-full"></div>;
};

export default KakaoMapComponent;
