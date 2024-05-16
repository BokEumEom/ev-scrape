// src/components/community/PostActionButtons.tsx
import React from 'react';
import { IoHeartOutline, IoHeart, IoChatbubbleOutline, IoShareOutline, IoPaperPlaneOutline } from 'react-icons/io5';

interface PostActionButtonsProps {
  isLiked: boolean;
  onLike: () => void;
  onComment: () => void;
  onShare: () => void;
}

const PostActionButtons: React.FC<PostActionButtonsProps> = ({ isLiked, onLike, onComment, onShare }) => {
  return (
    <div className="flex items-center justify-between border-t pt-2 mt-2">
      <button className="flex items-center text-xs space-x-1 text-gray-500" onClick={onLike}>
        {isLiked ? <IoHeart className="text-red-500" size={18} /> : <IoHeartOutline className="text-lg" size={18} />}
        <span>추천</span>
      </button>
      <button className="flex items-center text-xs space-x-1 text-gray-500" onClick={onComment}>
        <IoChatbubbleOutline className="text-lg" size={18} />
        <span>댓글</span>
      </button>
      <button className="flex items-center text-xs space-x-1 text-gray-500" onClick={onShare}>
        <IoShareOutline className="text-lg" size={18} />
        <span>퍼가기</span>
      </button>
      <button className="flex items-center text-xs space-x-1 text-gray-500">
        <IoPaperPlaneOutline className="text-lg" size={18} />
        <span>보내기</span>
      </button>
    </div>
  );
};

export default PostActionButtons;
