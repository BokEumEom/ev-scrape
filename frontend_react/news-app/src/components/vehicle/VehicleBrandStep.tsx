// src/components/vehicle/VehicleBrandStep.tsx
import React from 'react';

interface VehicleBrandStepProps {
    brands: string[];
    onSelect: (brand: string) => void;
    onNext: () => void;
    onBack: () => void;
    currentStep: number;
}

const VehicleBrandStep: React.FC<VehicleBrandStepProps> = ({ brands, onSelect, onNext, onBack, currentStep }) => {
    const handleSelect = (brand: string) => {
        onSelect(brand);
        onNext();
    };

    return (
        <div className={`p-4 border rounded-lg ${currentStep >= 2 ? 'bg-white shadow-md' : 'bg-gray-100'}`}>
            <h2 className="text-xl font-bold mb-4">02 브랜드 선택</h2>
            <div className="grid grid-cols-3 gap-4">
                {brands.map(brand => (
                    <button key={brand} onClick={() => handleSelect(brand)} className="bg-gray-200 p-4 rounded-lg shadow-md hover:bg-gray-300">
                        {brand}
                    </button>
                ))}
            </div>
            {currentStep > 2 && (
                <button onClick={onBack} className="mt-4 bg-blue-500 text-white p-2 rounded-lg">
                    Back
                </button>
            )}
        </div>
    );
};

export default VehicleBrandStep;
