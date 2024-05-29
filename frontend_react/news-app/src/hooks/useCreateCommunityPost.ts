// src/hooks/useCreateCommunityPost.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createCommunityPost } from '@/services/communityService';

export const useCreateCommunityPost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCommunityPost,
    onSuccess: () => {
      // Mutation 성공 시 실행될 부작용:
      // communityPosts 쿼리를 무효화하여 커뮤니티 포스트 목록을 새로고침합니다.
      queryClient.invalidateQueries({
        queryKey: ['communityPosts']
      });
      console.log('Community post creation succeeded. Query invalidated.');
    },
    onError: (error: Error) => {
      // Mutation 실패 시 실행될 부작용:
      // 에러 로깅 등의 에러 핸들링 로직을 여기에 추가합니다.
      console.error('Error creating community post:', error);
    },
    onSettled: () => {
      // Mutation 성공/실패 여부와 상관없이 최종적으로 실행될 부작용:
      // 여기서는 예시로 단순 로깅을 수행합니다. 실제 사용 시에는 필요한 로직을 구현하세요.
      console.log('Mutation was settled (completed or failed).');
    }
  });
};