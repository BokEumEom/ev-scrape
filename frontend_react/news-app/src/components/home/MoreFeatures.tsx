// src/components/home/MoreFeatures.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import {
  IoRocketSharp, IoCalendarNumberSharp, IoBatteryChargingSharp,
  IoFlashSharp, IoPerson, IoBarChartSharp, IoGiftSharp, IoRibbonSharp,
  IoSettings, IoQrCodeOutline
} from 'react-icons/io5';
import { FaChargingStation, FaMap } from 'react-icons/fa6';

const MoreFeatures: React.FC = () => (
  <div className="bg-white mt-4 p-6 rounded-lg shadow-md"> {/* [J] 0604 mt-4 추가 */}
    <h2 className="text-lg font-semibold mb-4">More Features</h2>
    <div className="grid grid-cols-4 gap-6">
      <Link to="/map" className="flex flex-col items-center text-center space-y-2 transition transform hover:scale-105" aria-label="Charging Stations">
        <FaChargingStation className="text-4xl text-purple-500" />
        <p className="text-sm">충전소</p>
      </Link>
      <Link to="/map" className="flex flex-col items-center text-center space-y-2 transition transform hover:scale-105" aria-label="Map">
        <FaMap className="text-4xl text-indigo-500" />
        <p className="text-sm">지도</p>
      </Link>
      <Link to="/add-vehicle" className="flex flex-col items-center text-center space-y-2 transition transform hover:scale-105" aria-label="Add Vehicle">
        <IoFlashSharp className="text-4xl text-blue-500" />
        <p className="text-sm">차량추가</p>
      </Link>
      <Link to="/mypage" className="flex flex-col items-center text-center space-y-2 transition transform hover:scale-105" aria-label="My Page">
        <IoPerson className="text-4xl text-green-500" />
        <p className="text-sm">마이페이지</p>
      </Link>
      <Link to="/ev-registration" className="flex flex-col items-center text-center space-y-2 transition transform hover:scale-105" aria-label="Search">
        <IoBarChartSharp className="text-4xl text-yellow-500" />
        <p className="text-sm">전기차등록현황</p>
      </Link>
      <Link to="/gift" className="flex flex-col items-center text-center space-y-2 transition transform hover:scale-105" aria-label="Gift">
        <IoGiftSharp className="text-4xl text-gray-500" />
        <p className="text-sm">선물하기</p>
      </Link>
      <Link to="/events" className="flex flex-col items-center text-center space-y-2 transition transform hover:scale-105" aria-label="Events">
        <IoRibbonSharp className="text-4xl text-red-500" />
        <p className="text-sm">이벤트</p>
      </Link>
      <Link to="/attendance" className="flex flex-col items-center text-center space-y-2 transition transform hover:scale-105" aria-label="Attendance">
        <IoCalendarNumberSharp className="text-4xl text-sky-500" />
        <p className="text-sm">출석체크</p>
      </Link>
      <Link to="/rates" className="flex flex-col items-center text-center space-y-2 transition transform hover:scale-105" aria-label="Rates">
        <IoBatteryChargingSharp className="text-4xl text-rose-500" />
        <p className="text-sm">요금정보</p>
      </Link>
      <Link to="/qr" className="flex flex-col items-center text-center space-y-2 transition transform hover:scale-105" aria-label="QR">
        <IoQrCodeOutline className="text-4xl text-lime-500" />
        <p className="text-sm">QR</p>
      </Link>
      <Link to="/game" className="flex flex-col items-center text-center space-y-2 transition transform hover:scale-105" aria-label="Game">
        <IoRocketSharp className="text-4xl text-emerald-500" />
        <p className="text-sm">게임</p>
      </Link>
      <Link to="/settings" className="flex flex-col items-center text-center space-y-2 transition transform hover:scale-105" aria-label="Settings">
        <IoSettings className="text-4xl text-cyan-500" />
        <p className="text-sm">설정</p>
      </Link>
    </div>
  </div>
);

export default MoreFeatures;
