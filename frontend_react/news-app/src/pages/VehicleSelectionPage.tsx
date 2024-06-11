// src/pages/VehicleSelectionPage.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchVehicleSpecifications } from '@/services/vehicleService';
import { VehicleDetails } from '@/types';
import VehicleTypeStep from '@/components/vehicle/VehicleTypeStep';
import VehicleBrandStep from '@/components/vehicle/VehicleBrandStep';
import VehicleModelStep from '@/components/vehicle/VehicleModelStep';
import VehicleTrimStep from '@/components/vehicle/VehicleTrimStep';

const VehicleSelectionPage: React.FC = () => {
    const [step, setStep] = useState(1);
    const [vehicleSpecs, setVehicleSpecs] = useState<VehicleDetails[]>([]);
    const [vehicleType, setVehicleType] = useState<string | null>(null);
    const [brand, setBrand] = useState<string | null>(null);
    const [model, setModel] = useState<string | null>(null);
    const [trim, setTrim] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const loadVehicleSpecs = async () => {
            try {
                const data = await fetchVehicleSpecifications();
                setVehicleSpecs(data || []);
            } catch (err) {
                console.error('Failed to fetch vehicle specifications.', err);
            }
        };

        loadVehicleSpecs();
    }, []);

    const nextStep = () => setStep(prev => prev + 1);
    const prevStep = () => setStep(prev => prev - 1);

    const handleSubmit = () => {
        const selectedVehicle = { vehicleType, brand, model, trim };
        navigate('/subsidy-information', { state: { vehicle: selectedVehicle } });
    };

    const brands = [...new Set(vehicleSpecs.map(spec => spec.manufacturer))];
    const models = brand ? vehicleSpecs.filter(spec => spec.manufacturer === brand).map(spec => spec.model) : [];
    const trims = model ? vehicleSpecs.filter(spec => spec.model === model).map(spec => spec.drive_type) : [];

    return (
        <div className="max-w-4xl mx-auto p-5 py-20">
            <div className="space-y-4">
                <VehicleTypeStep onSelect={setVehicleType} onNext={nextStep} currentStep={step} />
                {step > 1 && <VehicleBrandStep brands={brands} onSelect={setBrand} onNext={nextStep} onBack={prevStep} currentStep={step} />}
                {step > 2 && <VehicleModelStep models={models} onSelect={setModel} onNext={nextStep} onBack={prevStep} currentStep={step} />}
                {step > 3 && <VehicleTrimStep trims={trims} onSelect={setTrim} onSubmit={handleSubmit} onBack={prevStep} currentStep={step} />}
            </div>
        </div>
    );
};

export default VehicleSelectionPage;
