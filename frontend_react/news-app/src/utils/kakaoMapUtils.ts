// src/utils/kakaoMapUtils.ts
import { MarkerInfo } from '@/types';

export const initializeKakaoMap = (containerId: string, markers: MarkerInfo[]) => {
  if (!window.kakao) {
    throw new Error('Kakao map script is not loaded');
  }

  window.kakao.maps.load(() => {
    const container = document.getElementById(containerId);
    if (!container) {
      throw new Error('Map container not found');
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

    return map;
  });
};
