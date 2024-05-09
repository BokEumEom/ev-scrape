// src/components/PostDisplay.tsx
import React, { useState } from 'react';
import { IoHeartOutline, IoHeart } from 'react-icons/io5';
import { CommunityPost } from '../../types';

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

  if (!post) return null;

  const { title, content, likeCount } = post;

  return (
    <>
      <h1 className="text-lg font-semibold mb-2">{title}</h1>
      <p className="text-sm text-gray-600 mb-2" style={{ whiteSpace: 'pre-wrap' }}>
        {content}
      </p>
      <button onClick={handleLike} aria-label={isLiked ? 'Unlike this post' : 'Like this post'} className="flex items-center border rounded-full text-sm p-2">
        {isLiked ? <IoHeart className="text-red-500" /> : <IoHeartOutline className="text-red-500" />}
        <span className="ml-1">좋아요</span>
      </button>
    </>
  );
};

export default PostDisplay;