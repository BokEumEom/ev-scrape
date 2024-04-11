// UserStats.tsx
import React from 'react';
import { IoChatbubbleEllipses, IoHeartSharp } from 'react-icons/io5';
import { FaPencilAlt } from 'react-icons/fa';
import { HiFire } from 'react-icons/hi2';

interface UserStatsProps {
  postsCount: number;
  followersCount: number;
  followingCount: number;
}

const UserStats: React.FC<UserStatsProps> = ({
  postsCount,
  followersCount,
  followingCount,
}) => (
  <div className="bg-white p-4 mb-2 mt-2">
    <span className="text-sm font-bold">내 활동 내역</span>
    <div className="flex justify-around my-4 text-center">
      <div className="flex flex-col items-center justify-center">
        <FaPencilAlt className="text-gray-700 text-2xl mb-2" />
        <span className="text-sm font-semibold text-gray-500 py-2">글쓰기</span>
        <span className="text-xs block font-semibold text-gray-400">0/2{postsCount}</span>
      </div>
      <div className="flex flex-col items-center justify-center">
        <IoChatbubbleEllipses className="text-gray-700 text-2xl mb-2" />
        <span className="text-sm font-semibold text-gray-500 py-2">댓글쓰기</span>
        <span className="text-xs block font-semibold text-gray-400">0/5{followersCount}</span>
      </div>
      <div className="flex flex-col items-center justify-center">
        <HiFire className="text-gray-700 text-2xl mb-2" />
        <span className="text-sm font-semibold text-gray-500 py-2">인기글 조회</span>
        <span className="text-xs block font-semibold text-gray-400">0/5{followingCount}</span>
      </div>
      <div className="flex flex-col items-center justify-center">
        <IoHeartSharp className="text-gray-700 text-2xl mb-2" />
        <span className="text-sm font-semibold text-gray-500 py-2">공감 보내기</span>
        <span className="text-xs block font-semibold text-gray-400">0/10</span>
      </div>
    </div>
  </div>
);

export default UserStats;