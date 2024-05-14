// src/components/CarSpecCard.tsx
import React from 'react';

interface CarSpecs {
  manufacturer: string;
  model: string;
  drive_type: string;
  battery_type: string;
  battery_capacity: number;
  range_km: number;
  acceleration: number;
  weight_kg: number;
  storage_l: number;
  wheel_size: string;
  seating_capacity: number;
  display_inch: number;
  minimum_ground_clearance_mm: number;
  width_mm: number;
  height_mm: number;
  length_mm: number;
}

const CarSpecCard: React.FC<{ specs: CarSpecs }> = ({ specs }) => {
  return (
    <div className="bg-white p-4 rounded-lg border-solid border border-indigo-600 font-mono tracking-tighter mb-4 mt-2">
      <h3 className="text-xl pb-4 font-bold">{specs.manufacturer} {specs.model}</h3>
      <ul className="space-y-1 divide-y divide-solid">
        <li className="flex flex-row"><span className="basis-2/4 break-keep mt-1">Drive Type</span><span className="basis-1/2 text-right text-sm mt-1">{specs.drive_type}</span></li>
        <li className="flex flex-row"><span className="basis-2/4 break-keep mt-1">Battery Type</span><span className="basis-2/3 text-right text-sm mt-1">{specs.battery_type}</span></li>
        <li className="flex flex-row"><span className="basis-2/4 break-keep mt-1">Battery Capacity</span><span className="basis-2/3 text-right text-sm mt-1">{specs.battery_capacity} kWh</span></li>
        <li className="flex flex-row"><span className="basis-2/4 break-keep mt-1">Range</span><span className="basis-2/3 text-right text-sm mt-1">{specs.range_km} km</span></li>
        <li className="flex flex-row"><span className="basis-2/4 break-keep mt-1">Acceleration</span><span className="basis-2/3 text-right text-sm mt-1">{specs.acceleration} s to 100 km/h</span></li>
        <li className="flex flex-row"><span className="basis-2/4 break-keep mt-1">Weight</span><span className="basis-2/3 text-right text-sm mt-1">{specs.weight_kg} kg</span></li>
        <li className="flex flex-row"><span className="basis-2/4 break-keep mt-1">Storage</span><span className="basis-2/3 text-right text-sm mt-1">{specs.storage_l} L</span></li>
        <li className="flex flex-row"><span className="basis-2/4 break-keep mt-1">Wheel Size</span><span className="basis-2/3 text-right text-sm mt-1">{specs.wheel_size}</span></li>
        <li className="flex flex-row"><span className="basis-2/4 break-keep mt-1">Seating Capacity</span><span className="basis-2/3 text-right text-sm mt-1">{specs.seating_capacity}</span></li>
        <li className="flex flex-row"><span className="basis-2/4 break-keep mt-1">Display</span><span className="basis-2/3 text-right text-sm mt-1">{specs.display_inch} inch</span></li>
        <li className="flex flex-row"><span className="basis-2/4 break-keep mt-1">Ground Clearance</span><span className="basis-2/3 text-right text-sm mt-1">{specs.minimum_ground_clearance_mm} mm</span></li>
        <li className="flex flex-row"><span className="basis-2/4 break-keep mt-1">Dimensions</span><span className="basis-2/3 text-right text-sm mt-1">{specs.width_mm}mm W x {specs.height_mm}mm H x {specs.length_mm}mm L</span></li>
      </ul>
    </div>
  );
};

export default CarSpecCard;
