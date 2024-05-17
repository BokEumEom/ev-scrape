// src/components/Spinner.tsx
import React from 'react';
import { HashLoader } from 'react-spinners';

interface SpinnerProps {
  size?: number;
  color?: string;
}

const Spinner: React.FC<SpinnerProps> = ({ size = 50, color = '#36D7B7' }) => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <HashLoader size={size} color={color} />
    </div>
  );
};

export default Spinner;
