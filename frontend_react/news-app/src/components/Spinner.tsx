// src/components/Spinner.tsx
import React from 'react';
import { PulseLoader } from 'react-spinners';

interface SpinnerProps {
  size?: number;
  color?: string;
}

const Spinner: React.FC<SpinnerProps> = ({ size = 20, color = '#36D7B7' }) => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <PulseLoader size={size} color={color} />
    </div>
  );
};

export default Spinner;
