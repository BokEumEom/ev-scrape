// src/pages/NewsPage.tsx
import { useInfiniteQuery } from '@tanstack/react-query';
import { pageTransitionEffects } from '@/constants/constants';
import { motion } from 'framer-motion';
import React from 'react';
import LoadMoreButton from '@/components/LoadMoreButton';
import ScrollToTopButton from '@/components/ScrollToTopButton';
import Spinner from '@/components/Spinner';
import NewsList from '@/components/news/NewsList';
import useBookmarks from '@/hooks/useBookmarks';
import useVotes from '@/hooks/useVotes';
import { fetchNewsItems } from '@/services/newsService';

const NewsPage: React.FC = () => {
  const { bookmarks, toggleBookmark } = useBookmarks(); // 북마크를 관리하기 위한 커스텀 훅
  const { voteCounts, handleVote } = useVotes(); // 투표를 관리하기 위한 커스텀 훅

  // 페이지네이션된 뉴스 항목을 가져오기 위한 useInfiniteQuery 훅
  const {
    data,              // API로부터 가져온 데이터
    isLoading,         // 초기 로딩 중인지 나타내는 부울 값
    isError,           // 가져오는 도중 오류가 발생했는지 나타내는 부울 값
    error,             // 오류 객체 (오류 세부 정보 포함)
    fetchNextPage,     // 다음 페이지 결과를 가져오기 위한 함수
    hasNextPage,       // 더 많은 페이지가 있는지 여부를 나타내는 부울 값
    isFetchingNextPage // 현재 다음 페이지를 가져오고 있는지 여부를 나타내는 부울 값
  } = useInfiniteQuery({
    queryKey: ['newsItems'], // 쿼리에 대한 고유 키
    queryFn: async ({ pageParam = 1 }) => {
      return await fetchNewsItems(pageParam); // 주어진 페이지 매개변수에 대한 뉴스 항목을 가져옴
    },
    getNextPageParam: (lastPage, allPages) => {
      // 마지막 페이지의 총 수를 기준으로 더 많은 페이지가 있는지 결정
      const morePagesExist = allPages.flatMap(page => page.items).length < lastPage.total;
      if (morePagesExist) {
        return allPages.length + 1; // 다음 페이지 번호 반환
      }
      return undefined; // 더 이상 페이지가 없으면 undefined 반환
    },
    initialPageParam: 1, // 시작 페이지 매개변수
  });

  // 오류 상태 처리
  if (isError) return <div>뉴스 항목을 불러오는 중 오류가 발생했습니다. 나중에 다시 시도해 주세요.</div>;
  // 로딩 상태 처리 (초기 로드)
  if (isLoading && !isFetchingNextPage) return <Spinner />;

  // 페이지의 뉴스 항목을 단일 배열로 평탄화
  const newsItems = data?.pages.flatMap(page => page.items) || [];

  return (
    <motion.div
      initial="initial" // 초기 애니메이션 상태
      animate="animate" // 이 상태로 애니메이션
      exit="exit" // 종료 애니메이션 상태
      variants={pageTransitionEffects} // 전환 변형
      className="flex flex-col pt-16 pb-20" // 주요 컨테이너 스타일링
    >
      <div>
        {/* 뉴스 항목 목록 렌더링 */}
        <NewsList
          newsItems={newsItems.map(item => ({
            ...item,
            isBookmarked: bookmarks.includes(item.id), // 북마크 상태 추가
            voteCount: voteCounts[item.id] || item.voteCount, // 투표 수 추가
          }))}
          onBookmarkToggle={toggleBookmark} // 북마크 토글 핸들러
          onVote={handleVote} // 투표 핸들러
        />
        {/* 더 많은 페이지가 있는 경우 더 불러오기 버튼 렌더링 */}
        {hasNextPage && (
          <LoadMoreButton isLoading={isFetchingNextPage} onClick={() => fetchNextPage()} />
        )}
        {/* 맨 위로 이동 버튼 렌더링 */}
        <ScrollToTopButton />
      </div>
    </motion.div>
  );
};

export default NewsPage;
