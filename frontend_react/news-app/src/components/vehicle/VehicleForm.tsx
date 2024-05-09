// src/components/VehicleForm.tsx
import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { createVehicleSpec } from '../../services/apiService';
import { VehicleSpec } from '../../types';
import InputField from './InputField';  // Separate component for input fields
import FormContainer from './FormContainer';
import FormHeader from './FormHeader';
import SubmitButton from './SubmitButton';

const VehicleForm: React.FC = () => {
    const [formData, setFormData] = useState<VehicleSpec>({
        manufacturer: '',
        model: '',
        drive_type: '',
        battery_type: '',
        battery_capacity: 0,
        range_km: 0,
        acceleration: 0,
        weight_kg: 0,
        storage_l: 0,
        wheel_size: '',
        seating_capacity: 0,
        display_inch: 0,
        minimum_ground_clearance_mm: 0,
        width_mm: 0,
        height_mm: 0,
        length_mm: 0
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type } = e.target;
        const parsedValue = type === 'number' ? parseFloat(value) || 0 : value;
        setFormData(prev => ({ ...prev, [name]: parsedValue }));
    };

    const mutation = useMutation({
        mutationFn: createVehicleSpec,
        onSuccess: () => {
            alert('Vehicle specification added successfully!');
            setFormData({
                manufacturer: '',
                model: '',
                drive_type: '',
                battery_type: '',
                battery_capacity: 0,
                range_km: 0,
                acceleration: 0,
                weight_kg: 0,
                storage_l: 0,
                wheel_size: '',
                seating_capacity: 0,
                display_inch: 0,
                minimum_ground_clearance_mm: 0,
                width_mm: 0,
                height_mm: 0,
                length_mm: 0
            });
        },
        onError: (error: any) => {
            alert(`Failed to add vehicle specification: ${error.response?.data?.message || error.message}`);
        }
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        mutation.mutate(formData);
    };

    return (
      <FormContainer>
          <form onSubmit={handleSubmit}>
              <FormHeader title="Add New Vehicle Specification" />
              {Object.keys(formData).map(key => (
                  <InputField
                      key={key}
                      label={key.replace('_', ' ')}
                      name={key}
                      type={typeof formData[key as keyof VehicleSpec] === 'number' ? 'number' : 'text'}
                      value={formData[key as keyof VehicleSpec]}
                      onChange={handleChange}
                  />
              ))}
              <SubmitButton isLoading={mutation.isLoading} />
              {mutation.isError && (
                  <p className="text-red-500 text-center mt-2">
                      Error: {mutation.error instanceof Error ? mutation.error.message : 'An unknown error occurred'}
                  </p>
              )}
          </form>
      </FormContainer>
  );
}

export default VehicleForm;
