// src/components/FooterBar.tsx
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { IoHomeSharp, IoBookmarkOutline, IoPerson, IoChatbubbleEllipsesOutline, IoSearchOutline } from 'react-icons/io5';
import SearchBar from './SearchBar';

const FooterBar: React.FC = () => {
  // This hook gives you access to the navigation function
  const navigate = useNavigate();

  return (
      <div className="fixed inset-x-0 bottom-0 bg-white border-t border-gray-300 py-4 flex justify-between items-center z-10">
        <button aria-label="Home" className="flex-1" onClick={() => navigate('/')}>
          <IoHomeSharp className="mx-auto text-gray-800 text-xl hover:text-blue-500" />
        </button>
        <button aria-label="Search" className="flex-1" onClick={() => navigate('/search')}>
          <IoSearchOutline className="mx-auto text-gray-800 text-xl hover:text-blue-500" />
        </button>
        <button aria-label="Home" className="flex-1">
          <IoChatbubbleEllipsesOutline className="mx-auto text-gray-800 text-xl hover:text-blue-500" />
        </button>
        <button aria-label="Bookmark" className="flex-1">
          <IoBookmarkOutline className="mx-auto text-gray-800 text-xl hover:text-blue-500" />
        </button>
        <button aria-label="Profile" className="flex-1">
          <IoPerson className="mx-auto text-gray-800 text-xl hover:text-blue-500" />
        </button>
      </div>
  );
};

export default FooterBar;
