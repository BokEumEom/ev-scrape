// src/components/community/CommentForm.tsx
import React, { useRef, useState } from 'react';
import { IoSendSharp } from 'react-icons/io5';

interface CommentFormProps {
  onSubmit: (content: string) => void;
  className?: string;
}

const CommentForm: React.FC<CommentFormProps> = ({ onSubmit, className }) => {
  const [commentText, setCommentText] = useState(''); // 댓글 텍스트 상태
  const commentInputRef = useRef<HTMLInputElement>(null); // 인풋 필드 참조

  // 댓글 추가 핸들러
  const handleAddComment = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!commentText.trim()) return;

    onSubmit(commentText);
    setCommentText(''); // 폼 제출 후 텍스트 필드 초기화
  };

  // 아이콘 색상 설정
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
          className="w-full bg-gray-100 pl-4 pr-10 py-2 rounded-full shadow-sm focus:outline-none focus:border-blue-300"
        />
        <button type="submit" className="absolute right-0 top-0 mt-2 mr-2" aria-label="Post comment">
          <IoSendSharp className={`w-6 h-6 ${iconColor}`} />
        </button>
      </div>
    </form>
  );
};

export default CommentForm;
