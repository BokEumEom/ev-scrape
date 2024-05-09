// src/components/CommunityPost.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAtom } from 'jotai';
import { viewCountAtom, incrementViewCountAtom } from '../../atoms/viewCountAtom';
import { CommunityPost as CommunityPostType } from '../../types';
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
  const [showFullContent, setShowFullContent] = useState(false);

  const handleViewPost = () => {
    incrementViewCount(post.id);
    navigate(`/community/${post.id}`);
  };

  const truncatedContent = showFullContent ? post.content : `${post.content.substr(0, 100)}...`;

  return (
    <div className="bg-white border-b border-gray-200 p-4">
      <h2 className="text-sm font-semibold mb-2" onClick={handleViewPost}>
        {post.title}
      </h2>
      <p className="text-xs text-gray-600 mb-3" style={{ whiteSpace: 'pre-wrap' }} onClick={showFullContent ? undefined : () => setShowFullContent(true)}>
        {truncatedContent}
      </p>
      {!showFullContent && (
        <button className="text-xs text-blue-500 hover:underline" onClick={() => setShowFullContent(true)}>
          더보기
        </button>
      )}
      <div className="text-xs flex items-center justify-between text-gray-500 text-sm">
        <span>
          {formatDistanceToNow(new Date(post.created_at), { addSuffix: true, locale: ko })} - 조회 {viewCounts[post.id] || 0}
        </span>
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