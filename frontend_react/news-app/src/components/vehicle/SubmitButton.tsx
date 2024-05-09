// src/components/SubmitButton.tsx
import React from 'react';

interface SubmitButtonProps {
    isLoading: boolean;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ isLoading }) => {
    return (
        <button type="submit" className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors">
            {isLoading ? 'Submitting...' : 'Submit'}
        </button>
    );
};

export default SubmitButton;
