// src/components/ErrorComponent.tsx
import React from 'react';

const ErrorComponent = ({ message, onRetry }) => {
  return (
    <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert">
      <p className="font-bold">오류 발생</p>
      <p>{message}</p>
      {onRetry && (
        <button 
          onClick={onRetry} 
          className="mt-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          다시 시도
        </button>
      )}
    </div>
  );
};

export default ErrorComponent;
