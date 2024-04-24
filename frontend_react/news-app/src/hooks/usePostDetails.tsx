// src/hooks/usePostDetails.tsx
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchCommunityPostDetails, updateCommunityPost, likeCommunityPost } from '../services/apiService';
import { toast } from 'react-toastify';

const usePostDetails = () => {
  const { postId } = useParams<{ postId: string }>();
  const numericPostId = Number(postId);
  const queryClient = useQueryClient();

  // Use single-object argument format for React Query v5
  const { data: post, isLoading, isError, error } = useQuery({
    queryKey: ['communityPost', numericPostId],
    queryFn: () => fetchCommunityPostDetails(numericPostId),
    enabled: !!numericPostId,
    onSuccess: (data) => {
        setIsLiked(data?.isLikedByCurrentUser);
        setLikeCount(data?.likeCount);
      },
  });

  const [isEditing, setIsEditing] = useState(false);
  const [isLiked, setIsLiked] = useState(post?.isLikedByCurrentUser);
  const [likeCount, setLikeCount] = useState(post?.likeCount);

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
    mutationFn: (postData) => updateCommunityPost(numericPostId, postData),
    onSuccess: () => {
      toast.success('Post updated successfully');
      queryClient.invalidateQueries(['communityPost', numericPostId]);
    },
    onError: (error) => {
      toast.error(`Failed to update post: ${error.message}`);
    }
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
