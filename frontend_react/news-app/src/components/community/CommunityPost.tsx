// src/components/community/CommunityPost.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAtom } from 'jotai';
import { viewCountAtom, incrementViewCountAtom } from '@/atoms/viewCountAtom';
import { CommunityPost as CommunityPostType } from '@/types';
import PostDate from './PostDate';
import PostContent from './PostContent';
import PostInteractions from './PostInteractions';
import PostActionButtons from './PostActionButtons';
import CommentForm from './CommentForm';
import { useCreateComment } from '@/hooks/useCommentsCommunityPost';

interface CommunityPostProps {
  post: CommunityPostType;
}

const CommunityPost: React.FC<CommunityPostProps> = ({ post }) => {
  const navigate = useNavigate();
  const [viewCounts] = useAtom(viewCountAtom);
  const [, incrementViewCount] = useAtom(incrementViewCountAtom);
  const [isContentExpanded, setIsContentExpanded] = useState(false);
  const [isLiked, setIsLiked] = useState(post.isLikedByCurrentUser);
  const createCommentMutation = useCreateComment(post.id);

  const handleViewPost = () => {
    incrementViewCount(post.id);
    navigate(`/community/${post.id}`);
  };

  const handleLike = () => {
    setIsLiked(prevIsLiked => !prevIsLiked);
    // Trigger API call to update like status on the server
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        url: window.location.href,
      })
        .then(() => console.log('Thanks for sharing!'))
        .catch(console.error);
    } else {
      console.log('Web Share API not supported.');
    }
  };

  const handleAddComment = (content: string) => {
    createCommentMutation.mutate(
      { content },
      {
        onSuccess: () => console.log('Comment posted successfully'),
        onError: (error) => console.error('Error posting comment:', error),
      }
    );
  };

  return (
    <div className="bg-white border-b border-gray-200 p-4">
      <PostDate date={post.created_at} />
      <h2 className="text-sm font-semibold mb-2 cursor-pointer" onClick={handleViewPost}>
        {post.title}
      </h2>
      <PostContent
        content={post.content}
        isExpanded={isContentExpanded}
        toggleExpand={() => setIsContentExpanded(!isContentExpanded)}
      />
      <PostInteractions
        viewCount={viewCounts[post.id] || 0}
        likeCount={post.likeCount || 0}
        commentCount={post.commentCount || 0}
        isLiked={isLiked}
        onLike={handleLike}
        onComment={handleViewPost}
      />
      <PostActionButtons isLiked={isLiked} onLike={handleLike} onComment={handleViewPost} onShare={handleShare} />
      <CommentForm onSubmit={handleAddComment} />
    </div>
  );
};

export default CommunityPost;
