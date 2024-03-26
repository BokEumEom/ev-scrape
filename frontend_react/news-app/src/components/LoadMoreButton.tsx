// src/components/LoadMoreButton.tsx
import React from 'react';
import Spinner from '../components/Spinner';

interface LoadMoreButtonProps {
  isLoading: boolean;
  onClick: () => void;
}

const LoadMoreButton: React.FC<LoadMoreButtonProps> = ({ isLoading, onClick }) => {
  return (
    <div className="mt-4 px-4 flex justify-center">
      {isLoading ? (
        <Spinner />
      ) : (
        <button
          onClick={onClick}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
        >
          More
        </button>
      )}
    </div>
  );
};

export default LoadMoreButton;
