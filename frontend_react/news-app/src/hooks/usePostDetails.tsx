// src/hooks/usePostDetails.tsx
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchCommunityPostDetails, updateCommunityPost, likeCommunityPost } from '../services/apiService';
import { toast } from 'react-toastify';
import { CommunityPost } from '../types';

const usePostDetails = () => {
  const { postId } = useParams<{ postId: string }>();
  const numericPostId = Number(postId);
  const queryClient = useQueryClient();

  // Use single-object argument format for React Query v5
  const {
    data: post,
    isLoading,
    isError,
    error,
  } = useQuery<CommunityPost>({
    queryKey: ['communityPost', numericPostId],
    queryFn: () => fetchCommunityPostDetails(numericPostId),
    enabled: !!numericPostId,
  });

  const [isEditing, setIsEditing] = useState(false);
  const [isLiked, setIsLiked] = useState(post?.isLikedByCurrentUser || false);
  const [likeCount, setLikeCount] = useState(post?.likeCount || 0);

  const likeMutation = useMutation({
    mutationFn: () => likeCommunityPost(numericPostId),
    onSuccess: () => {
      toast.success('Post liked successfully');
      setIsLiked(!isLiked);
      setLikeCount((prev) => isLiked ? prev - 1 : prev + 1);
      queryClient.invalidateQueries(['communityPost', numericPostId]);
    },
    onError: (error) => {
      toast.error(`Failed to like the post: ${error.message}`);
    }
  });

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
    onError: (error, updatedPostData, context) => {
      queryClient.setQueryData(['communityPost', numericPostId], context?.previousPostData);
      toast.error(`Failed to update post: ${error.message}`);
    },
    onSettled: () => {
      queryClient.invalidateQueries(['communityPost', numericPostId]);
    },
  });  

  return {
    post,
    isLoading,
    isError,
    error,
    likeMutation,
    updateMutation,
    isEditing,
    setIsEditing,
    isLiked,
    likeCount,
    setIsLiked,
    setLikeCount,
  };
};

export default usePostDetails;

