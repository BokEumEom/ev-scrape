// A generic form section component that could be reused for different parts of the vehicle spec.
// src/components/vehicle/FormSection.tsx
import React, { ChangeEvent } from 'react';
import InputField from './InputField';
import { VehicleSpec } from '../../types';

interface FormSectionProps {
    sectionData: VehicleSpec;
    handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const FormSection: React.FC<FormSectionProps> = ({ sectionData, handleChange }) => {
    return (
        <>
            {Object.keys(sectionData).filter(key => key !== 'manufacturer').map(key => (
                <InputField
                    key={key}
                    label={key.replace('_', ' ')}
                    name={key}
                    type={typeof sectionData[key] === 'number' ? 'number' : 'text'}
                    value={sectionData[key] || ''}
                    onChange={handleChange}
                />
            ))}
        </>
    );
};

export default FormSection;
