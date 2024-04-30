// src/hooks/useLikeCommunityPost.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { likeCommunityPost } from '../services/apiService';
import { toast } from 'react-toastify';
import { CommunityPost } from '../types';

export function useLikeCommunityPost(postId: number) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async () => {
      return await likeCommunityPost(postId);
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['communityPost', postId], data);
    },
    onError: (error) => {
      toast.error(`Error liking the post: ${error.message}`);
    },
  });

  return mutation;
}