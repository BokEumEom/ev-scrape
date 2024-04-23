// src/hooks/useLikeCommunityPost.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { likeCommunityPost } from '../services/apiService';
import { toast } from 'react-toastify'; // Assuming react-toastify is installed

export function useLikeCommunityPost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: likeCommunityPost,
    onMutate: async ({ postId }) => {
      // postId가 undefined인 경우 처리
      if (!postId) {
        return;
      }
    
      await queryClient.cancelQueries(['communityPost', postId]);
      const previousPost = queryClient.getQueryData(['communityPost', postId]);
    
      if (!previousPost) {
        console.warn('No post data available in cache to update for post:', postId);
        return;
      }
    
      queryClient.setQueryData(['communityPost', postId], {
        ...previousPost,
        isLikedByCurrentUser: !previousPost.isLikedByCurrentUser,
        likeCount: previousPost.isLikedByCurrentUser
          ? previousPost.likeCount - 1
          : previousPost.likeCount + 1,
      });
    
      return { previousPost };
    },
    onError: (error, variables, context) => {
      if (context?.previousPost) {
        queryClient.setQueryData(['communityPost', variables.postId], context.previousPost);
      }
      toast.error('Error liking the post: ' + error.message);
    },
    onSettled: () => {
      queryClient.invalidateQueries(['communityPost']);
    }
  });
}