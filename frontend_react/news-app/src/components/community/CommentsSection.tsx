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
  // 댓글 데이터를 가져오는 커스텀 훅 사용
  const { data: comments, isLoading, error } = useComments(postId);
  const createCommentMutation = useCreateComment(postId);

  // 댓글 추가 핸들러
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
      {/* 댓글 목록 */}
      <div className="comments-section space-y-2 mb-16 overflow-auto">
        {isLoading && <div className="text-center py-4">Loading comments...</div>}
        {error && <div className="text-center text-red-500 py-4">Error loading comments: {error.message}</div>}
        {!isLoading && !error && comments && comments.length > 0 ? (
          comments.map(comment => (
            <div key={comment.id} className="comment bg-gray-100 p-3 text-sm rounded-lg">
              <p className="comment-date text-xs text-gray-500">
                {comment.created_at && formatDistanceToNow(new Date(comment.created_at), { addSuffix: true, locale: ko })}
              </p>
              <p className="comment-content">{comment.content}</p>
            </div>
          ))
        ) : (
          !isLoading && !error && (
            <div className="no-comments text-gray-600 text-sm text-center py-4">No comments yet.</div>
          )
        )}
      </div>

      {/* 댓글 입력 폼 */}
      <CommentForm 
        onSubmit={handleAddComment} 
        className="comment-form fixed inset-x-0 bottom-0 p-3 bg-white z-50"
      />
    </>
  );
};

export default CommentsSection;
