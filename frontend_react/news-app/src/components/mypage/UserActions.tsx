// src/components/mypage/UserActions.tsx
import React from 'react';

interface UserActionsProps {
  onWritePostClick: () => void;
  onSignOutClick: () => void;
  isLoading: boolean;
}

const UserActions: React.FC<UserActionsProps> = ({ onWritePostClick, onSignOutClick, isLoading }) => {
  return (
    <div className="text-center p-2 py-16 mt-auto">
      <span className="text-gray-500 text-sm font-medium block mb-6">전기차 오너 이야기를 이곳에서 들려주세요.</span>
      <button
        onClick={onWritePostClick}
        className="text-gray-800 bg-gray-200 hover:bg-red-700 font-semibold rounded-lg text-xs w-full py-2.5 text-center"
        disabled={isLoading}
      >
        커뮤니티 글쓰기
      </button>
      <button
        onClick={onSignOutClick}
        className="mt-4 text-gray-800 bg-gray-200 hover:bg-red-700 font-semibold rounded-lg text-xs w-full py-2.5 text-center"
        disabled={isLoading}
      >
        로그아웃
      </button>
    </div>
  );
};

export default UserActions;
