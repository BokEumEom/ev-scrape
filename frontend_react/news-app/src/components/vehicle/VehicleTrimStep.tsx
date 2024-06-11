// src/components/vehicle/VehicleTrimStep.tsx
import React from 'react';

interface VehicleTrimStepProps {
    trims: string[];
    onSelect: (trim: string) => void;
    onSubmit: () => void;
    onBack: () => void;
    currentStep: number;
}

const VehicleTrimStep: React.FC<VehicleTrimStepProps> = ({ trims, onSelect, onSubmit, onBack, currentStep }) => {
    const handleSelect = (trim: string) => {
        onSelect(trim);
    };

    return (
        <div className={`p-4 border rounded-lg ${currentStep >= 4 ? 'bg-white shadow-md' : 'bg-gray-100'}`}>
            <h2 className="text-xl font-bold mb-4">04 트림 선택</h2>
            <div className="grid grid-cols-2 gap-4">
                {trims.map(trim => (
                    <button key={trim} onClick={() => handleSelect(trim)} className="bg-gray-200 p-4 rounded-lg shadow-md hover:bg-gray-300">
                        {trim}
                    </button>
                ))}
            </div>
            <div className="flex justify-between mt-4">
                <button onClick={onBack} className="bg-blue-500 text-white p-2 rounded-lg">
                    Back
                </button>
                <button onClick={onSubmit} className="bg-green-500 text-white p-2 rounded-lg">
                    확인
                </button>
            </div>
        </div>
    );
};

export default VehicleTrimStep;
