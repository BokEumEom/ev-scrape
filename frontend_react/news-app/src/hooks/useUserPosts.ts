// src/hooks/useUserPosts.ts
import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchUserPosts } from '@/services/userService';

// 페이지 크기를 상수로 정의
const PAGE_SIZE = 10;

// 사용자 게시물 데이터를 가져오는 커스텀 훅
const useUserPosts = () => {
  return useInfiniteQuery({
    queryKey: ['userPosts'], // 쿼리 키를 'userPosts'로 설정하여 캐싱 및 데이터 관리
    queryFn: ({ pageParam = 1 }) => fetchUserPosts(pageParam), // 페이지 매개변수를 받아 사용자 게시물 데이터를 가져오는 함수
    getNextPageParam: (lastPage, pages) => {
      // 마지막 페이지에 게시물이 더 있는지 확인
      const morePagesExist = lastPage.items.length === PAGE_SIZE;
      if (!morePagesExist) return undefined; // 더 이상 페이지가 없으면 undefined 반환
      return pages.length + 1; // 다음 페이지 번호 반환
    },
    initialPageParam: 1, // 초기 페이지 번호를 1로 설정
  });
};

export default useUserPosts;
