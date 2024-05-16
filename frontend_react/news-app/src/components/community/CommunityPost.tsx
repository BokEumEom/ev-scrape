// src/components/community/CommunityPost.tsx
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAtom } from 'jotai';
import { viewCountAtom, incrementViewCountAtom } from '../../atoms/viewCountAtom';
import { CommunityPost as CommunityPostType } from '../../types';
import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';
import PostActionButtons from './PostActionButtons';
import { useCreateComment } from '../../hooks/useCommentsCommunityPost';
import { IoSendSharp, IoHeartOutline, IoChatbubbleOutline } from 'react-icons/io5';

interface CommunityPostProps {
  post: CommunityPostType;
}

const CommunityPost: React.FC<CommunityPostProps> = ({ post }) => {
  const navigate = useNavigate();
  const [viewCounts] = useAtom(viewCountAtom);
  const [, incrementViewCount] = useAtom(incrementViewCountAtom);
  const [showFullContent, setShowFullContent] = useState(false);
  const [isLiked, setIsLiked] = useState(post.isLikedByCurrentUser);
  const createCommentMutation = useCreateComment(post.id);
  const [commentText, setCommentText] = useState('');
  const commentInputRef = useRef<HTMLInputElement>(null);

  const handleViewPost = () => {
    incrementViewCount(post.id);
    navigate(`/community/${post.id}`);
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        url: window.location.href,
      })
        .then(() => {
          console.log('Thanks for sharing!');
        })
        .catch(console.error);
    } else {
      console.log('Web Share API not supported.');
    }
  };

  const handleAddComment = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent the default form submission
    if (!commentText.trim()) return;

    createCommentMutation.mutate(
      { content: commentText },
      {
        onSuccess: () => {
          // Handle success, clear input
          setCommentText('');
        },
        onError: (error) => {
          // Handle error
          console.error('Error posting comment:', error);
        },
      }
    );
  };

  const truncatedContent = showFullContent ? post.content : `${post.content.substr(0, 100)}...`;

  return (
    <div className="bg-white border-b border-gray-200 p-4">
      <div className="text-xs text-gray-500 mb-2">
        {formatDistanceToNow(new Date(post.created_at), { addSuffix: true, locale: ko })}
      </div>
      <h2 className="text-sm font-semibold mb-2 cursor-pointer" onClick={handleViewPost}>
        {post.title}
      </h2>
      <p
        className="text-xs text-gray-600 mb-3"
        style={{ whiteSpace: 'pre-wrap' }}
        onClick={showFullContent ? undefined : () => setShowFullContent(true)}
      >
        {truncatedContent}
      </p>
      {!showFullContent && (
        <button
          className="text-xs text-blue-500 hover:underline"
          onClick={() => setShowFullContent(true)}
        >
          더보기
        </button>
      )}
      <div className="text-xs flex items-center justify-between text-gray-500 text-sm mb-2">
        <span>
          조회 {viewCounts[post.id] || 0}
        </span>
        <div className="flex items-center space-x-2">
          <IoHeartOutline className="text-gray-500 text-lg" size={18} />
          <span className="p-0">{post.likeCount || 0}</span>
          <IoChatbubbleOutline
            className="text-gray-500 text-lg cursor-pointer"
            size={18}
            onClick={handleViewPost}
          />
          <span className="p-0">{post.commentCount || 0}</span>
        </div>
      </div>
      <PostActionButtons isLiked={isLiked} onLike={handleLike} onComment={handleViewPost} onShare={handleShare} />
      <form onSubmit={handleAddComment} className="mt-4">
        <div className="relative">
          <input
            ref={commentInputRef}
            type="text"
            placeholder="생각 남기기"
            value={commentText}
            onChange={e => setCommentText(e.target.value)}
            className="w-full bg-gray-100 px-3 py-2 rounded-full focus:outline-none"
          />
          <button type="submit" className="absolute right-0 top-0 mt-2 mr-2" aria-label="Post comment">
            <IoSendSharp className={`w-6 h-6 ${commentText.trim() ? "text-blue-500" : "text-gray-300"}`} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default CommunityPost;
