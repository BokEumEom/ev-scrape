// src/pages/AddVehiclePage.tsx
import React from 'react';
import VehicleForm from '@/components/vehicle/VehicleForm';

const AddVehiclePage: React.FC = () => {
    return (
        <div className="max-w-4xl mx-auto p-5">
            <h1 className="text-2xl font-bold text-center mb-6">Add New Vehicle Specification</h1>
            <VehicleForm />
        </div>
    );
}

export default AddVehiclePage;
