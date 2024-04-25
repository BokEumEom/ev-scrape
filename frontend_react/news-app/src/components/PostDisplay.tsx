// src/components/PostDisplay.tsx
import React from 'react';
import { IoHeartOutline, IoHeart } from "react-icons/io5";

interface PostDisplayProps {
    post: any; // Define more specific type if possible
    onLike: () => void;
    isLiked: boolean;
    likeCount: number;
  }
  
const PostDisplay: React.FC<PostDisplayProps> = ({ post, onLike, isLiked, likeCount }) => {
return (
    <>
    <h1 className="text-lg font-semibold mb-2">{post.title}</h1>
    <p className="text-sm text-gray-600 mb-2" style={{ whiteSpace: 'pre-wrap' }}>{post.content}</p>
    <button onClick={onLike} className="flex items-center border rounded-full text-sm p-2">
        {isLiked ? <IoHeart className="text-red-500" /> : <IoHeartOutline className="text-red-500" />}
        <span className="ml-1">좋아요</span>
    </button>
    </>
);
};

export default PostDisplay;
