// src/hooks/useUIVisibility.tsx
import { useEffect } from 'react';

/**
 * useUIVisibility 커스텀 훅
 * 주어진 셀렉터로 선택된 요소들의 가시성을 제어합니다.
 *
 * @param selector - CSS 선택자 문자열
 * @param visible - 요소를 표시할지 여부를 나타내는 불리언 값
 */
export const useUIVisibility = (selector: string, visible: boolean) => {
    useEffect(() => {
        // 주어진 셀렉터로 요소들을 선택
        const elements = document.querySelectorAll<HTMLElement>(selector);
        // 각 요소의 display 스타일을 설정하여 가시성 제어
        elements.forEach(element => {
            element.style.display = visible ? '' : 'none';
        });

        // cleanup 함수: 컴포넌트가 언마운트되거나 visible 또는 selector 값이 변경될 때 호출
        return () => {
            elements.forEach(element => {
                element.style.display = '';
            });
        };
    }, [selector, visible]); // 의존성 배열: selector와 visible 값이 변경될 때마다 useEffect 실행
};
