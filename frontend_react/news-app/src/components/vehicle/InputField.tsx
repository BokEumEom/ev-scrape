// src/components/InputField.tsx
import React from 'react';

interface InputFieldProps {
    label: string;
    name: string;
    type: string;
    value: string | number;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<InputFieldProps> = ({ label, name, type, value, onChange }) => {
    return (
        <div className="flex flex-col mb-4">
            <label htmlFor={name} className="font-medium capitalize mb-2">{label}:</label>
            <input
                id={name}
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                className="border border-gray-300 rounded py-2 px-3"
                required
                aria-label={label}
            />
        </div>
    );
};

export default InputField;
