// src/pages/SearchPage.tsx
import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInfiniteQuery } from '@tanstack/react-query';
import SearchBar from '../components/search/SearchBar';
import { searchNewsItems } from '../services/apiService';
import NewsList from '../components/news/NewsList';
import Spinner from '../components/Spinner';
import useBookmarks from '../hooks/useBookmarks';
import useVotes from '../hooks/useVotes';
import { ViewCountProvider } from '../contexts/ViewCountContext';
import LoadMoreButton from '../components/LoadMoreButton';
import RecentSearches from '../components/search/RecentSearches';

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const query = searchParams.get('query') || '';
  const { bookmarks, toggleBookmark } = useBookmarks();
  const { voteCounts, handleVote } = useVotes();
  const inputRef = useRef<HTMLInputElement>(null);

  const { data, isLoading, isError, error, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ['searchNewsItems', query],
    queryFn: async ({ pageParam = 1 }) => {
      return searchNewsItems(query, pageParam);
    },
    getNextPageParam: (lastPage, allPages) => {
      // API가 더 이상 페이지가 없음을 나타내는 방식에 따라 조정
      const morePagesExist = lastPage?.length === 10; // 여러분의 API의 페이지네이션 로직에 맞춰 조정
      if (morePagesExist) {
        return allPages.length + 1;
      }
      return undefined;
    },
    enabled: !!query, // 쿼리 문자열이 비어 있지 않을 때만 쿼리를 실행
    initialPageParam: undefined, // Or some other value if there's a better one
  });
  

  const handleSearch = (newQuery: string) => {
    setSearchParams({ query: newQuery });
    // 새 검색어를 최근 검색어 목록에 추가
    if (!recentSearches.includes(newQuery)) {
      const updatedRecentSearches = [newQuery, ...recentSearches.slice(0, 4)]; // 최근 5개 검색어만 저장
      setRecentSearches(updatedRecentSearches);
      // localStorage에 최근 검색어 목록 업데이트
      localStorage.setItem('recentSearches', JSON.stringify(updatedRecentSearches));
    }
  };
  

  // localStorage에서 최근 검색어 로드
  useEffect(() => {
    const loadedRecentSearches: string[] = JSON.parse(localStorage.getItem('recentSearches') || '[]');
    setRecentSearches(loadedRecentSearches);
  }, []);

  // setSearchQuery 함수 수정 또는 추가
  const handleSetSearchQuery = (newQuery: string) => {
    setSearchParams({ query: newQuery });
    // 필요한 경우 여기에 추가 로직 구현
  };

  // Load recent searches from localStorage
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Page load transition effect
  const pageTransition = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.5 } },
    exit: { opacity: 0, transition: { duration: 0.5 } },
  };

  return (
    <ViewCountProvider>
      <motion.div
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageTransition}
        className="flex flex-col min-h-screen pt-16 pb-20"
      >
        <SearchBar searchQuery={query} setSearchQuery={handleSearch} ref={inputRef} />
        <span 
          className="font-bold text-xs text-gray-800 px-6 py-4"
        >
          최근 검색
        </span>
        <RecentSearches
          recentSearches={recentSearches}
          setSearchQuery={handleSetSearchQuery}
          setRecentSearches={setRecentSearches}
        />
        {isLoading ? (
          <Spinner />
        ) : (
          <NewsList
            newsItems={(data?.pages || []).flatMap(page =>
              page.map(item => ({
                ...item,
                isBookmarked: bookmarks.includes(item.id),
                voteCount: voteCounts[item.id] || item.voteCount,
              }))
            )}
            onBookmarkToggle={toggleBookmark}
            onVote={handleVote}
          />
        )}
        {hasNextPage && <LoadMoreButton isLoading={isLoading} onClick={() => fetchNextPage()} />}
      </motion.div>
    </ViewCountProvider>
  );
};

export default SearchPage;
