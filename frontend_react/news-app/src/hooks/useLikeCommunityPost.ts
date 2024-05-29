// src/hooks/useLikeCommunityPost.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { likeCommunityPost } from '@/services/communityService';
import { toast } from 'react-toastify';
import { CommunityPost } from '@/types'; // 상대 경로 수정

/**
 * 커뮤니티 게시물을 좋아요하는 기능을 제공하는 커스텀 훅
 * @param postId - 좋아요할 게시물의 ID
 * @returns 좋아요 mutation 객체
 */
export function useLikeCommunityPost(postId: number) {
  const queryClient = useQueryClient();

  // 좋아요 mutation 정의
  const mutation = useMutation<CommunityPost, Error>({
    mutationFn: () => likeCommunityPost(postId), // 좋아요 API 호출 함수
    onSuccess: (data) => {
      // 좋아요 성공 시, 캐시된 게시물 데이터 업데이트
      queryClient.setQueryData(['communityPost', postId], data);
      toast.success('Post liked successfully!'); // 성공 메시지 표시
    },
    onError: (error) => {
      // 좋아요 실패 시, 에러 메시지 표시
      toast.error(`Error liking the post: ${error.message}`);
    },
  });

  return mutation; // 좋아요 mutation 객체 반환
}
