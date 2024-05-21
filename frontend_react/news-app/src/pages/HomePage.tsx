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
      <div className="p-4 space-y-6">
        {/* Top Cards */}
        <div className="grid grid-cols-2 gap-2">
          <Link to="/news" className="relative bg-gradient-to-r from-blue-500 to-indigo-500 text-white p-6 rounded-xl flex flex-col items-start space-y-1 transition transform hover:scale-105">
            <h2 className="text-md font-semibold">뉴스</h2>
            <p className="text-xs">전기차 뉴스를<br/>한눈에 확인하세요</p>
            <IoNewspaper className="text-5xl absolute top-1 right-4 opacity-20" />
          </Link>
          <Link to="/announcements" className="relative bg-gradient-to-r from-blue-500 to-indigo-500 text-white p-6 rounded-xl flex flex-col items-start space-y-1 transition transform hover:scale-105">         
            <h2 className="text-md font-semibold">공고</h2>
            <p className="text-xs">전기차관련<br/> 지자체 공고 정보</p>
            <IoMegaphone className="text-5xl absolute top-1 right-4 opacity-20" />
          </Link>
          <Link to="/community" className="relative bg-blue-500 text-white p-6 rounded-xl flex flex-col items-start space-y-1 transition transform hover:scale-105">
            <h2 className="text-md font-semibold">커뮤니티</h2>
            <p className="text-xs">전기차 매니아들의<br/>즐거운 이야기</p>
            <IoPeopleSharp className="text-5xl absolute top-1 right-4 opacity-20" />
          </Link>
          <Link to="/vehicle-specs" className="relative bg-blue-500 text-white p-6 rounded-xl flex flex-col items-start space-y-1 transition transform hover:scale-105">        
            <h2 className="text-md font-semibold">전기차 제원</h2>
            <p className="text-xs">전기차 제원을 <br/>알아볼까요?</p>
            <IoCarSport className="text-5xl absolute top-1 right-4 opacity-20" />
          </Link>
        </div>
        
        {/* Middle Cards */}
        <div className="bg-white">
          <h2 className="sr-only">More Features</h2>
          <div className="grid grid-cols-4 gap-4 py-4 bg-blue-50  rounded-xl">
            <Link to="/map" className="flex flex-col items-center text-center space-y-2 transition transform hover:scale-105">
              <FaChargingStation className="text-4xl text-indigo-500" />
              <p className="text-sm text-blue-900">충전소</p>
            </Link>
            <Link to="/map" className="flex flex-col items-center text-center space-y-2 transition transform hover:scale-105">
              <FaMap className="text-4xl text-indigo-500" />
              <p className="text-sm text-blue-900">지도</p>
            </Link>
            <Link to="/add-vehicle" className="flex flex-col items-center text-center space-y-2 transition transform hover:scale-105">
              <IoFlashSharp className="text-4xl text-indigo-500" />
              <p className="text-sm text-blue-900">차량추가</p>
            </Link>
            <Link to="/mypage" className="flex flex-col items-center text-center space-y-2 transition transform hover:scale-105">
              <IoPerson className="text-4xl text-indigo-500" />
              <p className="text-sm text-blue-900">마이페이지</p>
            </Link>
            <Link to="/search" className="flex flex-col items-center text-center space-y-2 transition transform hover:scale-105">
              <IoSearch className="text-4xl text-indigo-500" />
              <p className="text-sm text-blue-900">검색</p>
            </Link>
            <Link to="/gift" className="flex flex-col items-center text-center space-y-2 transition transform hover:scale-105">
              <IoGiftSharp className="text-4xl text-indigo-500" />
              <p className="text-sm text-blue-900">선물하기</p>
            </Link>
            <Link to="/events" className="flex flex-col items-center text-center space-y-2 transition transform hover:scale-105">
              <IoRibbonSharp className="text-4xl text-indigo-500" />
              <p className="text-sm text-blue-900">이벤트</p>
            </Link>
            <Link to="/attendance" className="flex flex-col items-center text-center space-y-2 transition transform hover:scale-105">
              <IoCalendarNumberSharp className="text-4xl text-indigo-500" />
              <p className="text-sm text-blue-900">출석체크</p>
            </Link>
            <Link to="/attendance" className="flex flex-col items-center text-center space-y-2 transition transform hover:scale-105">
              <IoBatteryChargingSharp className="text-4xl text-indigo-500" />
              <p className="text-sm text-blue-900">요금정보</p>
            </Link>
            <Link to="/attendance" className="flex flex-col items-center text-center space-y-2 transition transform hover:scale-105">
              <IoQrCodeOutline className="text-4xl text-indigo-500" />
              <p className="text-sm text-blue-900">QR</p>
            </Link>
            <Link to="/attendance" className="flex flex-col items-center text-center space-y-2 transition transform hover:scale-105">
              <IoRocketSharp className="text-4xl text-indigo-500" />
              <p className="text-sm text-blue-900">게임</p>
            </Link>
            <Link to="/attendance" className="flex flex-col items-center text-center space-y-2 transition transform hover:scale-105">
              <IoSettings className="text-4xl text-indigo-500" />
              <p className="text-sm text-blue-900">설정</p>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
