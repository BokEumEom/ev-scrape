// src/components/users/OAuthButton.tsx
import React from 'react';

interface OAuthButtonProps {
  onClick: () => void;
  text: string;
}

const OAuthButton: React.FC<OAuthButtonProps> = ({ onClick, text }) => (
  <button
    type="button"
    onClick={onClick}
    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
  >
    {text}
  </button>
);

export default OAuthButton;