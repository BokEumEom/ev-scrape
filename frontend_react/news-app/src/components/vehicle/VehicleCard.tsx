// src/components/vehicle/VehicleCard.tsx
import React from 'react';
import { VehicleDetails } from '@/types';
import dummyImage from '@/assets/dummy.png';

interface VehicleCardProps {
    vehicle: VehicleDetails;
    isFavorite: boolean;
    onToggleFavorite: (vehicle: VehicleDetails) => void;
}

const VehicleCard: React.FC<VehicleCardProps> = React.memo(({ vehicle, isFavorite, onToggleFavorite }) => {
    return (
        <div className="flex flex-col justify-between items-center mb-4 p-4 border rounded-lg shadow-md">
            <img src={dummyImage} alt="Vehicle" className="w-full h-40 object-cover rounded-lg mb-4" />
            <div className="text-center">
                <h2 className="text-lg font-bold">{vehicle.model} {vehicle.drive_type}</h2>
                <p>주행거리: {vehicle.range_km}</p>
                <p>차량 출고가: {vehicle.vehicle_price}만원</p>
                <p>보조금 적용: {vehicle.national_subsidy + vehicle.local_subsidy}만원</p>
                <p>최종 가격: {vehicle.final_price}만원</p>
            </div>
            <button 
                onClick={() => onToggleFavorite(vehicle)} 
                className={`p-2 rounded-lg mt-4 ${isFavorite ? 'bg-red-500 text-white' : 'bg-green-500 text-white'}`}>
                {isFavorite ? '관심 해제' : '관심 추가'}
            </button>
        </div>
    );
});

export default VehicleCard;
