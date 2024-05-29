// src/components/FooterBar.tsx
import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  IoHomeOutline, IoHomeSharp,
  IoBookmarkOutline, IoBookmark,
  IoPersonOutline, IoPersonSharp,
  IoNewspaper, IoNewspaperOutline,
  IoToday, IoTodayOutline
} from 'react-icons/io5';

// 아이콘과 라벨, 경로를 매핑하는 객체
const ICONS = {
  home: { active: IoHomeSharp, inactive: IoHomeOutline, label: '홈', path: '/' },
  news: { active: IoNewspaper, inactive: IoNewspaperOutline, label: '뉴스', path: '/news' },
  announcements: { active: IoToday, inactive: IoTodayOutline, label: '공고', path: '/announcements' },
  bookmarks: { active: IoBookmark, inactive: IoBookmarkOutline, label: '북마크', path: '/bookmarks' },
  myPage: { active: IoPersonSharp, inactive: IoPersonOutline, label: '내 정보', path: '/mypage' },
};

// 아이콘 키 타입 정의
type IconKey = keyof typeof ICONS;

const FooterBar: React.FC = () => {
  const location = useLocation(); // 현재 경로를 가져오기 위해 사용
  const navigate = useNavigate(); // 페이지 이동을 위해 사용

  // 현재 경로에 따라 활성화된 아이콘을 결정하는 함수
  const determineActiveIcon = useCallback((pathname: string): IconKey => {
    if (pathname === '/') return 'home';
    if (pathname.includes('news')) return 'news';
    if (pathname.includes('announcements')) return 'announcements';
    if (pathname.includes('bookmarks')) return 'bookmarks';
    if (pathname.includes('mypage')) return 'myPage';
    return 'home'; // 기본값 설정
  }, []);

  // 활성화된 아이콘을 관리하는 상태
  const [activeIcon, setActiveIcon] = useState<IconKey>(determineActiveIcon(location.pathname));

  // 경로가 변경될 때마다 활성화된 아이콘을 업데이트
  useEffect(() => {
    setActiveIcon(determineActiveIcon(location.pathname));
  }, [location.pathname, determineActiveIcon]);

  // 아이콘 클릭 시 활성화된 아이콘을 설정하고 해당 경로로 이동
  const handleIconClick = useCallback((iconKey: IconKey) => {
    setActiveIcon(iconKey);
    navigate(ICONS[iconKey].path);
  }, [navigate]);

  return (
    <div className="fixed inset-x-0 bottom-0 bg-white border-t border-gray-300 py-2 flex justify-around items-center z-10 text-xs">
      {Object.entries(ICONS).map(([key, { active, inactive, label, path }]) => (
        <button
          key={key}
          aria-label={label}
          className="flex-1"
          onClick={() => handleIconClick(key as IconKey)}
        >
          <div className="flex flex-col items-center justify-center">
            {activeIcon === key ? React.createElement(active, { className: "text-indigo-500 text-xl" }) : React.createElement(inactive, { className: "text-gray-800 text-xl" })}
            <span className="text-gray-600 text-[10px]">{label}</span>
          </div>
        </button>
      ))}
    </div>
  );
};

export default FooterBar;
