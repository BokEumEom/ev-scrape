// src/components/FooterBar.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  IoHomeOutline, IoHomeSharp,
  IoBookmarkOutline, IoBookmark,
  IoPersonOutline, IoPersonSharp,
  IoSearchOutline, IoSearch,
  IoChatbubblesOutline, IoChatbubbles
} from 'react-icons/io5';

const FooterBar: React.FC = () => {
  const navigate = useNavigate();
  const [activeIcon, setActiveIcon] = useState('');

  const handleIconClick = (iconName: string, path: string) => {
    setActiveIcon(iconName); // Set the clicked icon as active
    navigate(path); // Navigate to the corresponding page
  };

  return (
    <div className="fixed inset-x-0 bottom-0 bg-white border-t border-gray-300 py-2 flex justify-around items-center z-10 text-xs">
      { /* Adjusted py-2 for better spacing with text */}
      <button
        aria-label="Home"
        className="flex-1"
        onClick={() => handleIconClick('home', '/')}
      >
        <div className="flex flex-col items-center justify-center">
          {activeIcon === 'home' ? <IoHomeSharp className="text-indigo-500 text-xl" /> : <IoHomeOutline className="text-indigo-500 text-xl" />}
          <span className="text-indigo-600 text-[10px]">홈</span>
        </div>
      </button>
      <button
        aria-label="Search"
        className="flex-1"
        onClick={() => handleIconClick('search', '/search')}
      >
        <div className="flex flex-col items-center justify-center">
          {activeIcon === 'search' ? <IoSearch className="text-indigo-500 text-xl" /> : <IoSearchOutline className="text-indigo-500 text-xl" />}
          <span className="text-indigo-600 text-[10px]">검색</span>
        </div>
      </button>
      <button
        aria-label="Chat"
        className="flex-1"
        onClick={() => handleIconClick('share', '/share')}
      >
        <div className="flex flex-col items-center justify-center">
          {activeIcon === 'share' ? <IoChatbubbles className="text-indigo-500 text-xl" /> : <IoChatbubblesOutline className="text-indigo-500 text-xl" />}
          <span className="text-indigo-600 text-[10px]">채팅</span>
        </div>
      </button>
      <button
        aria-label="Bookmark"
        className="flex-1"
        onClick={() => handleIconClick('bookmarks', '/bookmarks')}
      >
        <div className="flex flex-col items-center justify-center">
          {activeIcon === 'bookmarks' ? <IoBookmark className="text-indigo-500 text-xl" /> : <IoBookmarkOutline className="text-indigo-500 text-xl" />}
          <span className="text-indigo-600 text-[10px]">북마크</span>
        </div>
      </button>
      <button
        aria-label="Profile"
        className="flex-1"
        onClick={() => handleIconClick('my-page', '/my-page')}
      >
        <div className="flex flex-col items-center justify-center">
          {activeIcon === 'my-page' ? <IoPersonSharp className="text-indigo-500 text-xl" /> : <IoPersonOutline className="text-indigo-500 text-xl" />}
          <span className="text-indigo-600 text-[10px]">내 정보</span>
        </div>
      </button>
    </div>
  );
};

export default FooterBar;
