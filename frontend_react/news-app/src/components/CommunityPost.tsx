// src/components/CommunityPost.tsx
import React from 'react';
import { CommunityPost as CommunityPostType } from '../types';

interface CommunityPostProps {
  post: CommunityPostType;
}

const CommunityPost: React.FC<CommunityPostProps> = ({ post }) => {
  const formattedDate = new Date(post.created_at).toLocaleDateString('ko-KR', {
    year: 'numeric', month: 'long', day: 'numeric'
  });

  return (
    <div className="bg-white shadow rounded-lg p-4 mb-4">
      <h2 className="text-sm font-semibold mb-2">{post.title}</h2>
      <p className="text-xs text-gray-600 mb-3">{post.content}</p>
      <div className="text-xs flex items-center justify-between text-gray-500 text-sm">
        <span>{formattedDate}</span>
        <div className="flex items-center">
          <span className="mr-2">{post.voteCount} 좋아요</span>
          <span>{post.comments?.length || 0} 댓글</span>
        </div>
      </div>
      <hr className="my-3"/>
      <div className="text-gray-500 text-xs flex items-center">
        <button className="flex items-center mr-3">
          {/* Insert heart icon */}
          <span className="text-red-500">♥</span> <span className="ml-1">좋아요</span>
        </button>
        <button className="flex items-center">
          {/* Insert comment icon */}
          💬 <span className="ml-1">댓글</span>
        </button>
      </div>
    </div>
  );
};

export default CommunityPost;


