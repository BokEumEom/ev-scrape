// src/pages/HomePage.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FaChargingStation, FaMap } from 'react-icons/fa6';
import { 
  IoNewspaper, 
  IoRocketSharp, 
  IoCalendarNumberSharp, 
  IoMegaphone, 
  IoPeopleSharp, 
  IoCarSport, 
  IoSearch, 
  IoGiftSharp, 
  IoRibbonSharp, 
  IoPerson,
  IoSettings,
  IoQrCodeOutline,
  IoFlashSharp,
  IoBatteryChargingSharp 
} from 'react-icons/io5';
import Layout from '@/components/Layout';

const HomePage: React.FC = () => {
  return (
    <Layout>
      <div className="p-4 space-y-6 bg-gray-100">
        {/* Top Cards */}
        <div className="grid grid-cols-2 gap-4">
          <Link to="/news" className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white p-4 rounded-lg shadow-md flex flex-col items-start space-y-2 transition transform hover:scale-105">
            <h2 className="text-lg font-semibold">뉴스</h2>
            <p className="text-sm">Stay updated with the latest EV news</p>
            <IoNewspaper className="text-3xl" />
          </Link>
          <Link to="/announcements" className="bg-gradient-to-r from-green-500 to-teal-500 text-white p-4 rounded-lg shadow-md flex flex-col items-start space-y-2 transition transform hover:scale-105">         
            <h2 className="text-lg font-semibold">공고</h2>
            <p className="text-sm">Important updates and announcements</p>
            <IoMegaphone className="text-3xl" />
          </Link>
          <Link to="/community" className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white p-4 rounded-lg shadow-md flex flex-col items-start space-y-2 transition transform hover:scale-105">
            <h2 className="text-lg font-semibold">커뮤니티</h2>
            <p className="text-sm">Join the discussion with other EV enthusiasts</p>
            <IoPeopleSharp className="text-3xl" />
          </Link>
          <Link to="/vehicle-specs" className="bg-gradient-to-r from-red-500 to-pink-500 text-white p-4 rounded-lg shadow-md flex flex-col items-start space-y-2 transition transform hover:scale-105">        
            <h2 className="text-lg font-semibold">전기차 제원</h2>
            <p className="text-sm">Detailed specs of various EVs</p>
            <IoCarSport className="text-3xl" />
          </Link>
        </div>
        
        {/* Middle Cards */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">More Features</h2>
          <div className="grid grid-cols-4 gap-6">
            <Link to="/map" className="flex flex-col items-center text-center space-y-2 transition transform hover:scale-105">
              <FaChargingStation className="text-4xl text-purple-500" />
              <p className="text-sm">충전소</p>
            </Link>
            <Link to="/map" className="flex flex-col items-center text-center space-y-2 transition transform hover:scale-105">
              <FaMap className="text-4xl text-indigo-500" />
              <p className="text-sm">지도</p>
            </Link>
            <Link to="/add-vehicle" className="flex flex-col items-center text-center space-y-2 transition transform hover:scale-105">
              <IoFlashSharp className="text-4xl text-blue-500" />
              <p className="text-sm">차량추가</p>
            </Link>
            <Link to="/mypage" className="flex flex-col items-center text-center space-y-2 transition transform hover:scale-105">
              <IoPerson className="text-4xl text-green-500" />
              <p className="text-sm">마이페이지</p>
            </Link>
            <Link to="/search" className="flex flex-col items-center text-center space-y-2 transition transform hover:scale-105">
              <IoSearch className="text-4xl text-yellow-500" />
              <p className="text-sm">검색</p>
            </Link>
            <Link to="/gift" className="flex flex-col items-center text-center space-y-2 transition transform hover:scale-105">
              <IoGiftSharp className="text-4xl text-gray-500" />
              <p className="text-sm">선물하기</p>
            </Link>
            <Link to="/events" className="flex flex-col items-center text-center space-y-2 transition transform hover:scale-105">
              <IoRibbonSharp className="text-4xl text-red-500" />
              <p className="text-sm">이벤트</p>
            </Link>
            <Link to="/attendance" className="flex flex-col items-center text-center space-y-2 transition transform hover:scale-105">
              <IoCalendarNumberSharp className="text-4xl text-sky-500" />
              <p className="text-sm">출석체크</p>
            </Link>
            <Link to="/attendance" className="flex flex-col items-center text-center space-y-2 transition transform hover:scale-105">
              <IoBatteryChargingSharp className="text-4xl text-rose-500" />
              <p className="text-sm">요금정보</p>
            </Link>
            <Link to="/attendance" className="flex flex-col items-center text-center space-y-2 transition transform hover:scale-105">
              <IoQrCodeOutline className="text-4xl text-lime-500" />
              <p className="text-sm">QR</p>
            </Link>
            <Link to="/attendance" className="flex flex-col items-center text-center space-y-2 transition transform hover:scale-105">
              <IoRocketSharp className="text-4xl text-emerald-500" />
              <p className="text-sm">게임</p>
            </Link>
            <Link to="/attendance" className="flex flex-col items-center text-center space-y-2 transition transform hover:scale-105">
              <IoSettings className="text-4xl text-cyan-500" />
              <p className="text-sm">설정</p>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
