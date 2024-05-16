// src/components/community/PostDisplay.tsx
import React, { useState } from 'react';
import { IoHeartOutline, IoHeart } from 'react-icons/io5';
import { CommunityPost } from '@/types';
import PostActionButtons from './PostActionButtons';

interface PostDisplayProps {
  post: CommunityPost;
  onLike: () => void;
}

const PostDisplay: React.FC<PostDisplayProps> = ({ post, onLike }) => {
  const [isLiked, setIsLiked] = useState(post.isLikedByCurrentUser);

  const handleLike = () => {
    setIsLiked(!isLiked);
    onLike();
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

  if (!post) return null;

  const { title, content, likeCount } = post;

  return (
    <div>
      <h1 className="text-lg font-semibold mb-2">{title}</h1>
      <p className="text-sm text-gray-600 mb-2" style={{ whiteSpace: 'pre-wrap' }}>
        {content}
      </p>
      <button onClick={handleLike} aria-label={isLiked ? 'Unlike this post' : 'Like this post'} className="flex items-center border rounded-full text-sm p-2">
        {isLiked ? <IoHeart className="text-red-500" /> : <IoHeartOutline className="text-red-500" />}
        <span className="ml-1">좋아요</span>
      </button>
      <PostActionButtons isLiked={isLiked} onLike={handleLike} onComment={() => {}} onShare={handleShare} />
    </div>
  );
};

export default PostDisplay;
