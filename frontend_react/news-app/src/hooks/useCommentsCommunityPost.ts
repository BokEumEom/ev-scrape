// src/hooks/useCommentsCommunityPost.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchCommentsByPostId, createComment } from '../services/apiService';
import { toast } from 'react-toastify';

export const useComments = (postId: number) => {
  return useQuery({
    queryKey: ['comments', postId],
    queryFn: () => fetchCommentsByPostId(postId),
  });
};

export const useCreateComment = (postId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['createComment', postId],
    mutationFn: (newComment: { content: string }) => createComment(postId, newComment.content),
    onMutate: async (newComment) => {
      await queryClient.cancelQueries(['comments', postId]);

      const previousComments = queryClient.getQueryData(['comments', postId]);
      if (previousComments) {
        queryClient.setQueryData(['comments', postId], [...previousComments, { ...newComment, id: Date.now() }]);
      }

      return { previousComments };
    },
    onError: (err, newComment, context) => {
      if (context?.previousComments) {
        queryClient.setQueryData(['comments', postId], context.previousComments);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries(['comments', postId]);
    },
  });
};
