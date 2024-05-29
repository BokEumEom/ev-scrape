// src/components/users/Button.tsx
import React from 'react';

interface ButtonProps {
  isLoading: boolean;
  text: string;
}

const Button: React.FC<ButtonProps> = ({ isLoading, text }) => (
  <button
    type="submit"
    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
    disabled={isLoading}
  >
    {isLoading ? 'Loading...' : text}
  </button>
);

export default Button;