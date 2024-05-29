// src/hooks/useCommunityPosts.ts
import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchCommunityPosts } from '@/services/communityService';
import { PAGE_SIZE } from '@/constants/constants'; // PAGE_SIZE 상수를 constants 파일에서 가져옴

// 커뮤니티 게시글을 가져오기 위한 커스텀 훅
export const useCommunityPosts = () => {
  return useInfiniteQuery({
    queryKey: ['communityPosts'], // 쿼리 키를 구체적으로 지정
    queryFn: async ({ pageParam = 1 }) => {
      try {
        const { items, total } = await fetchCommunityPosts(pageParam);
        const totalPages = Math.ceil(total / PAGE_SIZE);
        // 페이지네이션 구조에 맞는 객체를 반환
        return { data: items, nextPage: pageParam + 1, totalPages };
      } catch (error) {
        throw new Error('Failed to fetch community posts');
      }
    },
    getNextPageParam: (lastPage) => {
      // 다음 페이지가 있는지 확인하여 반환
      if (lastPage.nextPage <= lastPage.totalPages) {
        return lastPage.nextPage;
      } else {
        return undefined;
      }
    },
    initialPageParam: 1, // 초기 페이지 매개변수를 1로 설정
    onError: (error) => {
      console.error('Error fetching community posts:', error);
    },
  });
};
