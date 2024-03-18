// src/components/FooterBar.tsx
import React from 'react';
import { IoHomeSharp, IoShareOutline, IoPerson, IoMenuOutline, IoSearchOutline } from 'react-icons/io5';

const FooterBar: React.FC = () => {
  return (
    <div className="fixed inset-x-0 bottom-0 bg-white border-t border-gray-300 py-4 flex justify-between items-center z-10">
      <button aria-label="Menu" className="flex-1">
        <IoMenuOutline className="mx-auto text-gray-800 text-3xl hover:text-blue-500" />
      </button>
      <button aria-label="Search" className="flex-1">
        <IoSearchOutline className="mx-auto text-gray-800 text-3xl hover:text-blue-500" />
      </button>
      <button aria-label="Home" className="flex-1">
        <IoHomeSharp className="mx-auto text-gray-800 text-3xl hover:text-blue-500" />
      </button>
      <button aria-label="Share" className="flex-1">
        <IoShareOutline className="mx-auto text-gray-800 text-3xl hover:text-blue-500" />
      </button>
      <button aria-label="Profile" className="flex-1">
        <IoPerson className="mx-auto text-gray-800 text-3xl hover:text-blue-500" />
      </button>
    </div>
  );
};

export default FooterBar;
