// src/components/FooterBar.tsx
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  IoHomeOutline, IoHomeSharp,
  IoBookmarkOutline, IoBookmark,
  IoPersonOutline, IoPersonSharp,
  IoNewspaper, IoNewspaperOutline,
  IoToday, IoTodayOutline
} from 'react-icons/io5';

const FooterBar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Determine the active icon based on the current route
  const determineActiveIcon = (pathname: string) => {
    if (pathname === '/') return 'home';
    if (pathname.includes('news')) return 'news';
    if (pathname.includes('announcements')) return 'announcements';
    if (pathname.includes('bookmarks')) return 'bookmarks';
    if (pathname.includes('my-page')) return 'my-page';
    return '';
  };

  const [activeIcon, setActiveIcon] = useState(determineActiveIcon(location.pathname));

  useEffect(() => {
    // Update the active icon based on the current route whenever it changes
    const currentActiveIcon = determineActiveIcon(location.pathname);
    setActiveIcon(currentActiveIcon);
  }, [location.pathname]);

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
          {activeIcon === 'home' ? <IoHomeSharp className="text-indigo-500 text-xl" /> : <IoHomeOutline className="text-gray-800 text-xl" />}
          <span className="text-gray-600 text-[10px]">홈</span>
        </div>
      </button>
      <button
        aria-label="News"
        className="flex-1"
        onClick={() => handleIconClick('news', '/news')}
      >
        <div className="flex flex-col items-center justify-center">
          {activeIcon === 'news' ? <IoNewspaper className="text-indigo-500 text-xl" /> : <IoNewspaperOutline className="text-gray-800 text-xl" />}
          <span className="text-gray-600 text-[10px]">뉴스</span>
        </div>
      </button>
      <button
        aria-label="Announcements"
        className="flex-1"
        onClick={() => handleIconClick('announcements', '/announcements')}
      >
        <div className="flex flex-col items-center justify-center">
          {activeIcon === 'announcements' ? <IoToday className="text-indigo-500 text-xl" /> : <IoTodayOutline className="text-gray-800 text-xl" />}
          <span className="text-gray-600 text-[10px]">공고</span>
        </div>
      </button>
      <button
        aria-label="Bookmark"
        className="flex-1"
        onClick={() => handleIconClick('bookmarks', '/bookmarks')}
      >
        <div className="flex flex-col items-center justify-center">
          {activeIcon === 'bookmarks' ? <IoBookmark className="text-indigo-500 text-xl" /> : <IoBookmarkOutline className="text-gray-800 text-xl" />}
          <span className="text-gray-600 text-[10px]">북마크</span>
        </div>
      </button>
      <button
        aria-label="Profile"
        className="flex-1"
        onClick={() => handleIconClick('my-page', '/my-page')}
      >
        <div className="flex flex-col items-center justify-center">
          {activeIcon === 'my-page' ? <IoPersonSharp className="text-indigo-500 text-xl" /> : <IoPersonOutline className="text-gray-800 text-xl" />}
          <span className="text-gray-600 text-[10px]">내 정보</span>
        </div>
      </button>
    </div>
  );
};

export default FooterBar;
