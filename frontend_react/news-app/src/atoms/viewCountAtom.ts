// src/atoms/viewCountAtom.ts
import { atom } from 'jotai';

interface ViewCounts {
  [key: string]: number;
}

const initialViewCounts: ViewCounts = JSON.parse(localStorage.getItem('viewCounts') || '{}');

export const viewCountAtom = atom<ViewCounts>(initialViewCounts);

export const incrementViewCountAtom = atom(
  null,
  (get, set, newsItemId: number) => {
    const viewCounts = get(viewCountAtom);
    // newsItemId를 문자열로 변환
    const itemIdStr = newsItemId.toString();
    const newCount = (viewCounts[itemIdStr] || 0) + 1;
    const updatedViewCounts = { ...viewCounts, [itemIdStr]: newCount };
    localStorage.setItem('viewCounts', JSON.stringify(updatedViewCounts));
    set(viewCountAtom, updatedViewCounts);
  }
);
