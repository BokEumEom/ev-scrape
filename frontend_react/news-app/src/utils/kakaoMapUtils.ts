// src/utils/kakaoMapUtils.ts
import { MarkerInfo } from '@/types';

/**
 * 카카오 맵을 초기화하고 마커를 추가하는 함수
 * @param {string} containerId - 지도를 표시할 HTML 컨테이너의 ID
 * @param {MarkerInfo[]} markers - 추가할 마커 정보 배열
 */
export const initializeKakaoMap = (containerId: string, markers: MarkerInfo[]) => {
  // 카카오 맵 스크립트가 로드되지 않았을 경우 에러를 던짐
  if (!window.kakao) {
    throw new Error('Kakao map script is not loaded');
  }

  // 카카오 맵 API가 로드된 후 실행될 콜백 함수
  window.kakao.maps.load(() => {
    // 맵을 표시할 컨테이너를 찾음
    const container = document.getElementById(containerId);
    if (!container) {
      throw new Error('Map container not found');
    }

    // 맵 초기화 옵션 설정 (중심 좌표와 줌 레벨)
    const options = {
      center: new window.kakao.maps.LatLng(37.5665, 126.9780), // 서울 중심 좌표
      level: 3, // 줌 레벨
    };

    // 맵 객체 생성
    const map = new window.kakao.maps.Map(container, options);

    // 마커 정보를 순회하며 맵에 마커를 추가
    markers.forEach((markerInfo) => {
      const markerPosition = new window.kakao.maps.LatLng(markerInfo.position.lat, markerInfo.position.lng); // 마커 위치 설정
      const marker = new window.kakao.maps.Marker({
        position: markerPosition, // 마커 위치
        title: markerInfo.name, // 마커 제목
      });
      marker.setMap(map); // 맵에 마커를 설정
    });

    return map; // 맵 객체 반환
  });
};
