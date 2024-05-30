// src/components/news/BookmarkButton.tsx
import React from 'react';
import { IoBookmark, IoBookmarkOutline } from 'react-icons/io5';

interface BookmarkButtonProps {
  isBookmarked?: boolean; // Allow undefined
  onClick: () => void;
}

const BookmarkButton: React.FC<BookmarkButtonProps> = ({ isBookmarked = false, onClick }) => (
  <button onClick={onClick} className="p-1 rounded-full hover:bg-gray-100 ml-1" aria-label="Bookmark">
    {isBookmarked ? <IoBookmark className="text-blue-500 text-lg" size={18} /> : <IoBookmarkOutline className="text-gray-500 text-lg" size={18} />}
  </button>
);

export default React.memo(BookmarkButton);
