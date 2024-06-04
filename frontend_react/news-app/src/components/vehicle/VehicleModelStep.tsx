// src/components/vehicle/VehicleModelStep.tsx
import React from 'react';

interface VehicleModelStepProps {
    models: string[];
    onSelect: (model: string) => void;
    onNext: () => void;
    onBack: () => void;
    currentStep: number;
}

const VehicleModelStep: React.FC<VehicleModelStepProps> = ({ models, onSelect, onNext, onBack, currentStep }) => {
    const handleSelect = (model: string) => {
        onSelect(model);
        onNext();
    };

    return (
        <div className={`p-4 border rounded-lg ${currentStep >= 3 ? 'bg-white shadow-md' : 'bg-gray-100'}`}>
            <h2 className="text-xl font-bold mb-4">03 모델 선택</h2>
            <div className="grid grid-cols-2 gap-4">
                {models.map(model => (
                    <button key={model} onClick={() => handleSelect(model)} className="bg-gray-200 p-4 rounded-lg shadow-md hover:bg-gray-300">
                        {model}
                    </button>
                ))}
            </div>
            {currentStep > 3 && (
                <button onClick={onBack} className="mt-4 bg-blue-500 text-white p-2 rounded-lg">
                    Back
                </button>
            )}
        </div>
    );
};

export default VehicleModelStep;
