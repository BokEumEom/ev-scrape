// src/hooks/useBookmarks.ts
import { useState, useEffect } from 'react';

const useBookmarks = () => {
  const [bookmarks, setBookmarks] = useState<number[]>([]);

  useEffect(() => {
    const storedBookmarks: number[] = JSON.parse(localStorage.getItem('bookmarks') || '[]');
    setBookmarks(storedBookmarks);
  }, []);

  const toggleBookmark = (newsItemId: number) => {
    const updatedBookmarks = bookmarks.includes(newsItemId)
      ? bookmarks.filter((id) => id !== newsItemId)
      : [...bookmarks, newsItemId];
    setBookmarks(updatedBookmarks);
    localStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks));
  };

  return { bookmarks, toggleBookmark };
};

export default useBookmarks;
