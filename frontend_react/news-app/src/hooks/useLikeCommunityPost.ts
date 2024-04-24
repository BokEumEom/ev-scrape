// src/hooks/useLikeCommunityPost.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { likeCommunityPost } from '../services/apiService';
import { toast } from 'react-toastify';
import { CommunityPost } from '../types'; // Assume you have correct type definitions

export function useLikeCommunityPost(setIsLiked, setLikeCount) {
  const queryClient = useQueryClient();

  return useMutation<number, any, number, { previousPost?: CommunityPost }>({
    mutationKey: ['likePost'],
    mutationFn: likeCommunityPost,
    onMutate: async (postId) => {
      await queryClient.cancelQueries({
        queryKey: ['communityPost', postId],
        exact: true
      });
      const previousPost = queryClient.getQueryData<CommunityPost>(['communityPost', postId]);
      if (previousPost) {
        const newIsLiked = !previousPost.isLikedByCurrentUser;
        const newLikeCount = previousPost.isLikedByCurrentUser ? previousPost.likeCount - 1 : previousPost.likeCount + 1;

        queryClient.setQueryData(['communityPost', postId], {
          ...previousPost,
          isLikedByCurrentUser: newIsLiked,
          likeCount: newLikeCount,
        });

        setIsLiked(newIsLiked);
        setLikeCount(newLikeCount);

        return { previousPost };
      }
      return { previousPost: undefined };
    },
    onError: (error, postId, context) => {
      if (context?.previousPost) {
        queryClient.setQueryData(['communityPost', postId], context.previousPost);
      }
      toast.error(`Error liking the post: ${error.message}`);
    },
    onSettled: (data, error, postId) => {
      queryClient.invalidateQueries({
        queryKey: ['communityPost', postId]
      });
    }
  });
}
