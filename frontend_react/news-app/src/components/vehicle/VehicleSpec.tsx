// src/components/CarSpecCard.tsx
import React from 'react';

const CarSpecCard: React.FC<{ specs: CarSpecs }> = ({ specs }) => {
  return (
    <div className="bg-white p-4 rounded-lg border-solid border border-indigo-600 tracking-tighter mb-4 mt-2 relative">
      <h3 className="text-xl pb-4 font-bold">{specs.manufacturer} {specs.model}</h3>
      <a href="#none" className="inline-flex items-center text-blue-500 hover:text-blue-700 transition-colors absolute right-4 top-4">
        <span>More View</span>
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
        </svg>
      </a>
      <ul className="space-y-1 divide-y divide-solid">
      <li className="flex flex-row items-center">
          <span className="basis-1/4 break-keep text-xs font-bold">Drive Type</span>
          <span className="basis-1/4 text-right text-xs break-keep">{specs.drive_type}</span>
          <span className="basis-1/4 break-keep text-xs pl-2 font-bold">Battery Type</span>
          <span className="basis-1/4 text-right text-xs break-keep">{specs.battery_type}</span>
        </li>
        <li className="flex flex-row items-center">
          <span className="basis-1/4 break-keep text-xs font-bold">Battery Capacity</span>
          <span className="basis-1/4 text-right text-xs break-keep">{specs.battery_capacity} kWh</span>
          <span className="basis-1/4 break-keep text-xs pl-2 font-bold">Range</span>
          <span className="basis-1/4 text-right text-xs break-keep">{specs.range_km} km</span>
        </li>
        <li className="flex flex-row items-center">
          <span className="basis-1/4 break-keep text-xs font-bold">Acceleration</span>
          <span className="basis-1/4 text-right text-xs break-keep">{specs.acceleration} s to 100 km/h</span>
          <span className="basis-1/4 break-keep text-xs pl-2 font-bold">Weight</span>
          <span className="basis-1/4 text-right text-xs break-keep">{specs.weight_kg} kg</span>
        </li>
        <li className="flex flex-row items-center">
          <span className="basis-1/4 break-keep text-xs font-bold">Storage</span>
          <span className="basis-1/4 text-right text-xs break-keep">{specs.storage_l} L</span>
          <span className="basis-1/4 break-keep text-xs pl-2 font-bold">Wheel Size</span>
          <span className="basis-1/4 text-right text-xs break-keep">{specs.wheel_size}</span>
        </li>
        <li className="flex flex-row items-center">
          <span className="basis-1/4 break-keep text-xs font-bold">Seating Capacity</span>
          <span className="basis-1/4 text-right text-xs break-keep">{specs.seating_capacity}</span>
          <span className="basis-1/4 break-keep text-xs pl-2 font-bold">Display</span>
          <span className="basis-1/4 text-right text-xs break-keep">{specs.display_inch} inch</span>
        </li>
        <li className="flex flex-row items-center">
          <span className="basis-1/4 break-keep text-xs font-bold">Ground Clearance</span>
          <span className="basis-1/4 text-right text-xs break-keep">{specs.minimum_ground_clearance_mm} mm</span>
          <span className="basis-1/4 break-keep text-xs pl-2 font-bold">Dimensions</span>
          <span className="basis-1/4 text-right text-xs break-keep">{specs.width_mm}mm W x {specs.height_mm}mm H x {specs.length_mm}mm L</span>
        </li>
      </ul>
    </div>
  );
};

export default CarSpecCard;
