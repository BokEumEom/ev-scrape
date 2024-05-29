// src/hooks/useBookmarks.ts
import { useState, useEffect } from 'react';

// 북마크를 관리하기 위한 커스텀 훅
const useBookmarks = () => {
  // 북마크된 뉴스 항목 ID 목록을 저장할 상태
  const [bookmarks, setBookmarks] = useState<number[]>([]);

  // 컴포넌트가 마운트될 때 localStorage에서 북마크를 로드하기 위한 effect
  useEffect(() => {
    // localStorage에서 북마크를 가져오거나, 존재하지 않으면 빈 배열을 사용
    const storedBookmarks: number[] = JSON.parse(localStorage.getItem('bookmarks') || '[]');
    setBookmarks(storedBookmarks); // 가져온 북마크를 상태에 설정
  }, []); // 빈 의존성 배열은 이 effect가 마운트 시 한 번만 실행되도록 함

  // 뉴스 항목의 북마크 상태를 토글하는 함수
  const toggleBookmark = (newsItemId: number) => {
    // 북마크를 추가할지 제거할지 결정
    const updatedBookmarks = bookmarks.includes(newsItemId)
      ? bookmarks.filter((id) => id !== newsItemId) // 이미 북마크된 경우 제거
      : [...bookmarks, newsItemId]; // 북마크되지 않은 경우 추가
    setBookmarks(updatedBookmarks); // 새로운 북마크 목록으로 상태 업데이트
    localStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks)); // 새로운 북마크 목록을 localStorage에 저장
  };

  // 북마크와 북마크를 토글하는 함수를 반환
  return { bookmarks, toggleBookmark };
};

export default useBookmarks;
