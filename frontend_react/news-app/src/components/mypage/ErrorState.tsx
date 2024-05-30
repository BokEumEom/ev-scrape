// src/components/mypage/ErrorState.tsx
import React from 'react';

const ErrorState: React.FC<{ errorMessage: string; onRetry: () => void }> = ({ errorMessage, onRetry }) => (
  <div className="text-center p-2 py-16 mt-auto">
    <p className="text-gray-500 text-sm font-medium mb-6">Error: {errorMessage}</p>
    <button
      onClick={onRetry}
      className="text-gray-800 bg-gray-200 hover:bg-red-700 font-semibold rounded-lg text-xs w-full py-2.5 text-center"
    >
      로그인 페이지로 이동
    </button>
  </div>
);

export default ErrorState;
