// src/components/VehicleSpec.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SpecItemProps, VehicleDetails } from '../../types';

const SpecItem: React.FC<SpecItemProps> = ({ label, value, additionalLabel, additionalValue }) => (
  <li className="flex flex-row items-center py-1">
    <span className="basis-1/6 break-keep text-xs font-bold">{label}</span>
    <span className="basis-2/6 text-right text-xs break-keep text-gray-600">{value}</span>
    {additionalLabel && additionalValue !== undefined && (
      <>
        <span className="basis-1/6 break-keep text-xs pl-3 font-bold">{additionalLabel}</span>
        <span className="basis-2/6 text-right text-xs break-keep text-gray-600">{additionalValue}</span>
      </>
    )}
  </li>
);

const VehicleSpec: React.FC<{ specs: VehicleDetails }> = ({ specs }) => {
  const navigate = useNavigate();
  const handleMoreViewClick = () => {
    navigate(`/vehicle-spec-detail/${specs.id}`, { state: { specs } });
  };
  return (
    <div className="bg-white p-3 rounded-lg border-solid border border-gray-300 tracking-tighter mb-4 mt-2 relative">
      <h3 className="text-xl pb-3 font-bold">{specs.manufacturer} {specs.model}</h3>
      <button onClick={handleMoreViewClick} className="inline-flex items-center text-gray-900 hover:text-blue-700 transition-colors absolute right-4 top-4">
        <span>More View</span>
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
        </svg>
      </button>
      <ul className="space-y-1 divide-y divide-solid">
      <SpecItem label="구동 방식" value={specs.drive_type} additionalLabel="배터리 유형" additionalValue={specs.battery_type} />
      <SpecItem label="배터리 용량" value={`${specs.battery_capacity} kWh`} additionalLabel="주행 거리" additionalValue={`${specs.range_km} km`} />
      <SpecItem label="가속력" value={`${specs.acceleration} s to 100 km/h`} additionalLabel="무게" additionalValue={`${specs.weight_kg} kg`} />
      {/* <SpecItem label="저장 용량" value={`${specs.storage_l} L`} additionalLabel="휠 크기" additionalValue={specs.wheel_size} />
      <SpecItem label="좌석 수" value={specs.seating_capacity} additionalLabel="디스플레이" additionalValue={`${specs.display_inch} inch`} />
      <SpecItem label="최소 지상고" value={`${specs.minimum_ground_clearance_mm} mm`} additionalLabel="치수" additionalValue={`${specs.width_mm}mm W x ${specs.height_mm}mm H x ${specs.length_mm}mm L`} /> */}
      </ul>
    </div>
  );
};

export default VehicleSpec;