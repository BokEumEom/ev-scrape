// src/components/ErrorDisplay.tsx
import React from 'react';
import { ApiFieldError } from '../types';

interface ErrorDisplayProps {
    errors?: ApiFieldError[];  // Make errors optional or ensure it always receives an array
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ errors = [] }) => {
    return (
        <div className="error-messages">
            {errors.length > 0 ? (
                errors.map((error, index) => (
                    <div key={index} className="error-message">
                        <strong>{error.field}:</strong> {error.message}
                    </div>
                ))
            ) : (
                <div className="error-message">No errors to display.</div>  // Optional: Display a message or render null if no errors
            )}
        </div>
    );
};

export default ErrorDisplay;
