// src/components/vehicle/FormContainer.tsx
import React from 'react';

interface FormContainerProps {
    children: React.ReactNode;
}

const FormContainer: React.FC<FormContainerProps> = ({ children }) => {
    return (
        <div className="space-y-4 bg-white p-4">
            {children}
        </div>
    );
};

export default FormContainer;
