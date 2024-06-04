// src/components/vehicle/SubsidyInformation.tsx
import React from 'react';
import { useLocation } from 'react-router-dom';
import { VehicleDetails } from '@/types';

const SubsidyInformation: React.FC = () => {
    const location = useLocation();
    const vehicle = location.state.vehicle as VehicleDetails;

    return (
        <div className="max-w-md mx-auto p-5 bg-white shadow-lg rounded-lg">
            <h2 className="text-xl font-bold mb-4">{vehicle.model} {vehicle.drive_type}</h2>
            <p>주행거리: {vehicle.range_km} km</p>
            <p>차량 출고가: {vehicle.vehicle_price} 만원</p>
            <p>국가 보조금: {vehicle.national_subsidy} 만원</p>
            <p>지자체 보조금: {vehicle.local_subsidy} 만원</p>
            <p>최종 가격: {vehicle.final_price} 만원</p>
        </div>
    );
};

export default SubsidyInformation;
