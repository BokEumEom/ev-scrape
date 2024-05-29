// src/hooks/useKakaoScript.tsx
import { useState, useEffect } from 'react';

/**
 * 외부 스크립트를 로드하고 로드 상태를 추적하는 커스텀 훅
 * @param scriptUrl - 로드할 스크립트의 URL
 * @returns 스크립트 로드 상태와 오류 메시지
 */
export const useKakaoScript = (scriptUrl: string) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // 스크립트가 이미 로드되었거나 로드 중인지 확인
    const existingScript = document.querySelector(`script[src="${scriptUrl}"]`);
    if (existingScript) {
      setIsLoaded(true);
      return;
    }

    // 스크립트를 동적으로 생성 및 로드
    const script = document.createElement('script');
    script.src = scriptUrl;
    script.async = true;

    // 스크립트 로드 성공 시 상태 업데이트
    script.onload = () => {
      setIsLoaded(true);
    };

    // 스크립트 로드 실패 시 오류 상태 업데이트
    script.onerror = () => {
      setError('Failed to load the Kakao Map script');
    };

    // 문서의 head에 스크립트 추가
    document.head.appendChild(script);

    // 컴포넌트 언마운트 시 스크립트 제거
    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [scriptUrl]);

  return { isLoaded, error };
};
