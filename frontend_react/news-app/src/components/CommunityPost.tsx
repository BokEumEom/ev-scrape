// src/components/CommunityPost.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAtom } from 'jotai';
import { viewCountAtom, incrementViewCountAtom } from '../atoms/viewCountAtom';
import { CommunityPost as CommunityPostType } from '../types';
import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';
import { PiThumbsUpLight } from "react-icons/pi";
import { IoChatbubbleOutline } from 'react-icons/io5';

interface CommunityPostProps {
  post: CommunityPostType;
}

const CommunityPost: React.FC<CommunityPostProps> = ({ post }) => {
  const navigate = useNavigate();
  const [viewCounts] = useAtom(viewCountAtom);
  const [, incrementViewCount] = useAtom(incrementViewCountAtom);

  const handleViewComments = () => {
    navigate(`/community/${post.id}`);
  };

  return (
    <div className="bg-white border-b border-gray-200 p-4">
      <h2 className="text-sm font-semibold mb-2" onClick={handleViewComments}>{post.title}</h2>
      <p className="text-xs text-gray-600 mb-3" style={{ whiteSpace: 'pre-wrap' }} onClick={handleViewComments}>{post.content}</p>
      <div className="text-xs flex items-center justify-between text-gray-500 text-sm">
        <span>{formatDistanceToNow(new Date(post.created_at), { addSuffix: true, locale: ko })} - 조회 {viewCounts[post.id] || 0}</span>
        <div className="flex items-center">
          <PiThumbsUpLight className="text-gray-500 text-lg" size={18} />
          <span className="p-1 mr-1">{post.likeCount || 0}</span>
          <IoChatbubbleOutline className="text-gray-500 text-lg" size={18} />
          <span className="p-1 mr-1">{post.commentCount || 0}</span>
        </div>
      </div>
    </div>
  );
};

export default CommunityPost;