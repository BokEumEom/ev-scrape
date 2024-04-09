// src/components/UserActivities.tsx
import React from 'react';
import { FaPencilAlt } from "react-icons/fa";
import { IoChatbubbleEllipses, IoHeartSharp } from "react-icons/io5";
import { HiFire } from "react-icons/hi2";

const UserActivities = ({ user }) => {
  // 예시 데이터입니다. 실제 데이터로 대체하세요.
  const activities = [
    { icon: FaPencilAlt, text: '글쓰기', count: user.postsCount },
    { icon: IoChatbubbleEllipses, text: '댓글쓰기', count: user.commentsCount },
    { icon: HiFire, text: '인기글 조회', count: user.popularPostViewCount },
    { icon: IoHeartSharp, text: '공감 보내기', count: user.likesSentCount },
  ];

  return (
    <div className="bg-white p-4 flex justify-around text-center">
      {activities.map((activity, index) => (
        <div key={index} className="flex flex-col items-center justify-center">
          <activity.icon className="text-gray-700 text-2xl mb-2" />
          <span className="text-sm font-semibold text-gray-500 py-2">{activity.text}</span>
          <span className="text-xs font-semibold text-gray-400">{activity.count}</span>
        </div>
      ))}
    </div>
  );
};

export default UserActivities;
