// src/components/home/TopCards.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { IoNewspaper, IoMegaphone, IoPeopleSharp, IoCarSport } from 'react-icons/io5';

const TopCards: React.FC = () => (
  <div className="grid grid-cols-2 gap-4">
    <Link to="/news" className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white p-4 rounded-lg shadow-md flex flex-col items-start space-y-2 transition transform hover:scale-105" aria-label="News">
      <h2 className="text-lg font-semibold">뉴스</h2>
      <p className="text-sm">Stay updated with the latest EV news</p>
      <IoNewspaper className="text-3xl" />
    </Link>
    <Link to="/announcements" className="bg-gradient-to-r from-green-500 to-teal-500 text-white p-4 rounded-lg shadow-md flex flex-col items-start space-y-2 transition transform hover:scale-105" aria-label="Announcements">         
      <h2 className="text-lg font-semibold">공고</h2>
      <p className="text-sm">Important updates and announcements</p>
      <IoMegaphone className="text-3xl" />
    </Link>
    <Link to="/community" className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white p-4 rounded-lg shadow-md flex flex-col items-start space-y-2 transition transform hover:scale-105" aria-label="Community">
      <h2 className="text-lg font-semibold">커뮤니티</h2>
      <p className="text-sm">Join the discussion with other EV enthusiasts</p>
      <IoPeopleSharp className="text-3xl" />
    </Link>
    <Link to="/vehiclespec" className="bg-gradient-to-r from-red-500 to-pink-500 text-white p-4 rounded-lg shadow-md flex flex-col items-start space-y-2 transition transform hover:scale-105" aria-label="Vehicle Specs">        
      <h2 className="text-lg font-semibold">전기차 제원</h2>
      <p className="text-sm">Detailed specs of various EVs</p>
      <IoCarSport className="text-3xl" />
    </Link>
  </div>
);

export default TopCards;
