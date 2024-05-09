// src/components/CommentsSection.tsx
import React, { useState, useRef } from 'react';
import { useComments, useCreateComment } from '../../hooks/useCommentsCommunityPost';
import { IoSendSharp } from "react-icons/io5";
import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';

interface CommentsSectionProps {
  postId: number;
}

const CommentsSection: React.FC<CommentsSectionProps> = ({ postId }) => {
  const { data: comments, isLoading, error } = useComments(postId);
  const createCommentMutation = useCreateComment(postId);
  const [commentText, setCommentText] = useState('');
  const commentInputRef = useRef<HTMLInputElement>(null);

  const handleFocusInput = () => {
    commentInputRef.current?.focus();
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

  const iconColor = commentText.trim() ? "text-blue-500" : "text-gray-300";

  return (
    <>
      {/* Comment List */}
      <div className="space-y-2 mb-16 overflow-auto">
        {isLoading && <div className="text-center py-4">Loading comments...</div>}
        {error && <div className="text-center text-red-500 py-4">Error loading comments: {error.message}</div>}
        {!isLoading && !error && comments && comments.length > 0 ? (
          comments.map(comment => (
            <div key={comment.id} className="bg-gray-100 p-3 text-sm rounded-lg">
              <p className="text-xs text-gray-500">
                {comment.created_at && formatDistanceToNow(new Date(comment.created_at), { addSuffix: true, locale: ko })}
              </p>
              <p>{comment.content}</p>
            </div>
          ))
        ) : (
          <div className="text-gray-600 text-sm text-center py-4">No comments yet.</div>
        )}
      </div>

      {/* Fixed Comment Input */}
      <form onSubmit={handleAddComment} className="fixed inset-x-0 bottom-0 p-3 bg-white z-50">
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
          <button
            type="button"
            onClick={handleFocusInput}  // Use this to manually focus and trigger the keyboard on mobile
            className="absolute right-0 top-0 mt-2 mr-2"
            aria-label="Focus input"
          >
          </button>
          <button type="submit" className="absolute right-0 top-0 mt-2 mr-2" aria-label="Post comment">
            <IoSendSharp className={`w-6 h-6 ${iconColor}`} />
          </button>
        </div>
      </form>
    </>
  );
};

export default CommentsSection;
