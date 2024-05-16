// src/components/maps/KakaoMapComponent.tsx
import React, { useEffect } from 'react';
import { useAtom } from 'jotai';
import { kakaoScriptLoadedAtom } from '../../atoms/kakaomap';
import { MarkerInfo } from '../../types';
import { useKakaoScript } from '../../hooks/useKakaoScript';
import { initializeKakaoMap } from '../../utils/kakaoMapUtils';

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
      try {
        initializeKakaoMap(mapId, markers);
      } catch (error) {
        console.error(error.message);
      }
    }
  }, [isLoaded, markers]);

  return <div id={mapId} className="w-full h-full"></div>;
};

export default KakaoMapComponent;
