// src/hooks/useCommunityPosts.ts
import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchCommunityPosts } from '../services/apiService';
import { PAGE_SIZE } from '../services/apiService'; // PAGE_SIZE 상수를 apiService.ts에서 export하도록 해주세요.

export const useCommunityPosts = () => {
  return useInfiniteQuery({
    queryKey: ['communityPosts'],
    queryFn: async ({ pageParam = 1 }) => {
        const { items, total } = await fetchCommunityPosts(pageParam);
        const totalPages = Math.ceil(total / PAGE_SIZE);
        // Ensure you return an object that matches the expected structure for pagination
        return { data: items, nextPage: pageParam + 1, totalPages };
      },
    getNextPageParam: (lastPage) => {
      if (lastPage.nextPage <= lastPage.totalPages) {
        return lastPage.nextPage;
      } else {
        return undefined;
      }
    },
    initialPageParam: undefined,
  });
};
