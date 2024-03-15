// src/components/FooterBar.tsx
import React from 'react';
import { IoHomeSharp, IoShareOutline, IoPerson, IoMenuOutline, IoSearchOutline } from 'react-icons/io5';

const FooterBar: React.FC = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-300 p-4 flex justify-around z-10">
      <IoMenuOutline  className="text-gray-800 text-2xl" />
      <IoSearchOutline className="text-gray-800 text-2xl" />
      <IoHomeSharp  className="text-gray-800 text-2xl" />
      <IoShareOutline className="text-gray-800 text-2xl" />
      <IoPerson className="text-gray-800 text-2xl" />
    </div>
  );
};

export default FooterBar;
