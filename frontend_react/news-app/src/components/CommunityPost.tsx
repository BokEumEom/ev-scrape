// src/components/CommunityPost.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CommunityPost as CommunityPostType } from '../types';
import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';

interface CommunityPostProps {
  post: CommunityPostType;
}

const CommunityPost: React.FC<CommunityPostProps> = ({ post }) => {
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const formattedDate = new Date(post.created_at).toLocaleDateString('ko-KR', {
    year: 'numeric', month: 'long', day: 'numeric'
  });

  const handleViewComments = () => {
    navigate(`/community/${post.id}`);
  };

  return (
    <div className="bg-white border-b border-gray-200 p-4">
      <h2 className="text-sm font-semibold mb-2" onClick={handleViewComments}>{post.title}</h2>
      <p className="text-xs text-gray-600 mb-3" onClick={handleViewComments}>{post.content}</p>
      <div className="text-xs flex items-center justify-between text-gray-500 text-sm">
        <span>{formatDistanceToNow(new Date(post.created_at), { addSuffix: true, locale: ko })}</span>
        <div className="flex items-center">
          <span className="mr-2">좋아요 {post.likeCount || 0}</span>
          <span>댓글 {post.commentCount || 0}</span>
        </div>
      </div>
    </div>
  );
};

export default CommunityPost;