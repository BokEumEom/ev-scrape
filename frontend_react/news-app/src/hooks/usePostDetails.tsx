// src/hooks/usePostDetails.tsx
import { useCallback } from 'react';
import { useAtom } from 'jotai';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchCommunityPostDetails, updateCommunityPost } from '../services/apiService';
import { isEditingAtom } from '../atoms/postAtoms';
import { toast } from 'react-toastify';
import { CommunityPost } from '../types';

const usePostDetails = () => {
  const { postId } = useParams<{ postId: string }>();
  const numericPostId = Number(postId);
  const queryClient = useQueryClient();

  const [isEditing, setIsEditing] = useAtom(isEditingAtom);

  // useCallback으로 setIsEditing 래핑
  const toggleIsEditing = useCallback(() => {
    setIsEditing(!isEditing);
  }, [isEditing, setIsEditing]);

  // Fetch post details and initialize like state when post data is available
  const { data: post, isLoading, isError, error } = useQuery<CommunityPost>({
    queryKey: ['communityPost', numericPostId],
    queryFn: () => fetchCommunityPostDetails(numericPostId),
    enabled: !!numericPostId
  });

  // Define mutation for updating a post
  const updateMutation = useMutation({
    mutationFn: (updatedPostData: Partial<CommunityPost>) => {
      if (!numericPostId) {
        console.error('Invalid postId:', numericPostId);
        return Promise.reject(new Error('Invalid post ID'));
      }
      return updateCommunityPost({ postId: numericPostId, postData: updatedPostData });
    },
    onMutate: async (updatedPostData) => {
      await queryClient.cancelQueries(['communityPost', numericPostId]);
      const previousPostData = queryClient.getQueryData(['communityPost', numericPostId]);

      queryClient.setQueryData(['communityPost', numericPostId], (oldPostData) => ({
        ...oldPostData,
        ...updatedPostData,
      }));

      return { previousPostData };
    },
    onError: (error, variables, context) => {
      queryClient.setQueryData(['communityPost', numericPostId], context.previousPostData);
      toast.error('Failed to update the post. Please try again later.');
    },
    onSettled: () => {
      queryClient.invalidateQueries(['communityPost', numericPostId]);
      setIsEditing(false); // 편집 모드 종료
    },
  });

  return {
    post,
    isLoading,
    isError,
    error,
    updateMutation,
    isEditing,
    setIsEditing,
    toggleIsEditing,
  };
};

export default usePostDetails;
