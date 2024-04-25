// src/hooks/usePostDetails.tsx
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchCommunityPostDetails, updateCommunityPost, likeCommunityPost } from '../services/apiService';
import { toast } from 'react-toastify';
import { CommunityPost } from '../types';

const usePostDetails = () => {
  const { postId } = useParams<{ postId: string }>();
  const numericPostId = Number(postId);
  const queryClient = useQueryClient();

  const [isEditing, setIsEditing] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  // Fetch post details and initialize like state when post data is available
  const {
    data: post,
    isLoading,
    isError,
    error,
  } = useQuery<CommunityPost>({
    queryKey: ['communityPost', numericPostId],
    queryFn: () => fetchCommunityPostDetails(numericPostId),
    enabled: !!numericPostId,
    onSuccess: (data) => {
      // Ensure that like-related states are updated with the latest post data
      setIsLiked(data.isLikedByCurrentUser || false);
      setLikeCount(data.likeCount || 0);
    }
  });

  // Define mutation for liking a post
  const likeMutation = useMutation({
    mutationFn: () => likeCommunityPost(numericPostId),
    onSuccess: () => {
      toast.success('Post liked successfully');
      // Safely toggle like status and update count
      setIsLiked((prev) => !prev);
      setLikeCount((prev) => prev + (isLiked ? -1 : 1));
      queryClient.invalidateQueries(['communityPost', numericPostId]);
    },
    onError: (error) => {
      toast.error(`Failed to like the post: ${error.message}`);
    }
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
