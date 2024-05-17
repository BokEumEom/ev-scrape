// src/components/community/PostInteractions.tsx
import React from 'react';
import { IoHeartOutline, IoChatbubbleOutline } from 'react-icons/io5';

interface PostInteractionsProps {
  viewCount: number;
  likeCount: number;
  commentCount: number;
  isLiked: boolean;
  onLike: () => void;
  onComment: () => void;
}

const PostInteractions: React.FC<PostInteractionsProps> = ({ viewCount, likeCount, commentCount, isLiked, onLike, onComment }) => {
  return (
    <div className="text-xs flex items-center justify-between text-gray-500 text-sm mb-2">
      <span>조회 {viewCount}</span>
      <div className="flex items-center space-x-2">
        <IoHeartOutline className="text-gray-500 text-lg" size={18} onClick={onLike} />
        <span className="p-0">{likeCount}</span>
        <IoChatbubbleOutline className="text-gray-500 text-lg cursor-pointer" size={18} onClick={onComment} />
        <span className="p-0">{commentCount}</span>
      </div>
    </div>
  );
};

export default PostInteractions;
