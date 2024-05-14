// src/components/vehicle/VehicleForm.tsx
import React from 'react';
import { VehicleSpec } from '../../types';
import SelectField from './SelectField';
import FormContainer from './FormContainer';
import FormHeader from './FormHeader';
import SubmitButton from './SubmitButton';
import ErrorDisplay from '../ErrorDisplay';
import FormSection from './FormSection';
import useVehicleForm from '../../hooks/useVehicleForm';

const VehicleForm: React.FC = () => {
    const initialFormData: VehicleSpec = {
        manufacturer: '',
        model: '',
        drive_type: '',
        battery_type: '',
        battery_capacity: null,
        range_km: null,
        acceleration: null,
        weight_kg: null,
        storage_l: null,
        wheel_size: '',
        seating_capacity: null,
        display_inch: null,
        minimum_ground_clearance_mm: null,
        width_mm: null,
        height_mm: null,
        length_mm: null
    };

    const { handleChange, handleSubmit, formData, isLoading } = useVehicleForm(initialFormData);
    const manufacturers = [
        { label: "Tesla", value: "Tesla" },
        { label: "Polestar", value: "Polestar" },
        { label: "Hyundai", value: "Hyundai" },
        { label: "KIA", value: "KIA" },
        { label: "GM", value: "GM" },
        { label: "VW", value: "VW" },
        { label: "BMW", value: "BMW" },
        { label: "Volvo", value: "Volvo" },
        { label: "BYD", value: "BYD" },
        // Add more manufacturers as needed
    ];

    return (
        <FormContainer>
            <form onSubmit={handleSubmit}>
                <FormHeader title="Add New Vehicle Specification" />
                <SelectField
                    label="Manufacturer"
                    name="manufacturer"
                    value={formData.manufacturer}
                    onChange={handleChange}
                    options={manufacturers}
                />
                <FormSection sectionData={formData} handleChange={handleChange} />
                <SubmitButton isLoading={isLoading} />
                <ErrorDisplay />
            </form>
        </FormContainer>
    );
}

export default VehicleForm;
