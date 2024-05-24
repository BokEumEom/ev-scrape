// src/components/mypage/UserStats.tsx
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
    <span className="text-sm font-bold">Activity Stats</span>
    <div className="flex justify-around my-4 text-center">
      <div className="flex flex-col items-center justify-center">
        <div className="w-16 h-16 border-2 border-gray-300 rounded-full flex items-center justify-center mb-2">
          <FaPencilAlt className="text-gray-700 text-2xl" />
        </div>
        <span className="text-sm font-semibold text-gray-500 py-2">Posts</span>
        <span className="text-xs block font-semibold text-gray-400">10{postsCount}</span>
      </div>
      <div className="flex flex-col items-center justify-center">
        <div className="w-16 h-16 border-2 border-gray-300 rounded-full flex items-center justify-center mb-2">
          <IoChatbubbleEllipses className="text-gray-700 text-2xl" />
        </div>
        <span className="text-sm font-semibold text-gray-500 py-2">Comments</span>
        <span className="text-xs block font-semibold text-gray-400">10{followersCount}</span>
      </div>
      <div className="flex flex-col items-center justify-center">
        <div className="w-16 h-16 border-2 border-gray-300 rounded-full flex items-center justify-center mb-2">
          <HiFire className="text-gray-700 text-2xl" />
        </div>
        <span className="text-sm font-semibold text-gray-500 py-2">Views</span>
        <span className="text-xs block font-semibold text-gray-400">10{followingCount}</span>
      </div>
      <div className="flex flex-col items-center justify-center">
        <div className="w-16 h-16 border-2 border-gray-300 rounded-full flex items-center justify-center mb-2">
          <IoHeartSharp className="text-gray-700 text-2xl" />
        </div>
        <span className="text-sm font-semibold text-gray-500 py-2">Likes</span>
        <span className="text-xs block font-semibold text-gray-400">10</span>
      </div>
    </div>
  </div>
);

export default UserStats;
