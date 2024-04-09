// src/components/UserStats.tsx
import React from 'react';

const UserStats = ({ user }) => {
  return (
    <div className="bg-white p-4 flex justify-around text-center divide-x divide-gray-200">
      <div className="px-4">
        <div className="text-lg font-bold">{user.postsCount}</div>
        <div className="text-sm text-gray-500">게시물 수</div>
      </div>
      <div className="px-4">
        <div className="text-lg font-bold">{user.commentsCount}</div>
        <div className="text-sm text-gray-500">댓글 수</div>
      </div>
      <div className="px-4">
        <div className="text-lg font-bold">{user.likesCount}</div>
        <div className="text-sm text-gray-500">받은 좋아요</div>
      </div>
    </div>
  );
};

export default UserStats;
