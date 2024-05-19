// src/components/vehicle/VehicleSpecDetail.tsx
import React, { useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { VehicleDetails } from '../../types';
import dummyImage from '../../assets/dummy.png'; // 이미지 경로

const tabs = [
  '전체', '모의견적', '기본정보', '제원', '중고시세', '오너평가', '포토', '정보'
];

const VehicleSpecDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const vehicleDetails: VehicleDetails = location.state?.specs;
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(tabs[0]);

  if (!vehicleDetails || vehicleDetails.id !== Number(id)) {
    return <div>Loading...</div>;
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case '기본정보':
        return (
          <div className="mt-4 flex flex-col space-y-2">
            <h4 className="text-lg font-semibold">기본정보</h4>
            <ul className="space-y-1 divide-y divide-solid">
              <li className="flex flex-row items-center">
                <span className="basis-1/4 break-keep text-xs font-bold">구동 방식</span>
                <span className="basis-3/4 text-right text-xs break-keep text-gray-600">{vehicleDetails.drive_type}</span>
              </li>
              <li className="flex flex-row items-center">
                <span className="basis-1/4 break-keep text-xs font-bold">배터리 유형</span>
                <span className="basis-3/4 text-right text-xs break-keep text-gray-600">{vehicleDetails.battery_type}</span>
              </li>
              <li className="flex flex-row items-center">
                <span className="basis-1/4 break-keep text-xs font-bold">배터리 용량</span>
                <span className="basis-3/4 text-right text-xs break-keep text-gray-600">{vehicleDetails.battery_capacity} kWh</span>
              </li>
              <li className="flex flex-row items-center">
                <span className="basis-1/4 break-keep text-xs font-bold">주행 거리</span>
                <span className="basis-3/4 text-right text-xs break-keep text-gray-600">{vehicleDetails.range_km} km</span>
              </li>
              <li className="flex flex-row items-center">
                <span className="basis-1/4 break-keep text-xs font-bold">가속력</span>
                <span className="basis-3/4 text-right text-xs break-keep text-gray-600">{vehicleDetails.acceleration} s to 100 km/h</span>
              </li>
              <li className="flex flex-row items-center">
                <span className="basis-1/4 break-keep text-xs font-bold">무게</span>
                <span className="basis-3/4 text-right text-xs break-keep text-gray-600">{vehicleDetails.weight_kg} kg</span>
              </li>
              <li className="flex flex-row items-center">
                <span className="basis-1/4 break-keep text-xs font-bold">저장 용량</span>
                <span className="basis-3/4 text-right text-xs break-keep text-gray-600">{vehicleDetails.storage_l} L</span>
              </li>
              <li className="flex flex-row items-center">
                <span className="basis-1/4 break-keep text-xs font-bold">휠 크기</span>
                <span className="basis-3/4 text-right text-xs break-keep text-gray-600">{vehicleDetails.wheel_size}</span>
              </li>
              <li className="flex flex-row items-center">
                <span className="basis-1/4 break-keep text-xs font-bold">좌석 수</span>
                <span className="basis-3/4 text-right text-xs break-keep text-gray-600">{vehicleDetails.seating_capacity}</span>
              </li>
              <li className="flex flex-row items-center">
                <span className="basis-1/4 break-keep text-xs font-bold">디스플레이</span>
                <span className="basis-3/4 text-right text-xs break-keep text-gray-600">{vehicleDetails.display_inch} inch</span>
              </li>
              <li className="flex flex-row items-center">
                <span className="basis-1/4 break-keep text-xs font-bold">최소 지상고</span>
                <span className="basis-3/4 text-right text-xs break-keep text-gray-600">{vehicleDetails.minimum_ground_clearance_mm} mm</span>
              </li>
              <li className="flex flex-row items-center">
                <span className="basis-1/4 break-keep text-xs font-bold">치수</span>
                <span className="basis-3/4 text-right text-xs break-keep text-gray-600">{vehicleDetails.width_mm}mm W x {vehicleDetails.height_mm}mm H x {vehicleDetails.length_mm}mm L</span>
              </li>
            </ul>
          </div>
        );
      // 다른 탭의 콘텐츠 추가
      default:
        return <div>이 탭에 대한 콘텐츠가 없습니다.</div>;
    }
  };

  return (
    <div className="p-4">
      <div className="mt-14">
        <button onClick={() => navigate(-1)} className="mb-4 flex items-center">
            <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="sr-only">뒤로가기</span>
        </button>
        <div className="flex items-center overflow-x-auto space-x-4 relative">
        
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`p-2 whitespace-nowrap rounded-md ${activeTab === tab ? 'bg-black text-white' : 'bg-white text-black-500'}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
          <div className="absolute right-0 top-0 bottom-0 flex items-center bg-gradient-to-l from-white to-transparent">
          </div>
        </div>
      </div>
      <div className="bg-white tracking-tighter mb-4 mt-2 relative">
        <div>
          <div>
            <h3 className="text-2xl pb-2 font-bold">{vehicleDetails.manufacturer} {vehicleDetails.model}</h3>
          </div>
          <img src={dummyImage} alt="Vehicle" className="w-full h-50 object-cover rounded-lg" />
        </div>
        {renderTabContent()}
      </div>
    </div>
  );
};

export default VehicleSpecDetail;
