// src/components/FooterBar.tsx
import React from 'react';
import { IoHome, IoPaperPlane, IoPerson, IoFlash   } from 'react-icons/io5';

const FooterBar: React.FC = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-300 p-4 flex justify-around z-10">
      <IoFlash className="text-gray-800 text-2xl" />
      <IoHome className="text-gray-800 text-2xl" />
      <IoPaperPlane className="text-gray-800 text-2xl" />
      <IoPerson className="text-gray-800 text-2xl" />
    </div>
  );
};

export default FooterBar;
