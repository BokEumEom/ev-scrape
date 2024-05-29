// src/hooks/useCommentsCommunityPost.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchCommentsByPostId, createComment } from '@/services/communityService';
import { toast } from 'react-toastify';

// 쿼리 키 상수 정의
const COMMENTS_QUERY_KEY = (postId: number): [string, number] => ['comments', postId];

// 특정 게시물의 댓글을 가져오기 위한 커스텀 훅
export const useComments = (postId: number) => {
  return useQuery({
    queryKey: COMMENTS_QUERY_KEY(postId),
    queryFn: () => fetchCommentsByPostId(postId),
  });
};

// 댓글 생성을 위한 커스텀 훅
export const useCreateComment = (postId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['createComment', postId],
    mutationFn: (newComment: { content: string }) => createComment(postId, newComment.content),
    onMutate: async (newComment) => {
      await queryClient.cancelQueries(COMMENTS_QUERY_KEY(postId)); // 기존 쿼리 취소

      // 이전 댓글 데이터 저장
      const previousComments = queryClient.getQueryData<{ id: number; content: string }[]>(COMMENTS_QUERY_KEY(postId));

      if (previousComments) {
        // 낙관적 업데이트: 새로운 댓글을 기존 댓글 목록에 추가
        queryClient.setQueryData(COMMENTS_QUERY_KEY(postId), [
          ...previousComments,
          { ...newComment, id: Date.now() },
        ]);
      }

      return { previousComments };
    },
    onError: (err, newComment, context) => {
      // 에러 발생 시 이전 댓글 데이터로 복원
      if (context?.previousComments) {
        queryClient.setQueryData(COMMENTS_QUERY_KEY(postId), context.previousComments);
      }
      // 에러 메시지 표시
      toast.error('댓글 작성에 실패했습니다. 다시 시도해주세요.');
    },
    onSettled: () => {
      // 성공 또는 실패 시 쿼리 무효화
      queryClient.invalidateQueries(COMMENTS_QUERY_KEY(postId));
    },
  });
};
