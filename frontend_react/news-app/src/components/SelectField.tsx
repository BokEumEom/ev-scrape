// src/components/SelectField.tsx
import React, { ChangeEvent } from 'react';

interface SelectFieldProps {
    label: string;
    name: string;
    value: string;
    onChange: (e: ChangeEvent<HTMLSelectElement | HTMLInputElement>) => void;
    options: { label: string; value: string }[];
}

const SelectField: React.FC<SelectFieldProps> = ({ label, name, value, onChange, options }) => {
    return (
        <div className="flex flex-col mb-4">
            <label htmlFor={name} className="font-medium capitalize mb-2">{label}:</label>
            <select
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                className="border border-gray-300 rounded py-2 px-3"
                required
            >
                <option value="">Select {label}</option>
                {options.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                ))}
            </select>
        </div>
    );
};

export default SelectField;
