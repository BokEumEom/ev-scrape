// src/components/community/PostDisplay.tsx
import React, { useState, useEffect, useCallback } from 'react';
import { IoHeartOutline, IoHeart } from 'react-icons/io5';
import { CommunityPost } from '@/types';
import PostActionButtons from './PostActionButtons';

interface PostDisplayProps {
  post: CommunityPost;
  onLike: () => void;
}

const PostDisplay: React.FC<PostDisplayProps> = ({ post, onLike }) => {
  const [isLiked, setIsLiked] = useState(post.isLikedByCurrentUser);

  // post 상태가 변경될 때마다 isLiked 상태를 동기화
  useEffect(() => {
    setIsLiked(post.isLikedByCurrentUser);
  }, [post.isLikedByCurrentUser]);

  // 좋아요 버튼 핸들러
  const handleLike = useCallback(() => {
    setIsLiked(prevIsLiked => !prevIsLiked);
    onLike();
  }, [onLike]);

  // 공유 버튼 핸들러
  const handleShare = useCallback(() => {
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
  }, [post.title]);

  // post 객체가 없으면 null 반환
  if (!post) return null;

  const { title, content, likeCount } = post;

  return (
    <div className="post-display-container">
      {/* 게시글 제목 */}
      <h1 className="text-lg font-semibold mb-2">{title}</h1>
      
      {/* 게시글 내용 */}
      <p className="text-sm text-gray-600 mb-2" style={{ whiteSpace: 'pre-wrap' }}>
        {content}
      </p>

      {/* 좋아요 버튼 */}
      <button
        onClick={handleLike}
        aria-label={isLiked ? 'Unlike this post' : 'Like this post'}
        className="flex items-center border rounded-full text-sm p-2"
      >
        {isLiked ? <IoHeart className="text-red-500" /> : <IoHeartOutline className="text-red-500" />}
        <span className="ml-1">좋아요</span>
      </button>

      {/* 액션 버튼 (댓글, 공유 등) */}
      <PostActionButtons isLiked={isLiked} onLike={handleLike} onComment={() => {}} onShare={handleShare} />
    </div>
  );
};

export default PostDisplay;
