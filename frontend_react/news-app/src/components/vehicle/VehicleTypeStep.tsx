// src/components/vehicle/VehicleTypeStep.tsx
import React from 'react';

interface VehicleTypeStepProps {
    onSelect: (type: string) => void;
    onNext: () => void;
}

const VehicleTypeStep: React.FC<VehicleTypeStepProps> = ({ onSelect, onNext }) => {
    const handleSelect = (type: string) => {
        onSelect(type);
        onNext();
    };

    return (
        <div className="text-center">
            <h2 className="text-xl font-bold mb-6">1. 차량 구분</h2>
            <div className="flex justify-around">
                <button 
                    onClick={() => handleSelect('승용')}
                    className="bg-gray-200 p-4 rounded-lg shadow-md hover:bg-gray-300">
                    승용
                </button>
                <button 
                    onClick={() => handleSelect('화물')}
                    className="bg-gray-200 p-4 rounded-lg shadow-md hover:bg-gray-300">
                    화물
                </button>
            </div>
        </div>
    );
};

export default VehicleTypeStep;
