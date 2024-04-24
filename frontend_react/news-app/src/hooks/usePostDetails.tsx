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
    onError: (error) => {
      if (error.response) {
        // 서버 응답이 있는 경우 (상태 코드 포함)
        const statusCode = error.response.status;
        const errorMessage = error.response.data.message || 'An error occurred while updating the post.';
        console.error(`Error ${statusCode}: ${errorMessage}`);
        toast.error(errorMessage);
      } else if (error.request) {
        // 요청이 전송되었지만 응답이 없는 경우
        console.error('No response received from the server.');
        toast.error('Failed to update the post. Please try again later.');
      } else {
        // 요청 설정 시 문제가 발생한 경우
        console.error('Error occurred while setting up the request:', error.message);
        toast.error('Failed to update the post. Please try again later.');
      }
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

