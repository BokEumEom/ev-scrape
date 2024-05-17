// src/components/community/CommentForm.tsx
import React, { useRef, useState } from 'react';
import { IoSendSharp } from 'react-icons/io5';

interface CommentFormProps {
  onSubmit: (content: string) => void;
  className?: string;
}

const CommentForm: React.FC<CommentFormProps> = ({ onSubmit, className }) => {
  const [commentText, setCommentText] = useState('');
  const commentInputRef = useRef<HTMLInputElement>(null);

  const handleAddComment = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!commentText.trim()) return;

    onSubmit(commentText);
    setCommentText('');
  };

  const iconColor = commentText.trim() ? "text-blue-500" : "text-gray-300";

  return (
    <form onSubmit={handleAddComment} className={`mt-4 ${className}`}>
      <div className="relative">
        <input
          ref={commentInputRef}
          type="text"
          placeholder="댓글을 입력하세요..."
          value={commentText}
          onChange={e => setCommentText(e.target.value)}
          autoFocus
          className="w-full bg-gray-100 pl-4 pr-4 py-2 rounded-full shadow-sm focus:outline-none focus:border-blue-300"
        />
        <button type="submit" className="absolute right-0 top-0 mt-2 mr-2" aria-label="Post comment">
          <IoSendSharp className={`w-6 h-6 ${iconColor}`} />
        </button>
      </div>
    </form>
  );
};

export default CommentForm;
