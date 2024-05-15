// src/components/VehicleSpec.tsx
import React from 'react';
import { SpecItemProps } from '../../types';
import { VehicleDetails } from '../../types';

const SpecItem: React.FC<SpecItemProps> = ({ label, value, additionalLabel, additionalValue }) => (
  <li className="flex flex-row items-center">
    <span className="basis-1/4 break-keep text-xs font-bold">{label}</span>
    <span className="basis-1/4 text-right text-xs break-keep">{value}</span>
    {additionalLabel && additionalValue !== undefined && (
      <>
        <span className="basis-1/4 break-keep text-xs pl-2 font-bold">{additionalLabel}</span>
        <span className="basis-1/4 text-right text-xs break-keep">{additionalValue}</span>
      </>
    )}
  </li>
);

const VehicleSpec: React.FC<{ specs: VehicleDetails }> = ({ specs }) => {
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
        <SpecItem label="Drive Type" value={specs.drive_type} additionalLabel="Battery Type" additionalValue={specs.battery_type} />
        <SpecItem label="Battery Capacity" value={`${specs.battery_capacity} kWh`} additionalLabel="Range" additionalValue={`${specs.range_km} km`} />
        <SpecItem label="Acceleration" value={`${specs.acceleration} s to 100 km/h`} additionalLabel="Weight" additionalValue={`${specs.weight_kg} kg`} />
        <SpecItem label="Storage" value={`${specs.storage_l} L`} additionalLabel="Wheel Size" additionalValue={specs.wheel_size} />
        <SpecItem label="Seating Capacity" value={specs.seating_capacity} additionalLabel="Display" additionalValue={`${specs.display_inch} inch`} />
        <SpecItem label="Ground Clearance" value={`${specs.minimum_ground_clearance_mm} mm`} additionalLabel="Dimensions" additionalValue={`${specs.width_mm}mm W x ${specs.height_mm}mm H x ${specs.length_mm}mm L`} />
      </ul>
    </div>
  );
};

export default VehicleSpec;