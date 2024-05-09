// src/components/FormHeader.tsx
import React from 'react';

interface FormHeaderProps {
    title: string;
}

const FormHeader: React.FC<FormHeaderProps> = ({ title }) => {
    return (
        <h2 className="text-lg font-bold mb-4">{title}</h2>
    );
};

export default FormHeader;
