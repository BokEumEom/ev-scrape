// src/components/community/CommentsSection.tsx
import React from 'react';
import { useComments, useCreateComment } from '@/hooks/useCommentsCommunityPost';
import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';
import CommentForm from './CommentForm';

interface CommentsSectionProps {
  postId: number;
}

const CommentsSection: React.FC<CommentsSectionProps> = ({ postId }) => {
  const { data: comments, isLoading, error } = useComments(postId);
  const createCommentMutation = useCreateComment(postId);

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
      <CommentForm 
        onSubmit={handleAddComment} 
        className="fixed inset-x-0 bottom-0 p-3 bg-white z-50"
      />
    </>
  );
};

export default CommentsSection;
