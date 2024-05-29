// src/atoms/viewCountAtom.ts
import { atom } from 'jotai';

interface ViewCounts {
  [key: string]: number;
}

// localStorage에서 초기 조회수 데이터를 가져오거나 빈 객체로 초기화
const initialViewCounts: ViewCounts = JSON.parse(localStorage.getItem('viewCounts') || '{}');

// 조회수 상태를 관리하는 Atom
export const viewCountAtom = atom<ViewCounts>(initialViewCounts);

// 뉴스 아이템의 조회수를 증가시키는 Atom
export const incrementViewCountAtom = atom(
  null,
  (get, set, newsItemId: number) => {
    const viewCounts = get(viewCountAtom); // 현재 조회수 상태 가져오기
    const itemIdStr = newsItemId.toString(); // newsItemId를 문자열로 변환
    const newCount = (viewCounts[itemIdStr] || 0) + 1; // 조회수 증가
    const updatedViewCounts = { ...viewCounts, [itemIdStr]: newCount }; // 새로운 상태로 업데이트
    localStorage.setItem('viewCounts', JSON.stringify(updatedViewCounts)); // localStorage에 저장
    set(viewCountAtom, updatedViewCounts); // Atom 상태 업데이트
  }
);
