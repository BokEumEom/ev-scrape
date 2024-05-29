// src/hooks/usePostDetails.tsx
import { useCallback } from 'react';
import { useAtom } from 'jotai';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchCommunityPostDetails, updateCommunityPost } from '@/services/communityService';
import { isEditingAtom } from '@/atoms/postAtoms';
import { toast } from 'react-toastify';
import { CommunityPost } from '@/types';

// 쿼리 키 상수 정의
const COMMUNITY_POST_QUERY_KEY = (postId: number) => ['communityPost', postId] as const;

const usePostDetails = () => {
  const { postId } = useParams<{ postId: string }>();
  const numericPostId = Number(postId);
  const queryClient = useQueryClient();

  const [isEditing, setIsEditing] = useAtom(isEditingAtom);

  // 편집 모드 토글 핸들러를 useCallback으로 래핑
  const toggleIsEditing = useCallback(() => {
    setIsEditing((prev) => !prev);
  }, [setIsEditing]);

  // 게시글 상세 정보를 가져오는 쿼리
  const { data: post, isLoading, isError, error } = useQuery<CommunityPost>({
    queryKey: COMMUNITY_POST_QUERY_KEY(numericPostId),
    queryFn: () => fetchCommunityPostDetails(numericPostId),
    enabled: !!numericPostId
  });

  // 게시글 업데이트를 위한 뮤테이션 정의
  const updateMutation = useMutation({
    mutationFn: (updatedPostData: Partial<CommunityPost>) => {
      return updateCommunityPost(numericPostId, updatedPostData);
    },
    onMutate: async (updatedPostData) => {
      await queryClient.cancelQueries(COMMUNITY_POST_QUERY_KEY(numericPostId)); // 기존 쿼리 취소
      const previousPostData = queryClient.getQueryData<CommunityPost>(COMMUNITY_POST_QUERY_KEY(numericPostId));

      // 낙관적 업데이트: 새로운 게시글 데이터를 기존 데이터에 병합
      if (previousPostData) {
        queryClient.setQueryData(COMMUNITY_POST_QUERY_KEY(numericPostId), {
          ...previousPostData,
          ...updatedPostData,
        });
      }

      return { previousPostData };
    },
    onError: (error, variables, context) => {
      // 에러 발생 시 이전 게시글 데이터로 복원
      if (context?.previousPostData) {
        queryClient.setQueryData(COMMUNITY_POST_QUERY_KEY(numericPostId), context.previousPostData);
      }
      toast.error('Failed to update the post. Please try again later.'); // 에러 메시지 표시
    },
    onSettled: () => {
      // 성공 또는 실패 시 쿼리 무효화
      queryClient.invalidateQueries(COMMUNITY_POST_QUERY_KEY(numericPostId));
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
