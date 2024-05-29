// src/components/community/CommunityPost.tsx
import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAtom } from 'jotai';
import { viewCountAtom, incrementViewCountAtom } from '@/atoms/viewCountAtom';
import { CommunityPost as CommunityPostType } from '@/types';
import PostDate from './PostDate';
import PostContent from './PostContent';
import PostInteractions from './PostInteractions';
import PostActionButtons from './PostActionButtons';
import CommentForm from './CommentForm';
import UserProfile from './UserProfile';
import { useCreateComment } from '@/hooks/useCommentsCommunityPost';
import { useUserProfileQuery } from '@/hooks/useUserProfileQuery';

interface CommunityPostProps {
  post: CommunityPostType;
  simpleView?: boolean;
}

const CommunityPost: React.FC<CommunityPostProps> = ({ post, simpleView = false }) => {
  const navigate = useNavigate();
  const [viewCounts] = useAtom(viewCountAtom);
  const [, incrementViewCount] = useAtom(incrementViewCountAtom);
  const [isContentExpanded, setIsContentExpanded] = useState(false);
  const [isLiked, setIsLiked] = useState(post.isLikedByCurrentUser);
  const createCommentMutation = useCreateComment(post.id);
  const { data: user } = useUserProfileQuery();

  // 게시글을 보기 위한 핸들러
  const handleViewPost = useCallback(() => {
    incrementViewCount(post.id);
    navigate(`/community/${post.id}`);
  }, [navigate, post.id, incrementViewCount]);

  // 좋아요를 처리하는 핸들러
  const handleLike = useCallback(() => {
    setIsLiked(prevIsLiked => !prevIsLiked);
    // 서버에 좋아요 상태 업데이트를 위한 API 호출 트리거
  }, []);

  // 공유를 처리하는 핸들러
  const handleShare = useCallback(() => {
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
  }, [post.title]);

  // 댓글 추가를 처리하는 핸들러
  const handleAddComment = useCallback((content: string) => {
    createCommentMutation.mutate(
      { content },
      {
        onSuccess: () => console.log('Comment posted successfully'),
        onError: (error) => console.error('Error posting comment:', error),
      }
    );
  }, [createCommentMutation]);

  return (
    <div className="bg-white border-b border-gray-200 p-2">
      {user && (
        <UserProfile
          name={user.name}
          avatarUrl={user.avatarUrl}
        />
      )}
      <PostDate date={post.created_at} />
      <h2 className="text-sm font-semibold mb-2 cursor-pointer" onClick={handleViewPost} aria-label={`View post titled ${post.title}`}>
        {post.title}
      </h2>
      <PostContent
        content={post.content}
        isExpanded={isContentExpanded}
        toggleExpand={() => setIsContentExpanded(!isContentExpanded)}
      />
      {!simpleView && (
        <>
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
        </>
      )}
    </div>
  );
};

export default CommunityPost;
